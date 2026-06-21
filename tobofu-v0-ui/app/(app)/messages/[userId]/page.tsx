'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useRouter, useParams } from 'next/navigation'
import { getMessages, sendMessage, getMyMatches, markMessagesRead } from '@/lib/api'
import { getCurrentUserId } from '@/lib/auth'
import { Send, ArrowLeft, Loader2, MapPin, Briefcase } from 'lucide-react'

export default function ChatPage() {
  const router = useRouter()
  const params = useParams()
  
  const [currentUserId, setCurrentUserIdState] = useState<number | null>(null)
  const matchedUserId = Number(params.userId)

  const [messages, setMessages] = useState<any[]>([])
  const [messageText, setMessageText] = useState('')
  const [matchedUser, setMatchedUser] = useState<any>(null)
  
  const [isLoadingMessages, setIsLoadingMessages] = useState(true)
  const [isLoadingUser, setIsLoadingUser] = useState(true)
  
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [isOnline, setIsOnline] = useState(true) // Assumed online for now or via WS
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const id = getCurrentUserId()
    if (!id) {
      router.push('/login')
    } else {
      setCurrentUserIdState(Number(id))
    }
  }, [router])

  useEffect(() => {
    if (currentUserId && matchedUserId) {
      loadMatchedUserDetails(currentUserId)
      loadMessages(currentUserId)
    }
  }, [currentUserId, matchedUserId])

  // WebSocket Connection
  useEffect(() => {
    if (!currentUserId || !matchedUserId) return

    let socket: WebSocket | null = null
    let reconnectTimer: NodeJS.Timeout

    const connectWs = () => {
      // Connect to WebSocket using dynamic API URL
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'
      const wsProtocol = API_URL.startsWith('https') ? 'wss' : 'ws'
      const wsUrl = API_URL.replace(/^https?:\/\//, '')
      
      socket = new WebSocket(`${wsProtocol}://${wsUrl}/ws/${currentUserId}`)

      socket.onopen = () => {
        setIsOnline(true)
      }

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          if (data.type === 'new_message') {
            // Check if message belongs to this conversation
            if (
              (data.message.sender_id === matchedUserId && data.message.receiver_id === currentUserId) ||
              (data.message.sender_id === currentUserId && data.message.receiver_id === matchedUserId)
            ) {
              setMessages((prev) => {
                // Avoid duplicates if REST already caught it
                if (prev.find((m) => m.id === data.message.id)) return prev
                return [...prev, data.message]
              })
              markMessagesRead(currentUserId, matchedUserId).catch(console.error)
            }
          } else if (data.type === 'typing' && data.sender_id === matchedUserId) {
            setIsTyping(true)
            if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
            typingTimeoutRef.current = setTimeout(() => {
              setIsTyping(false)
            }, 2000)
          }
        } catch (e) {
          console.error('Error parsing WS message', e)
        }
      }

      socket.onclose = () => {
        setIsOnline(false)
        // Auto reconnect
        reconnectTimer = setTimeout(connectWs, 3000)
      }

      setWs(socket)
    }

    connectWs()

    return () => {
      if (reconnectTimer) clearTimeout(reconnectTimer)
      if (socket) socket.close()
    }
  }, [currentUserId, matchedUserId])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Auto-scroll when messages update
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const loadMatchedUserDetails = async (userId: number) => {
    try {
      setIsLoadingUser(true)
      const data = await getMyMatches(userId)
      const matches = Array.isArray(data) ? data : data.matches || []
      
      const foundMatch = matches.find((m: any) => Number(m.user_id) === matchedUserId)
      if (foundMatch) {
        setMatchedUser(foundMatch)
      }
    } catch (error) {
      console.error('Error fetching matched user details:', error)
    } finally {
      setIsLoadingUser(false)
    }
  }

  const loadMessages = async (userId: number) => {
    try {
      setIsLoadingMessages(true)
      const data = await getMessages(userId, matchedUserId)
      setMessages(data || [])

      try {
        await markMessagesRead(userId, matchedUserId)
      } catch (e) {
        console.error('Failed to mark messages as read', e)
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setIsLoadingMessages(false)
    }
  }

  const handleSendMessage = async () => {
    if (!currentUserId || !messageText.trim()) return

    try {
      // Optimistic update
      const tempMessage = {
        id: `temp-${Date.now()}`,
        sender_id: currentUserId,
        receiver_id: matchedUserId,
        message: messageText,
        created_at: new Date().toISOString()
      }
      
      setMessages((prev) => [...prev, tempMessage])
      setMessageText('')

      await sendMessage({
        sender_id: currentUserId,
        receiver_id: matchedUserId,
        message: tempMessage.message
      })

      // Reload to ensure consistency with backend (getting real ID and timestamp)
      if (currentUserId) await loadMessages(currentUserId)
    } catch (error) {
      console.error('Error sending message:', error)
      // If optimistic update failed, reload to revert
      if (currentUserId) await loadMessages(currentUserId)
    }
  }

  const formatTimestamp = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  if (isLoadingUser && !matchedUser) {
    return (
      <div className="flex flex-col h-[calc(100vh-64px)] justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] max-w-4xl mx-auto w-full bg-card md:border-x border-muted shadow-sm">
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-muted flex items-center gap-4 bg-background/50 backdrop-blur-sm sticky top-0 z-10">
        <button 
          onClick={() => router.push('/messages')}
          className="p-2 hover:bg-muted rounded-full transition-colors text-primary"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <img
          src={matchedUser?.photo_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop'}
          alt={matchedUser?.name || 'Matched User'}
          className="w-12 h-12 rounded-full object-cover shadow-sm"
        />
        
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-lg truncate font-heading">{matchedUser?.name || 'User'}</p>
          <div className="flex items-center gap-3 text-sm truncate">
            {isTyping ? (
              <span className="text-primary italic font-medium animate-pulse">typing...</span>
            ) : (
              <span className="flex items-center gap-1.5 text-foreground/70">
                <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-muted-foreground'}`}></span>
                {isOnline ? 'Online' : 'Offline'}
              </span>
            )}
            
            {matchedUser?.location && !isTyping && (
              <span className="flex items-center gap-1 text-foreground/60">
                <MapPin className="w-3 h-3" />
                {matchedUser.location}
              </span>
            )}
            {matchedUser?.profession && !isTyping && (
              <span className="flex items-center gap-1 hidden sm:flex text-foreground/60">
                <Briefcase className="w-3 h-3" />
                {matchedUser.profession}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-muted/10">
        {isLoadingMessages && messages.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="w-6 h-6 animate-spin text-primary/50" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-foreground/50 space-y-3">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="text-2xl">👋</span>
            </div>
            <p>Send a message to start the conversation!</p>
          </div>
        ) : (
          messages.map((message, index) => {
            const isMe = Number(message.sender_id) === currentUserId
            return (
              <motion.div
                key={message.id || index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[70%] px-4 py-2.5 rounded-2xl shadow-sm ${
                    isMe
                      ? 'bg-primary text-primary-foreground rounded-br-sm'
                      : 'bg-card border border-muted text-foreground rounded-bl-sm'
                  }`}
                >
                  <p className="text-[15px] leading-relaxed break-words">{message.message}</p>
                </div>
                <span className="text-[11px] text-foreground/40 mt-1.5 px-1">
                  {message.created_at ? formatTimestamp(message.created_at) : 'Sending...'}
                </span>
              </motion.div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-card border-t border-muted">
        <div className="flex gap-2 items-center bg-muted/30 p-1.5 rounded-full border border-muted focus-within:ring-2 focus-within:ring-primary/20 transition-shadow">
          <input
            type="text"
            value={messageText}
            onChange={(e) => {
              setMessageText(e.target.value)
              if (ws && ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ type: 'typing', receiver_id: matchedUserId }))
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleSendMessage()
              }
            }}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2.5 bg-transparent focus:outline-none text-foreground placeholder:text-foreground/40"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            disabled={!messageText.trim()}
            className="p-3 rounded-full bg-primary text-primary-foreground shadow-md hover:bg-primary/90 disabled:opacity-50 disabled:shadow-none transition-all mr-1"
          >
            <Send className="w-4 h-4 translate-x-[1px] translate-y-[-1px]" />
          </motion.button>
        </div>
      </div>
    </div>
  )
}
