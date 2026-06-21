'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, MapPin, Briefcase, Loader2 } from 'lucide-react'
import { getMyMatches } from '@/lib/api'
import { getCurrentUserId } from '@/lib/auth'
import { useRouter } from 'next/navigation'

export default function MatchesPage() {
  const [matches, setMatches] = React.useState<any[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState('')
  const router = useRouter()

  React.useEffect(() => {
    const userId = getCurrentUserId()
    if (!userId) {
      router.push('/login')
    } else {
      fetchMatches(userId)
    }
  }, [router])

  const fetchMatches = async (userId: string) => {
    try {
      setIsLoading(true)
      const data = await getMyMatches(userId)
      setMatches(Array.isArray(data) ? data : data.matches || [])
    } catch (err: any) {
      setError('Failed to load matches.')
    } finally {
      setIsLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] text-destructive">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>My Matches</h1>
        <p className="text-foreground/60">
          You have {matches.length} perfect matches waiting for you.
        </p>
      </motion.div>

      {/* Matches Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {matches.map((match, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -8 }}
            className="group"
          >
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-muted to-muted/50 premium-shadow hover:premium-shadow-lg transition-all duration-300 h-[28rem]">
              {/* Image */}
              <img
                src={match.photo_url || (match.profile && match.profile.photos && match.profile.photos[0]) || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop'}
                alt={match.name || match.profile?.name || 'Match'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Compatibility Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-accent to-pink-500 backdrop-blur-md text-white font-bold premium-shadow border border-white/20 text-sm"
              >
                <div className="w-2 h-2 rounded-full bg-yellow-300 animate-pulse" />
                {match.compatibilityScore}% Match
              </motion.div>

              {/* Profile Info */}
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <h3 className="text-xl sm:text-2xl font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  {match.name || match.profile?.name}{match.age || match.profile?.age ? `, ${match.age || match.profile?.age}` : ''}
                </h3>

                <div className="flex items-center gap-1 text-white/80 mb-3 text-sm">
                  <MapPin className="w-4 h-4" />
                  {match.location || match.profile?.location || 'Unknown Location'}
                </div>

                <div className="flex items-center gap-1 text-white/80 mb-4 text-sm">
                  <Briefcase className="w-4 h-4" />
                  {match.profession || match.profile?.profession || 'Unknown Profession'}
                </div>

                {/* Compatibility Breakdown */}
                {match.compatibilityBreakdown && match.compatibilityBreakdown.length > 0 && (
                  <div className="rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 p-2 mb-4">
                    <h4 className="text-xs font-semibold mb-1 text-white/90">Compatibility Breakdown</h4>
                    <ul className="space-y-0.5">
                      {match.compatibilityBreakdown.map((reason: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-1.5 text-[10px] text-white/80">
                          <span className="text-green-400 font-bold">✓</span> {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (match?.user_id) {
                        router.push(`/profile/${match.user_id}`)
                      }
                    }}
                    className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
                  >
                    View Profile
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (match?.user_id) {
                        router.push(`/messages/${match.user_id}`)
                      }
                    }}
                    className="flex-1 py-2 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Message
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
