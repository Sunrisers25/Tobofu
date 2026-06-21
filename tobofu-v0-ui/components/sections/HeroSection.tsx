'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Sparkles, Star } from 'lucide-react'

/* ── Profile preview card data ── */
const previewProfiles = [
  {
    name: 'Priya S.',
    age: 28,
    city: 'Mumbai',
    profession: 'Architect',
    match: 96,
    img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=260&fit=crop&crop=face',
  },
  {
    name: 'Arjun M.',
    age: 31,
    city: 'Bengaluru',
    profession: 'Cardiologist',
    match: 94,
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=260&fit=crop&crop=face',
  },
]

/* ── Trust indicators ── */
const trustBadges = [
  { icon: ShieldCheck, label: 'Verified Profiles', value: '100%' },
  { icon: Sparkles,   label: 'AI Matched',        value: '2M+' },
  { icon: Star,       label: 'Success Stories',   value: '50K+' },
]

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden gradient-ivory flex flex-col">

      {/* ── Background texture layer ── */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232C1810' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Warm radial glow ── */}
      <div
        aria-hidden
        className="absolute top-0 right-0 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, #C1533A 0%, #E8907A 30%, transparent 70%)',
          transform: 'translate(30%, -30%)',
        }}
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-0 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full opacity-15 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, #C9A84C 0%, transparent 70%)',
          transform: 'translate(-30%, 30%)',
        }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-28 pb-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* LEFT — Editorial headline + CTAs */}
            <div className="flex flex-col items-start">

              {/* Eyebrow badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="badge-warm mb-8 max-w-full flex-wrap"
              >
                <Sparkles className="w-3 h-3 text-[#8B6914] flex-shrink-0" />
                <span>AI-Powered Matrimonial · Trusted by 2 Million Families</span>
              </motion.div>

              {/* Cinematic headline */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="text-balance text-hero-responsive"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 400,
                  letterSpacing: '-0.03em',
                  color: 'var(--espresso, #2C1810)',
                }}
              >
                Where Every{' '}
                <em
                  style={{
                    fontStyle: 'italic',
                    color: 'var(--terracotta, #C1533A)',
                    display: 'inline',
                  }}
                >
                  Soul
                </em>
                <br />
                Finds Its{' '}
                <em style={{ fontStyle: 'italic' }}>Home</em>
              </motion.h1>

              {/* Sub-copy */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-7 text-base sm:text-lg leading-relaxed w-full max-w-lg"
                style={{ color: '#3A1F1A' }}
              >
                Samanvaya Bandhan blends the wisdom of tradition with the precision of AI — to help you
                find a partner worthy of a lifetime, not just a moment.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col xs:flex-row items-start gap-4 mt-10 w-full"
              >
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full gradient-maroon text-[#FAF7F2] font-semibold text-base shadow-warm-lg hover:opacity-90 transition-opacity"
                  >
                    Start Your Journey
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
                <Link
                  href="#success-stories"
                  className="inline-flex items-center gap-2 text-sm font-medium hover:text-foreground transition-colors"
                  style={{ color: '#3A1F1A' }}
                >
                  <span className="w-8 h-px bg-current opacity-50" />
                  Read Success Stories
                </Link>
              </motion.div>

              {/* Trust badges row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="flex flex-wrap items-center gap-4 sm:gap-6 mt-12 pt-8 border-t border-border/60 w-full"
              >
                {trustBadges.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[#C9A84C]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{value}</p>
                      <p className="text-xs" style={{ color: '#5C4A42' }}>{label}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* RIGHT — Profile preview cards + hero image */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative hidden lg:flex items-center justify-center"
            >
              {/* Hero lifestyle image */}
              <div className="relative w-full max-w-[420px] aspect-[3/4] rounded-3xl overflow-hidden shadow-warm-xl">
                <img
                  src="https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=840&h=1120&fit=crop&crop=center"
                  alt="Happy couple"
                  className="w-full h-full object-cover"
                />
                {/* Warm overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(44,24,16,0.45) 100%)' }}
                />
                {/* Bottom caption */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="glass rounded-2xl px-4 py-3">
                    <p className="text-xs uppercase tracking-widest mb-0.5" style={{ color: '#5C4A42' }}>
                      Matched by Samanvaya Bandhan
                    </p>
                    <p
                      className="text-base font-medium"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      Kavya & Sanjay — Wed June 2024
                    </p>
                  </div>
                </div>
              </div>

              {/* Profile card — top left float */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-8 top-12 w-44 glass shadow-warm-lg rounded-2xl overflow-hidden"
              >
                <img
                  src={previewProfiles[0].img}
                  alt={previewProfiles[0].name}
                  className="w-full h-28 object-cover"
                />
                <div className="p-3">
                  <p className="text-sm font-semibold">{previewProfiles[0].name}, {previewProfiles[0].age}</p>
                  <p className="text-xs" style={{ color: '#5C4A42' }}>{previewProfiles[0].profession} · {previewProfiles[0].city}</p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full gradient-gold"
                        style={{ width: `${previewProfiles[0].match}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-semibold text-gold">{previewProfiles[0].match}%</span>
                  </div>
                </div>
              </motion.div>

              {/* Profile card — bottom right float */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                className="absolute -right-8 bottom-20 w-44 glass shadow-warm-lg rounded-2xl overflow-hidden"
              >
                <img
                  src={previewProfiles[1].img}
                  alt={previewProfiles[1].name}
                  className="w-full h-28 object-cover"
                />
                <div className="p-3">
                  <p className="text-sm font-semibold">{previewProfiles[1].name}, {previewProfiles[1].age}</p>
                  <p className="text-xs" style={{ color: '#5C4A42' }}>{previewProfiles[1].profession} · {previewProfiles[1].city}</p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full gradient-gold"
                        style={{ width: `${previewProfiles[1].match}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-semibold text-gold">{previewProfiles[1].match}%</span>
                  </div>
                </div>
              </motion.div>

              {/* AI match insight chip */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-4 right-4 glass shadow-warm rounded-full px-4 py-2 flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse-gold" />
                <span className="text-xs font-semibold" style={{ color: '#3A1F1A' }}>AI Matching Active</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Scrolling trust ticker ── */}
      <div className="relative z-10 border-t border-border/60 py-4 overflow-hidden bg-white/40 backdrop-blur-sm">
        <div className="flex animate-ticker" style={{ width: 'max-content' }}>
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-10 pr-10 flex-shrink-0">
              {[
                '2 Million+ Verified Profiles',
                '50,000 Marriages Celebrated',
                '98% Satisfaction Rate',
                'End-to-End Encrypted',
                'Community Verified',
                'Trusted Since 2018',
              ].map((item) => (
                <span key={item} className="flex items-center gap-3 text-sm font-medium whitespace-nowrap flex-shrink-0" style={{ color: '#5C4A42' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] opacity-70 flex-shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
