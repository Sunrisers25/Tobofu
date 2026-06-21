'use client'

import React from 'react'
import { motion } from 'framer-motion'

const steps = [
  {
    num: '01',
    title: 'Build Your Story',
    body: 'Create a rich, nuanced profile — not just a résumé. Your values, your family, your vision for a life together.',
    img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=600&fit=crop&crop=face',
    side: 'left' as const,
  },
  {
    num: '02',
    title: 'AI Finds Your People',
    body: 'Our engine analyses 150+ compatibility signals daily and curates a handpicked shortlist — not a thousand irrelevant results.',
    img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=600&fit=crop&crop=face',
    side: 'right' as const,
  },
  {
    num: '03',
    title: 'Connect Meaningfully',
    body: 'Start with guided conversations. Move at your own pace. Involve your family when you are ready. There is no rush.',
    img: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=500&h=600&fit=crop',
    side: 'left' as const,
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 md:py-36 overflow-hidden" style={{ background: 'var(--parchment, #EDE4D8)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <p className="badge-maroon mb-5 inline-block">The Journey</p>
          <h2
            className="text-balance text-section-responsive"
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 400,
              letterSpacing: '-0.025em',
            }}
          >
            Three steps to a{' '}
            <em style={{ fontStyle: 'italic', color: '#C1533A' }}>lifetime</em>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="flex flex-col gap-20 md:gap-28">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`grid md:grid-cols-2 gap-12 md:gap-16 items-center ${
                step.side === 'right' ? 'md:[&>*:first-child]:order-2' : ''
              }`}
            >
              {/* Text */}
              <div>
                <p
                  className="mb-4 text-[4rem] leading-none font-light"
                  style={{ fontFamily: 'var(--font-heading)', color: 'rgba(107,30,30,0.15)', letterSpacing: '-0.04em' }}
                >
                  {step.num}
                </p>
                <h3
                  className="mb-4 text-[clamp(1.5rem,3vw,2.25rem)] leading-snug"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {step.title}
                </h3>
                <p className="text-base leading-relaxed w-full max-w-sm" style={{ color: '#3A1F1A' }}>
                  {step.body}
                </p>
                <div className="mt-8 h-px w-16 bg-[#C9A84C] opacity-60" />
              </div>

              {/* Image */}
              <div className="relative px-6 sm:px-0">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] w-full max-w-sm mx-auto shadow-warm-xl">
                  <img
                    src={step.img}
                    alt={step.title}
                    className="w-full h-full object-cover img-reveal"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(44,24,16,0.25) 100%)' }}
                  />
                </div>
                {/* Step number overlay */}
                <div
                  className="absolute -bottom-4 -right-4 w-16 h-16 rounded-2xl gradient-maroon flex items-center justify-center shadow-warm-lg"
                >
                  <span
                    className="text-[#FAF7F2] text-lg font-light"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {step.num}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
