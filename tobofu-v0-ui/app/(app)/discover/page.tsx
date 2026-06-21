'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { Heart, X, Zap, MapPin, Briefcase, Users, Loader2 } from 'lucide-react'
import { getMatches, swipeUser } from '@/lib/api'
import { getCurrentUserId } from '@/lib/auth'
import { Profile } from '@/lib/types'
import { useRouter } from 'next/navigation'

export default function DiscoverPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [matches, setMatches] = useState<string[]>([])
  const [profiles, setProfiles] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [userId, setUserId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const id = getCurrentUserId()
    if (!id) {
      router.push('/login')
    } else {
      setUserId(id)
      fetchMatches(id)
    }
  }, [router])

  const fetchMatches = async (id: string) => {
    try {
      setIsLoading(true)
      const data = await getMatches(id)
      // data might be a list of profiles or an object. Assumed list of profiles:
      setProfiles(Array.isArray(data) ? data : data.matches || [])
    } catch (err: any) {
      setError('Failed to load matches. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  const currentProfile = profiles[currentIndex]
  const profileCount = profiles.length

  const handleSwipe = async (dir: number) => {
    if (!currentProfile || !userId) return
    
    setDirection(dir)
    const action = dir === 1 ? 'like' : 'pass'
    
    if (dir === 1) {
      setMatches([...matches, currentProfile.user_id || currentProfile.id])
    }

    try {
      await swipeUser({
        from_user_id: userId,
        to_user_id: currentProfile.user_id || currentProfile.id,
        action: action
      })
    } catch (err) {
      console.error('Failed to register swipe', err)
    }

    // Move to next profile
    if (currentIndex < profileCount) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const variants: Variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 500 : -500,
        opacity: 0
      }
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 500 : -500,
        opacity: 0,
        transition: {
          x: { type: 'spring', stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 }
        }
      }
    }
  }

  if (currentIndex >= profileCount) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-accent/20 mb-6"
          >
            <Heart className="w-12 h-12 text-accent fill-accent" />
          </motion.div>
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            {matches.length > 0 ? `You liked ${matches.length} profiles!` : "That's everyone for now!"}
          </h2>
          <p className="text-foreground/60 mb-8">
            Check your matches page to see who liked you back.
          </p>
          <button onClick={() => router.push('/matches')} className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
            Go to Matches
          </button>
        </div>
      </div>
    )
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

  if (profileCount === 0) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] text-center">
        <div>
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            No more profiles
          </h2>
          <p className="text-foreground/60">Check back later for new matches!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] p-4">
      <div className="w-full max-w-md">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              {currentIndex + 1} of {profileCount}
            </span>
            <span className="text-sm text-foreground/60">
              {matches.length} likes
            </span>
          </div>
          <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / profileCount) * 100}%` }}
              className="h-full bg-primary"
            />
          </div>
        </div>

        {/* Card Stack */}
        <div className="relative h-96 md:h-[500px] mb-8">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 w-full"
            >
              <ProfileCard profile={currentProfile} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSwipe(-1)}
            className="flex-1 py-4 rounded-full border-2 border-muted bg-background hover:border-destructive hover:bg-destructive/5 transition-colors flex items-center justify-center gap-2 font-semibold"
          >
            <X className="w-5 h-5" />
            <span className="hidden sm:inline">Pass</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSwipe(1)}
            className="flex-1 py-4 rounded-full bg-accent text-white hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 font-semibold premium-shadow"
          >
            <Heart className="w-5 h-5 fill-current" />
            <span className="hidden sm:inline">Like</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 py-4 rounded-full border-2 border-primary bg-background hover:border-primary/70 hover:bg-primary/5 transition-colors flex items-center justify-center gap-2 font-semibold"
          >
            <Zap className="w-5 h-5" />
            <span className="hidden sm:inline">Boost</span>
          </motion.button>
        </div>
      </div>
    </div>
  )
}

function ProfileCard({ profile }: { profile: Profile }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="h-full relative rounded-3xl overflow-hidden bg-gradient-to-br from-muted to-muted/50 premium-shadow"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={profile.photo_url || (profile.photos && profile.photos[0]) || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop'}
          alt={profile.name || 'User'}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Compatibility Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent to-pink-500 backdrop-blur-md text-white font-bold premium-shadow border border-white/20"
      >
        <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" />
        {profile.compatibilityScore}% Match
      </motion.div>

      {/* Profile Info */}
      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
        {/* Name and Age */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-3xl font-semibold mb-1" style={{ fontFamily: 'var(--font-heading)' }}
        >
          {profile.name}, {profile.age}
        </motion.h2>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex items-center gap-2 text-white/80 mb-4"
        >
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{profile.location}</span>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-4"
        >
          <TagBadge icon={<Briefcase className="w-3 h-3" />} label={profile.profession} />
          <TagBadge icon={<Users className="w-3 h-3" />} label={profile.religion} />
          <TagBadge label={profile.education} />
        </motion.div>

        {/* Compatibility Breakdown */}
        {profile.compatibilityBreakdown && profile.compatibilityBreakdown.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 p-3 mt-2"
          >
            <h3 className="text-sm font-semibold mb-2 text-white/90">Compatibility Breakdown</h3>
            <ul className="space-y-1">
              {profile.compatibilityBreakdown.map((reason, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs text-white/80">
                  <span className="text-green-400">✓</span> {reason}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>

      {/* Online Status */}
      {profile.onlineStatus === 'online' && (
        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/80 text-white text-xs font-semibold">
          <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
          Online Now
        </div>
      )}
    </motion.div>
  )
}

function TagBadge({
  icon,
  label
}: {
  icon?: React.ReactNode
  label: string
}) {
  return (
    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-medium">
      {icon && icon}
      <span>{label}</span>
    </div>
  )
}
