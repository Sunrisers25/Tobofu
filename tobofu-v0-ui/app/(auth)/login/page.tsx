'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Lock, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { loginUser } from '@/lib/api'
import { setCurrentUserId } from '@/lib/auth'
import { GoogleAuthButton } from '@/components/common/GoogleAuthButton'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await loginUser({ email, password })
      
      if (response.user_id) {
        setCurrentUserId(response.user_id.toString())
        router.push('/discover')
      } else {
        console.error("Login failed:", response.message)
      }
    } catch (err) {
      console.error("Login error:", err)
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
          Welcome Back
        </h1>
        <p className="text-foreground/60">
          Log in to continue your journey to love.
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
          <label className="block text-sm font-medium text-foreground mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-foreground">
              Password
            </label>
            <Link
              href="#"
              className="text-xs text-primary hover:text-primary/80 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-background border border-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>
        </motion.div>

        {/* Remember Me */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center"
        >
          <input
            type="checkbox"
            id="remember"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded border-muted bg-background cursor-pointer accent-primary"
          />
          <label htmlFor="remember" className="ml-2 text-sm text-foreground/60 cursor-pointer">
            Remember me
          </label>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
          className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          onClick={handleSubmit}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
              Logging in...
            </>
          ) : (
            <>
              Log In
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </motion.button>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative"
        >
          <div className="absolute inset-x-0 top-1/2 border-t border-muted -translate-y-1/2" />
          <div className="flex justify-center">
            <span className="bg-card text-xs text-foreground/60 px-2">
              or continue with
            </span>
          </div>
        </motion.div>

        {/* Google Sign In */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <GoogleAuthButton />
        </motion.div>
      </div>

      {/* Sign Up Link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-center"
      >
        <p className="text-foreground/60">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-primary hover:text-primary/80 font-semibold transition-colors">
            Sign up
          </Link>
        </p>
      </motion.div>
    </motion.div>
  )
}
