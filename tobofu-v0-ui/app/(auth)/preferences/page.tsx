'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin, BookOpen, Briefcase, Heart, UserPlus } from 'lucide-react'
import { createPreference } from '@/lib/api'
import { getCurrentUserId } from '@/lib/auth'

export default function PreferencesPage() {
  const router = useRouter()
  const [userId, setUserId] = useState<number | null>(null)
  
  const [formData, setFormData] = useState({
    min_age: '',
    max_age: '',
    preferred_location: '',
    preferred_education: '',
    preferred_profession: '',
    preferred_religion: ''
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const id = getCurrentUserId()
    if (!id) {
      router.push('/register')
    } else {
      setUserId(Number(id))
    }
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!formData.min_age || !formData.max_age) {
      setError('Please provide age preferences.')
      return
    }

    if (!userId) {
      setError('User ID not found. Please register again.')
      return
    }

    setIsLoading(true)
    try {
      await createPreference({
        user_id: userId,
        min_age: Number(formData.min_age),
        max_age: Number(formData.max_age),
        preferred_location: formData.preferred_location,
        preferred_education: formData.preferred_education,
        preferred_profession: formData.preferred_profession,
        preferred_religion: formData.preferred_religion
      })
      router.push('/photo-upload')
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to save preferences.')
    } finally {
      setIsLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  if (userId === null) return null // Loading state

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h1 className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
          Match Preferences
        </h1>
        <p className="text-foreground/60">
          Tell us what you're looking for in a partner.
        </p>
      </div>

      <div className="p-5 sm:p-8 rounded-2xl bg-card border border-muted premium-shadow space-y-6">
        {error && (
          <div className="mb-4 p-3 rounded bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Minimum Age *</label>
              <div className="relative">
                <UserPlus className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="number"
                  name="min_age"
                  value={formData.min_age}
                  onChange={handleChange}
                  placeholder="e.g. 24"
                  min="18"
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-background border border-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Maximum Age *</label>
              <div className="relative">
                <UserPlus className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="number"
                  name="max_age"
                  value={formData.max_age}
                  onChange={handleChange}
                  placeholder="e.g. 35"
                  max="100"
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-background border border-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Preferred Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                name="preferred_location"
                value={formData.preferred_location}
                onChange={handleChange}
                placeholder="City, Country"
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-background border border-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Preferred Education</label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                name="preferred_education"
                value={formData.preferred_education}
                onChange={handleChange}
                placeholder="Degree, Field"
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-background border border-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Preferred Profession</label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                name="preferred_profession"
                value={formData.preferred_profession}
                onChange={handleChange}
                placeholder="Job Title / Industry"
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-background border border-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Preferred Religion</label>
            <div className="relative">
              <Heart className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                name="preferred_religion"
                value={formData.preferred_religion}
                onChange={handleChange}
                placeholder="Religion"
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-background border border-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            type="submit"
            className="w-full py-3 mt-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                Saving...
              </>
            ) : (
              <>
                Continue to Photos
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  )
}
