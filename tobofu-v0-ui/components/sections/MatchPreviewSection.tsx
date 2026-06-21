'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Briefcase, Heart, X, Star, Sparkles } from 'lucide-react'

const profiles = [
  {
    name: 'Ananya R.',
    age: 27,
    city: 'Mumbai',
    profession: 'Architect',
    education: 'IIT Bombay',
    compatibility: 96,
    traits: ['Family-oriented', 'Creative', 'Adventurous'],
    bio: 'Designing spaces that feel like home. Looking for someone who understands that comfort and beauty are not opposites.',
    img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=480&h=620&fit=crop&crop=face',
  },
  {
    name: 'Meera K.',
    age: 29,
    city: 'Bengaluru',
    profession: 'Paediatric Doctor',
    education: 'AIIMS Delhi',
    compatibility: 93,
    traits: ['Warm', 'Ambitious', 'Traditional values'],
    bio: 'Spending my days healing children. Evenings are for my grandmother\'s recipes and Carnatic music.',
    img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=480&h=620&fit=crop&crop=face',
  },
  {
    name: 'Sunita P.',
    age: 26,
    city: 'Chennai',
    profession: 'Classical Dancer',
    education: 'Kalakshetra',
    compatibility: 91,
    traits: ['Disciplined', 'Cultural', 'Spiritual'],
    bio: 'Bharatanatyam is my prayer. Looking for a partner who respects art as a way of life, not a hobby.',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=480&h=620&fit=crop&crop=face',
  },
]

export function MatchPreviewSection() {
  const [liked, setLiked] = useState<number | null>(null)

  return (
    <section className="py-24 md:py-36 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — Copy */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="badge-warm mb-6">Discover Matches</p>
            <h2
              className="text-balance text-section-responsive mb-6"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 400,
                letterSpacing: '-0.025em',
              }}
            >
              Every match is a
              <br />
              <em style={{ fontStyle: 'italic', color: '#C1533A' }}>
                curated introduction,
              </em>
              <br />
              not a suggestion
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: '#3A1F1A' }}>
              Unlike generic platforms that show you hundreds of results,
              Tobofu presents a thoughtful shortlist. Each profile has been
              scored against your values, not just your filters.
            </p>

            {/* AI insight card */}
            <div className="rounded-2xl border border-border/60 p-5 bg-card shadow-warm mb-8">
              <div className="flex items-center gap-2.5 mb-3">
                <Sparkles className="w-4 h-4 text-[#C9A84C]" />
                <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C]">
                  AI Compatibility Insight
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#3A1F1A' }}>
                Ananya and you share a 96% compatibility score — driven by aligned values
                around family structure, creative careers, and openness to relocation.
                Your communication styles also closely match.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {['96% Compatibility', 'Shared Values', 'Similar Ambitions', 'Communication Match'].map((tag) => (
                <span key={tag} className="badge-maroon">{tag}</span>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Profile card stack */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center overflow-visible min-h-[560px]"
          >
            {/* Back cards (decorative) */}
            {[2, 1].map((offset) => (
              <div
                key={offset}
                className="absolute w-full max-w-[288px] rounded-3xl overflow-hidden shadow-warm bg-card border border-border"
                style={{
                  transform: `translateX(${offset * 10}px) translateY(${offset * 8}px) rotate(${offset * 2}deg)`,
                  zIndex: 3 - offset,
                  opacity: 1 - offset * 0.18,
                }}
              >
                <div className="h-80 bg-muted" />
                <div className="h-28" />
              </div>
            ))}

            {/* Front profile card */}
            <motion.div
              key={liked}
              initial={{ scale: 0.96, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-[288px] rounded-3xl overflow-hidden shadow-warm-xl border border-border bg-card"
            >
              {/* Photo */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={profiles[liked !== null ? (liked + 1) % profiles.length : 0].img}
                  alt={profiles[0].name}
                  className="w-full h-full object-cover"
                />
                {/* Compatibility badge */}
                <div className="absolute top-4 right-4 glass rounded-full px-3 py-1.5 flex items-center gap-1.5">
                  <Star className="w-3 h-3 fill-[#C9A84C] text-[#C9A84C]" />
                  <span className="text-xs font-semibold">
                    {profiles[liked !== null ? (liked + 1) % profiles.length : 0].compatibility}% Match
                  </span>
                </div>
                {/* Gradient */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(44,24,16,0.6) 100%)' }}
                />
                <div className="absolute bottom-3 left-4 right-4">
                  <p
                    className="text-white font-medium text-lg"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {profiles[liked !== null ? (liked + 1) % profiles.length : 0].name},{' '}
                    {profiles[liked !== null ? (liked + 1) % profiles.length : 0].age}
                  </p>
                </div>
              </div>

              {/* Profile info */}
              <div className="p-4">
                <div className="flex items-center gap-3 text-xs mb-3" style={{ color: '#5C4A42' }}>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {profiles[liked !== null ? (liked + 1) % profiles.length : 0].city}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3 h-3" />
                    {profiles[liked !== null ? (liked + 1) % profiles.length : 0].profession}
                  </span>
                </div>

                <p className="text-xs leading-relaxed mb-4 line-clamp-2" style={{ color: '#3A1F1A' }}>
                  {profiles[liked !== null ? (liked + 1) % profiles.length : 0].bio}
                </p>

                {/* Trait chips */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {profiles[liked !== null ? (liked + 1) % profiles.length : 0].traits.map((trait) => (
                    <span
                      key={trait}
                      className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-muted"
                    style={{ color: '#3A1F1A' }}
                    >
                      {trait}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.93 }}
                    onClick={() => setLiked((liked ?? 0) + 1)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full border border-border text-sm font-medium hover:border-foreground/30 transition-colors"
                    style={{ color: '#3A1F1A' }}
                  >
                    <X className="w-4 h-4" />
                    Pass
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.93 }}
                    onClick={() => setLiked((liked ?? 0) + 1)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full gradient-maroon text-[#FAF7F2] text-sm font-semibold shadow-warm"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                    Connect
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
