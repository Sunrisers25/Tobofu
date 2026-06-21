'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'
import { Sparkles, ShieldCheck, Users, Lock, Brain, Heart } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI Compatibility Engine',
    description:
      'Our proprietary algorithm analyses 150+ compatibility dimensions — personality, values, lifestyle, family background — to surface matches that genuinely align.',
    tag: 'Intelligence',
  },
  {
    icon: ShieldCheck,
    title: 'Verified Profiles',
    description:
      'Every profile is verified through government ID, professional credentials, and community references. You meet real people with honest intentions.',
    tag: 'Trust',
  },
  {
    icon: Users,
    title: 'Family-Centric Matching',
    description:
      'Matrimony is a union of families. Our platform lets families participate thoughtfully — with privacy controls that respect individual boundaries.',
    tag: 'Community',
  },
  {
    icon: Sparkles,
    title: 'Smart Preferences',
    description:
      'Go beyond age and location. Set nuanced preferences — spiritual inclination, dietary habits, values, hobbies — and let AI learn your real criteria over time.',
    tag: 'Personalisation',
  },
  {
    icon: Lock,
    title: 'Privacy by Design',
    description:
      'Blur photos until you choose to reveal. Control who sees your number, profession, or location. Your data is yours — always.',
    tag: 'Privacy',
  },
  {
    icon: Heart,
    title: 'Guided Conversations',
    description:
      'AI-suggested conversation starters help break the ice naturally. Structured check-ins track your connection health and guide the relationship forward.',
    tag: 'Connection',
  },
]

const card: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
}

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 md:py-36 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-16 md:mb-20"
        >
          <p className="badge-maroon mb-5">Why Tobofu</p>
          <h2
            className="text-balance text-section-responsive"
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 400,
              letterSpacing: '-0.025em',
              color: 'var(--foreground)',
            }}
          >
            Built for the most important{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--terracotta, #C1533A)' }}>
              decision
            </em>{' '}
            of your life
          </h2>
          <p className="mt-5 text-lg leading-relaxed" style={{ color: '#3A1F1A' }}>
            Every feature is designed with a single purpose: to help you find a partner
            who enriches your life for decades, not just days.
          </p>
        </motion.div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                custom={i}
                variants={card}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                whileHover={{ y: -4 }}
                className="trust-card group"
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-10 h-10 rounded-xl gradient-maroon flex items-center justify-center flex-shrink-0 shadow-warm group-hover:shadow-warm-lg transition-shadow">
                    <Icon className="w-4.5 h-4.5 text-[#FAF7F2]" strokeWidth={1.5} />
                  </div>
                  <span className="mt-2.5 text-[10px] font-semibold tracking-[0.1em] uppercase text-[#C9A84C]">
                    {feature.tag}
                  </span>
                </div>

                <h3
                  className="mb-3 text-[1.15rem] leading-snug"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 500,
                    color: 'var(--foreground)',
                  }}
                >
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#3A1F1A' }}>
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-10 border-t border-border/60 grid grid-cols-2 sm:grid-cols-4 gap-6"
        >
          {[
            { num: '2M+',  label: 'Active members' },
            { num: '150+', label: 'Compatibility dimensions' },
            { num: '50K+', label: 'Marriages celebrated' },
            { num: '98%',  label: 'Satisfaction rate' },
          ].map(({ num, label }) => (
            <div key={label} className="text-center">
              <p
                className="text-section-responsive"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 400,
                  color: '#C1533A',
                  letterSpacing: '-0.03em',
                }}
              >
                {num}
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest font-medium" style={{ color: '#5C4A42' }}>{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
