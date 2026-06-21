'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter, useParams } from 'next/navigation'
import { getProfile } from '@/lib/api'
import { getCurrentUserId } from '@/lib/auth'
import { Loader2, ArrowLeft, MessageCircle, MapPin, Briefcase, GraduationCap, Heart, Users, Calendar, Zap } from 'lucide-react'

export default function ProfileViewPage() {
  const router = useRouter()
  const params = useParams()
  const userId = Number(params.userId)

  const [profile, setProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (userId) {
      loadProfile()
    }
  }, [userId])

  const loadProfile = async () => {
    try {
      setIsLoading(true)
      const currentUserId = getCurrentUserId()
      const data = await getProfile(userId, currentUserId || undefined)
      setProfile(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
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

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] text-center p-4">
        <h2 className="text-2xl font-bold text-foreground mb-4">Profile Not Found</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/matches')}
          className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-semibold"
        >
          Back to Matches
        </motion.button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8 min-h-[calc(100vh-64px)] pb-24 md:pb-8">
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => router.push('/matches')}
          className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Matches
        </button>
      </div>

      {/* Main Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-3xl border border-muted premium-shadow overflow-hidden"
      >
        {/* Photo Section */}
        <div className="relative h-96 md:h-[500px] w-full bg-muted/30">
          <img
            src={profile.photo_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80'}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
          
          {profile.compatibilityScore !== undefined && profile.compatibilityScore !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent to-pink-500 backdrop-blur-md text-white font-bold premium-shadow border border-white/20 text-sm z-10"
            >
              <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              {profile.compatibilityScore}% Match
            </motion.div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-8">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-2">
              {profile.name}{profile.age ? `, ${profile.age}` : ''}
            </h1>
            <p className="text-white/90 text-lg flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              {profile.location || 'Unknown Location'}
            </p>
          </div>
        </div>

        {/* Info Content Section */}
        <div className="p-6 md:p-8 space-y-8">
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/30 p-4 rounded-2xl flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-foreground/50 font-medium uppercase tracking-wider mb-1">Profession</p>
                <p className="text-foreground font-medium">{profile.profession || 'Not specified'}</p>
              </div>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-2xl flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-foreground/50 font-medium uppercase tracking-wider mb-1">Education</p>
                <p className="text-foreground font-medium">{profile.education || 'Not specified'}</p>
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-2xl flex items-start gap-3">
              <Heart className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-foreground/50 font-medium uppercase tracking-wider mb-1">Religion</p>
                <p className="text-foreground font-medium">{profile.religion || 'Not specified'}</p>
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-2xl flex items-start gap-3">
              <Users className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-foreground/50 font-medium uppercase tracking-wider mb-1">Community</p>
                <p className="text-foreground font-medium">{profile.community || 'Not specified'}</p>
              </div>
            </div>
          </div>

          {/* Compatibility Breakdown */}
          {profile.compatibilityBreakdown && profile.compatibilityBreakdown.length > 0 && (
            <div>
              <h3 className="text-xl font-heading font-semibold mb-3">Compatibility Breakdown</h3>
              <div className="bg-muted/10 p-5 rounded-2xl border border-muted">
                <ul className="space-y-2">
                  {profile.compatibilityBreakdown.map((reason: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-2 text-foreground/80">
                      <span className="text-green-500 font-bold">✓</span> {reason}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* About Section */}
          <div>
            <h3 className="text-xl font-heading font-semibold mb-3">About</h3>
            <p className="text-foreground/80 leading-relaxed bg-muted/10 p-5 rounded-2xl border border-muted">
              {profile.bio || "This user hasn't written a bio yet."}
            </p>
          </div>

        </div>
      </motion.div>

      {/* Floating Action Bar for Mobile / Sticky for Desktop */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-xl border-t border-muted md:static md:bg-transparent md:border-none md:p-0 md:mt-6 z-50"
      >
        <div className="max-w-2xl mx-auto flex gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push(`/messages/${userId}`)}
            className="flex-1 py-4 rounded-xl bg-accent text-white font-semibold shadow-lg shadow-accent/20 flex items-center justify-center gap-2 text-lg"
          >
            <MessageCircle className="w-6 h-6" />
            Send Message
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
