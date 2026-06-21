'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, MessageSquare, Eye, Zap, ArrowRight } from 'lucide-react'
import { sampleNotifications } from '@/lib/sampleData'

export default function DashboardPage() {
  const stats = [
    { label: 'Profile Views', value: 234, icon: Eye, color: 'from-primary to-primary/60' },
    { label: 'Likes Received', value: 45, icon: Heart, color: 'from-accent to-accent/60' },
    { label: 'Messages', value: 12, icon: MessageSquare, color: 'from-secondary to-secondary/60' },
    { label: 'Boosts Left', value: 3, icon: Zap, color: 'from-primary to-accent' }
  ]

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

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Dashboard</h1>
        <p className="text-foreground/60">Welcome back! Here's your activity overview.</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-card border border-muted premium-shadow hover:premium-shadow-lg transition-all"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-foreground/60 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-heading font-semibold">{stat.value}</p>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Profile Completion */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 mb-12"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Profile Completion</h3>
          <span className="text-2xl font-heading font-semibold text-primary">75%</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '75%' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-primary to-accent"
          />
        </div>
        <p className="text-sm text-foreground/60">
          Complete your profile by adding more photos and information to increase your visibility.
        </p>
      </motion.div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-[clamp(1.25rem,2.5vw,1.5rem)] font-semibold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Recent Activity</h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {sampleNotifications.map((notification, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ x: 4 }}
              className="p-4 rounded-lg bg-card border border-muted hover:border-primary/30 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <img
                  src={notification.fromProfile.id}
                  alt={notification.fromProfile.name}
                  className="w-12 h-12 rounded-full bg-primary/20"
                />
                <div className="flex-1">
                  <p className="font-semibold">
                    {notification.fromProfile.name} {notification.type === 'like' ? 'liked you' : 'sent you a message'}
                  </p>
                  <p className="text-sm text-foreground/60">
                    {new Date(notification.timestamp).toLocaleDateString()}
                  </p>
                </div>
                <div
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                    notification.type === 'like'
                      ? 'bg-accent/20 text-accent'
                      : 'bg-primary/20 text-primary'
                  }`}
                >
                  {notification.type === 'like' ? '❤️' : '💬'}
                  {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-center"
      >
        <h3 className="text-[clamp(1.25rem,2.5vw,1.5rem)] font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Ready to meet someone?</h3>
        <p className="text-foreground/60 mb-6">
          Discover amazing matches tailored just for you.
        </p>
        <Link href="/discover">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            Start Discovering
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </Link>
      </motion.div>
    </div>
  )
}
