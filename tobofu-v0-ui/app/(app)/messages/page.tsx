'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { getMyMatches, getMessages, getUnreadCounts } from '@/lib/api'
import { getCurrentUserId } from '@/lib/auth'
import { Loader2 } from 'lucide-react'

export default function MessagesPage() {
  const router = useRouter()
  const [conversations, setConversations] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentUserId, setCurrentUserIdState] = useState<string | null>(null)

  useEffect(() => {
    const id = getCurrentUserId()
    if (!id) {
      router.push('/login')
    } else {
      setCurrentUserIdState(id)
    }
  }, [router])

  useEffect(() => {
    if (currentUserId) {
      loadConversations(currentUserId)
    }
  }, [currentUserId])

  const loadConversations = async (userId: string) => {
    try {
      setIsLoading(true)
      const data = await getMyMatches(Number(userId))
      const matches = Array.isArray(data) ? data : data.matches || []

      // Fetch unread counts once for the current user
      let unreadCountsList: any[] = []
      try {
        unreadCountsList = await getUnreadCounts(Number(userId))
      } catch (e) {
        console.error('Error fetching unread counts', e)
      }

      // Fetch the last message for each match
      const conversationsWithLastMessage = await Promise.all(
        matches.map(async (match: any) => {
          try {
            const messages = await getMessages(Number(userId), match.user_id)
            const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null
            
            const unreadData = unreadCountsList.find((u: any) => u.from_user_id === match.user_id)
            const unreadCount = unreadData ? unreadData.count : 0

            return {
              ...match,
              lastMessage,
              unreadCount
            }
          } catch (err) {
            console.error(`Error fetching messages for match ${match.user_id}:`, err)
            return {
              ...match,
              lastMessage: null,
              unreadCount: 0
            }
          }
        })
      )

      // Sort conversations so that the ones with the most recent messages are on top
      conversationsWithLastMessage.sort((a, b) => {
        if (!a.lastMessage && !b.lastMessage) return 0
        if (!a.lastMessage) return 1
        if (!b.lastMessage) return -1
        return new Date(b.lastMessage.created_at).getTime() - new Date(a.lastMessage.created_at).getTime()
      })

      setConversations(conversationsWithLastMessage)
    } catch (error) {
      console.error('Error loading conversations:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 min-h-[calc(100vh-64px)]">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-heading font-semibold">Messages</h2>
        <p className="text-foreground/60 mt-2">Connect with your matches.</p>
      </div>

      {/* Conversations List */}
      <div className="bg-card rounded-2xl border border-muted premium-shadow overflow-hidden">
        {conversations.length === 0 ? (
          <div className="p-8 text-center text-foreground/60">
            No conversations yet. Go to your matches to start chatting!
          </div>
        ) : (
          <div className="divide-y divide-muted">
            {conversations.map((conv, index) => {
              const hasUnread = conv.unreadCount > 0
              return (
                <motion.button
                  key={index}
                  onClick={() => router.push(`/messages/${conv.user_id}`)}
                  whileHover={{ backgroundColor: 'rgba(212, 165, 116, 0.05)' }}
                  className="w-full p-4 transition-colors text-left flex gap-4 items-center"
                >
                  <img
                    src={conv.photo_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop'}
                    alt={conv.name || 'Match User'}
                    className="w-14 h-14 rounded-full object-cover shadow-sm"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className={`font-semibold text-lg ${hasUnread ? 'text-foreground' : 'text-foreground/90'}`}>
                        {conv.name || 'Match User'}
                      </p>
                      {conv.lastMessage && (
                        <span className="text-xs text-foreground/50 whitespace-nowrap">
                          {new Date(conv.lastMessage.created_at).toLocaleDateString([], {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-sm truncate ${hasUnread ? 'font-medium text-foreground' : 'text-foreground/60'}`}>
                        {conv.lastMessage 
                          ? conv.lastMessage.message 
                          : <span className="italic">No messages yet. Say hi!</span>}
                      </p>
                      {hasUnread && (
                        <div className="w-5 h-5 rounded-full bg-accent text-white text-xs flex items-center justify-center shrink-0">
                          {conv.unreadCount}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
