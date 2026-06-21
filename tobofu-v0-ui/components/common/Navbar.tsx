'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Bell } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getNotifications, markNotificationRead } from '@/lib/api'
import { getCurrentUserId } from '@/lib/auth'

interface NavbarProps {
  isDashboard?: boolean
}

const navLinks = [
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#success-stories', label: 'Success Stories' },
  { href: '#features', label: 'Why Tobofu' },
]

export function Navbar({ isDashboard = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notifications, setNotifications] = useState<any[]>([])
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    if (isDashboard) {
      loadNotifications()
    }
  }, [isDashboard])

  const loadNotifications = async () => {
    try {
      const currentUserId = getCurrentUserId()
      if (currentUserId) {
        const data = await getNotifications(currentUserId)
        const notifs = Array.isArray(data) ? data : (data?.notifications || [])
        setNotifications(notifs)
      }
    } catch (error) {
      console.error('Failed to load notifications', error)
    }
  }

  const handleNotificationClick = async (notif: any) => {
    if (!notif.is_read) {
      try {
        await markNotificationRead(notif.id)
        setNotifications((prev) =>
          prev.map((n) => (n.id === notif.id ? { ...n, is_read: true } : n))
        )
      } catch (error) {
        console.error('Failed to mark read', error)
      }
    }
    setDropdownOpen(false)

    if (notif.type === 'NEW_MATCH') {
      router.push('/matches')
    } else if (notif.type === 'NEW_MESSAGE') {
      router.push('/messages') // or to specific chat if we had sender_id in notif
    } else if (notif.type === 'PROFILE_VIEW') {
      // Just take them to discover or matches since we don't have the viewer's ID in notif directly, 
      // but maybe the message has the name. Let's just go to matches for now.
      router.push('/matches')
    }
  }

  const unreadCount = notifications.filter(n => !n.is_read).length

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass shadow-warm py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4 min-w-0">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-8 h-8 rounded-full gradient-maroon flex items-center justify-center shadow-warm">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 13.5C8 13.5 1.5 9.5 1.5 5.5C1.5 3.567 3.067 2 5 2C6.19 2 7.24 2.6 8 3.5C8.76 2.6 9.81 2 11 2C12.933 2 14.5 3.567 14.5 5.5C14.5 9.5 8 13.5 8 13.5Z"
                  fill="#FAF7F2"
                />
              </svg>
            </div>
            <span
              className="text-xl font-medium tracking-tight"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--foreground)' }}
            >
              Tobofu
            </span>
          </Link>

          {/* Desktop nav links */}
          {!isDashboard && (
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium hover:text-foreground transition-colors duration-200 tracking-wide"
                  style={{ color: '#3A1F1A' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {/* CTA & Notifications */}
          <div className="flex items-center gap-4">
            {isDashboard && (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="relative p-2 rounded-full hover:bg-muted transition-colors flex items-center justify-center"
                >
                  <Bell className="w-6 h-6 text-foreground/80" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-5 h-5 bg-accent text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-background">
                      {unreadCount}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-80 bg-card border border-muted rounded-2xl shadow-xl overflow-hidden z-50"
                    >
                      <div className="p-4 border-b border-muted bg-muted/30">
                        <h3 className="font-semibold text-foreground">Notifications</h3>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-6 text-center text-foreground/50 text-sm">
                            No notifications yet.
                          </div>
                        ) : (
                          <div className="flex flex-col">
                            {notifications.map((notif) => (
                              <button
                                key={notif.id}
                                onClick={() => handleNotificationClick(notif)}
                                className={`w-full text-left p-4 border-b border-muted transition-colors hover:bg-muted/50 ${
                                  !notif.is_read ? 'bg-primary/5' : ''
                                }`}
                              >
                                <div className="flex justify-between items-start mb-1">
                                  <span className={`text-sm font-semibold ${!notif.is_read ? 'text-foreground' : 'text-foreground/70'}`}>
                                    {notif.title}
                                  </span>
                                  {!notif.is_read && (
                                    <div className="w-2 h-2 rounded-full bg-accent mt-1" />
                                  )}
                                </div>
                                <p className={`text-sm ${!notif.is_read ? 'text-foreground/90 font-medium' : 'text-foreground/60'}`}>
                                  {notif.message}
                                </p>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {!isDashboard && (
              <div className="hidden md:flex items-center gap-4">
                <Link
                  href="/login"
                  className="text-sm font-medium hover:text-foreground transition-colors"
                  style={{ color: '#3A1F1A' }}
                >
                  Sign In
                </Link>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/register"
                    className="px-5 py-2.5 rounded-full text-sm font-semibold gradient-maroon text-[#FAF7F2] shadow-warm hover:opacity-90 transition-opacity"
                  >
                    Begin Your Journey
                  </Link>
                </motion.div>
              </div>
            )}

            {/* Mobile hamburger */}
            {!isDashboard && (
              <button
                className="md:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[60px] inset-x-0 z-40 glass shadow-warm-lg border-b border-border md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-base font-medium hover:text-foreground border-b border-border/50 last:border-0 transition-colors"
                  style={{ color: '#3A1F1A' }}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 pt-4">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="py-2.5 text-center text-sm font-semibold border border-border rounded-full hover:bg-muted/30 transition-colors"
                  style={{ color: '#3A1F1A' }}
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="py-2.5 text-center text-sm font-semibold gradient-maroon text-[#FAF7F2] rounded-full shadow-warm"
                >
                  Begin Your Journey
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
