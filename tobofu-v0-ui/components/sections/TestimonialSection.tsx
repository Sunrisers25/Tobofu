'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Star, ShieldCheck, Lock, Users, Sparkles, Award } from 'lucide-react'

const testimonials = [
  {
    name: 'Priya Venkatesh',
    role: 'Married · November 2024',
    city: 'Bengaluru',
    content:
      'I had all but given up. Samanvaya Bandhan was my last attempt — and within three weeks I matched with someone who felt like I had written him into existence.',
    rating: 5,
    img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face',
  },
  {
    name: 'Rohan Khanna',
    role: 'Married · August 2024',
    city: 'Delhi',
    content:
      'The profile depth is unlike anything else. My partner had written paragraphs about what she believed in. We had our first real conversation before we even met.',
    rating: 5,
    img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face',
  },
  {
    name: 'Anjali Menon',
    role: 'Married · April 2024',
    city: 'Kochi',
    content:
      'My parents were involved from the start. Samanvaya Bandhan gives families space to participate without pressure. That balance made all the difference for us.',
    rating: 5,
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
  },
]

const trustItems = [
  {
    icon: ShieldCheck,
    title: 'Verified Profiles',
    body: 'Every member verified via government ID. Zero fake profiles, guaranteed.',
  },
  {
    icon: Lock,
    title: 'Privacy First',
    body: 'Your photos, number, and location are never shared without your explicit consent.',
  },
  {
    icon: Users,
    title: 'Community Reviewed',
    body: 'Active community reporting with a 24-hour response team ensures safety at every step.',
  },
  {
    icon: Sparkles,
    title: 'AI Transparency',
    body: 'We explain every match recommendation. No black boxes — you understand why we suggest someone.',
  },
  {
    icon: Award,
    title: 'Certified Platform',
    body: 'ISO 27001 certified. Your data protection is audited annually by a third-party security firm.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Messaging',
    body: 'All conversations are end-to-end encrypted. We cannot read your messages — nobody can.',
  },
]

export function TestimonialSection() {
  return (
    <section id="testimonials" className="py-24 md:py-36 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <p className="badge-maroon mb-5 inline-block">Voices From Our Community</p>
          <h2
            className="text-balance text-section-responsive"
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 400,
              letterSpacing: '-0.025em',
            }}
          >
            Words from people who found what they{' '}
            <em style={{ fontStyle: 'italic', color: '#C1533A' }}>were looking for</em>
          </h2>
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="trust-card flex flex-col gap-5"
            >
              {/* Stars */}
              <div className="flex items-center gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-[#C9A84C] text-[#C9A84C]" />
                ))}
              </div>

              {/* Quote */}
              <p
                className="flex-1 leading-relaxed text-sm md:text-base"
                style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', color: '#2C1810' }}
              >
                &ldquo;{t.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border/60">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-border"
                />
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs font-medium" style={{ color: '#5C4A42' }}>{t.role} · {t.city}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Trust grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl overflow-hidden border border-border/60 shadow-warm"
          style={{ background: 'var(--parchment, #EDE4D8)' }}
        >
          <div className="px-5 sm:px-8 pt-10 pb-4">
            <h3
              className="text-xl md:text-2xl mb-1"
              style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, letterSpacing: '-0.02em' }}
            >
              Trust is not a feature. It is our foundation.
            </h3>
            <p className="text-sm" style={{ color: '#3A1F1A' }}>
              Every commitment we have made — and kept — since 2018.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/30">
            {trustItems.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="bg-[#EDE4D8] p-5 sm:p-6 md:p-8 hover:bg-[#E6D9C8] transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg gradient-gold flex items-center justify-center mb-4">
                    <Icon className="w-4 h-4 text-[#2C1810]" strokeWidth={1.5} />
                  </div>
                  <h4 className="text-sm font-semibold mb-2">{item.title}</h4>
                  <p className="text-xs leading-relaxed" style={{ color: '#3A1F1A' }}>{item.body}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
