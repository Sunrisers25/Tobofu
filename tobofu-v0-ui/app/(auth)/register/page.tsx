'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Lock, ArrowRight, CheckCircle, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createUser } from '@/lib/api'
import { setCurrentUserId } from '@/lib/auth'
import { GoogleAuthButton } from '@/components/common/GoogleAuthButton'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!formData.name) {
      setError('Please enter your name')
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (!formData.agreeToTerms) {
      setError('Please agree to terms and conditions')
      return
    }
    setIsLoading(true)
    try {
      const response = await createUser({
        name: formData.name,
        email: formData.email,
        google_id: '' // Provide empty or null depending on schema
      })
      
      if (response && response.user_id) {
        setCurrentUserId(response.user_id)
        router.push('/profile-setup')
      } else {
        setError('Failed to create account. Please try again.')
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'An error occurred during registration.')
    } finally {
      setIsLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  const passwordsMatch = formData.password === formData.confirmPassword && formData.password !== ''

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
          Create Your Profile
        </h1>
        <p className="text-foreground/60">
          Join our community and find your perfect match.
        </p>
      </div>

      {/* Card */}
      <div className="p-5 sm:p-8 rounded-2xl bg-card border border-muted premium-shadow space-y-6">
        {/* Email Field */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          {error && (
            <div className="mb-4 p-3 rounded bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {error}
            </div>
          )}
          
          <label className="block text-sm font-medium text-foreground mb-2">
            Full Name
          </label>
          <div className="relative mb-4">
            <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-background border border-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>

          <label className="block text-sm font-medium text-foreground mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-background border border-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>
        </motion.div>

        {/* Password Field */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-sm font-medium text-foreground mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-background border border-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>
          <p className="text-xs text-foreground/60 mt-1">At least 8 characters</p>
        </motion.div>

        {/* Confirm Password Field */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-sm font-medium text-foreground mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-background border border-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
            {passwordsMatch && (
              <CheckCircle className="absolute right-3 top-3 w-5 h-5 text-accent" />
            )}
          </div>
        </motion.div>

        {/* Terms Checkbox */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-start gap-3"
        >
          <input
            type="checkbox"
            id="terms"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className="w-4 h-4 rounded border-muted bg-background cursor-pointer accent-primary mt-1"
          />
          <label htmlFor="terms" className="text-sm text-foreground/60 cursor-pointer">
            I agree to the{' '}
            <Link href="#" className="text-primary hover:text-primary/80 font-medium">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="#" className="text-primary hover:text-primary/80 font-medium">
              Privacy Policy
            </Link>
          </label>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading || !formData.agreeToTerms}
          className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          onClick={handleSubmit}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
              Creating account...
            </>
          ) : (
            <>
              Create Account
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </motion.button>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="relative"
        >
          <div className="absolute inset-x-0 top-1/2 border-t border-muted -translate-y-1/2" />
          <div className="flex justify-center">
            <span className="bg-card text-xs text-foreground/60 px-2">
              or sign up with
            </span>
          </div>
        </motion.div>

        {/* Google Sign Up */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <GoogleAuthButton />
        </motion.div>
      </div>

      {/* Login Link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center"
      >
        <p className="text-foreground/60">
          Already have an account?{' '}
          <Link href="/login" className="text-primary hover:text-primary/80 font-semibold transition-colors">
            Log in
          </Link>
        </p>
      </motion.div>
    </motion.div>
  )
}
