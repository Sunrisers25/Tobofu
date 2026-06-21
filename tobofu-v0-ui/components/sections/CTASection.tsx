'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck } from 'lucide-react'

export function CTASection() {
  return (
    <section className="relative py-28 md:py-40 overflow-hidden">

      {/* ── Mesh background ── */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 50%, rgba(193,83,58,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 60% 70% at 80% 30%, rgba(201,168,76,0.15) 0%, transparent 60%),
            radial-gradient(ellipse 40% 50% at 60% 80%, rgba(107,30,30,0.12) 0%, transparent 60%),
            #FAF7F2
          `,
        }}
      />

      {/* ── Subtle top-border line ── */}
      <div className="absolute top-0 inset-x-0 divider-gold" />

      {/* ── Floating couple image ── */}
      <motion.div
        className="absolute right-0 top-0 bottom-0 w-2/5 hidden lg:block overflow-hidden"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src="https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=900&h=1200&fit=crop&crop=center"
          alt="Couple"
          className="w-full h-full object-cover"
          style={{ maskImage: 'linear-gradient(to left, black 40%, transparent 100%)' }}
        />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="max-w-xl">

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="badge-warm mb-8"
          >
            Begin Today
          </motion.p>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-balance text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.06]"
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
            }}
          >
            Your person is{' '}
            <em style={{ fontStyle: 'italic', color: '#C1533A' }}>already here.</em>
            <br />
            Are you ready?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-6 text-base md:text-lg leading-relaxed"
            style={{ color: '#3A1F1A' }}
          >
            Fifty thousand families began the same way — with a profile, a hope, and a
            willingness to trust the process. Yours could be next.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.26 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-start gap-4 mt-10 w-full max-w-sm sm:max-w-none"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full gradient-maroon text-[#FAF7F2] font-semibold text-base shadow-warm-lg hover:opacity-90 transition-opacity w-full sm:w-auto"
              >
                Create Free Profile
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-border text-foreground font-medium text-base hover:border-[#C9A84C] hover:text-foreground transition-colors w-full sm:w-auto"
            >
              Sign In
            </Link>
          </motion.div>

          {/* Trust line */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.38 }}
            className="flex flex-wrap items-center gap-6 mt-10 pt-8 border-t border-border/60 text-xs font-medium"
            style={{ color: '#3A1F1A' }}
          >
            {[
              'Free to join',
              'Verified profiles only',
              'No spam, ever',
              'Cancel anytime',
            ].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C9A84C]" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
