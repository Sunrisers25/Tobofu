'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Heart, Quote } from 'lucide-react'

const stories = [
  {
    id: 0,
    names: 'Kavya & Sanjay',
    wedding: 'June 2024 · Chennai',
    duration: 'Matched in November — engaged in March',
    quote:
      '"We had both been on other platforms for years. Samanvaya Bandhan felt different from the first week — the matches were thoughtful, not just filters. Sanjay sent me a voice note instead of a text. That was the moment."',
    detail: 'Kavya is an ISRO scientist. Sanjay runs a sustainable architecture firm. Their compatibility score was 97 — their families agreed.',
    heroImg:
      'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=1200&h=800&fit=crop&crop=center',
    portraitImg:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=380&fit=crop&crop=face',
    tag: 'Featured Story',
  },
  {
    id: 1,
    names: 'Pooja & Nikhil',
    wedding: 'March 2024 · Pune',
    duration: 'Matched in July — married in eight months',
    quote:
      '"The AI preferences weren\'t just checkboxes. They helped us articulate what we actually valued — and found someone who lived those values without us having to explain."',
    detail: 'Pooja is a paediatric nurse. Nikhil is a documentary filmmaker. They bonded over their shared belief that careers should serve people, not the other way around.',
    heroImg:
      'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=1200&h=800&fit=crop&crop=center',
    portraitImg:
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=380&fit=crop&crop=face',
    tag: 'Cross-City Match',
  },
  {
    id: 2,
    names: 'Deepika & Aditya',
    wedding: 'December 2023 · Hyderabad',
    duration: 'Matched in May — family meeting in September',
    quote:
      '"I was sceptical about AI matchmaking. Then I read Aditya\'s detailed profile — his thoughts on family, ambition, and rest. It read like someone had described my ideal partner without asking me."',
    detail: 'Deepika is a corporate lawyer. Aditya lectures in philosophy at University of Hyderabad. Their families met twice before either of them said yes.',
    heroImg:
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=800&fit=crop&crop=center',
    portraitImg:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=380&fit=crop&crop=face',
    tag: 'AI\'s Best Match',
  },
]

export function SuccessStoriesSection() {
  const [active, setActive] = useState(0)
  const story = stories[active]

  return (
    <section id="success-stories" className="py-24 md:py-36 overflow-hidden" style={{ background: 'var(--cream, #F2EBE0)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
        >
          <div>
            <p className="badge-warm mb-5">Real Love Stories</p>
            <h2
              className="text-balance text-section-responsive"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 400,
                letterSpacing: '-0.025em',
              }}
            >
              50,000 journeys,{' '}
              <em style={{ fontStyle: 'italic', color: '#C1533A' }}>one destination</em>
            </h2>
          </div>
          <p className="max-w-sm w-full text-sm leading-relaxed" style={{ color: '#3A1F1A' }}>
            Every couple found here used the same platform. Their stories are different. Their happiness is the same.
          </p>
        </motion.div>

        {/* Story selector tabs */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          {stories.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                active === i
                ? 'gradient-maroon text-[#FAF7F2] shadow-warm'
                  : 'bg-background border border-border hover:border-[#C9A84C]'
              }`}
              style={active !== i ? { color: '#3A1F1A' } : undefined}
            >
              {s.names}
            </button>
          ))}
        </div>

        {/* Main story card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="grid lg:grid-cols-5 gap-0 rounded-3xl overflow-hidden shadow-warm-xl bg-card border border-border/50"
          >
            {/* LEFT — hero photography (3 cols) */}
            <div className="lg:col-span-3 relative h-72 lg:h-auto min-h-[400px] overflow-hidden">
              <img
                src={story.heroImg}
                alt={story.names}
                className="w-full h-full object-cover img-reveal"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(44,24,16,0.5) 0%, transparent 60%)' }}
              />
              {/* Tag chip */}
              <div className="absolute top-5 left-5">
                <span className="badge-warm bg-white/80 backdrop-blur-sm">{story.tag}</span>
              </div>
              {/* Wedding detail */}
              <div className="absolute bottom-5 left-5 right-5 hidden lg:block">
                <div className="glass rounded-xl px-4 py-3">
                  <p className="text-xs tracking-widest uppercase mb-0.5" style={{ color: '#5C4A42' }}>
                    {story.wedding}
                  </p>
                  <p
                    className="text-base font-medium"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {story.names}
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT — story content (2 cols) */}
            <div className="lg:col-span-2 flex flex-col justify-between p-5 sm:p-8 lg:p-10">
              <div>
                {/* Portrait */}
                <div className="flex items-center gap-4 mb-8">
                  <img
                    src={story.portraitImg}
                    alt={story.names}
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#C9A84C]/40"
                  />
                  <div>
                    <p
                      className="font-medium text-base"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {story.names}
                    </p>
                    <p className="text-xs font-medium" style={{ color: '#5C4A42' }}>{story.duration}</p>
                  </div>
                </div>

                {/* Quote */}
                <div className="relative mb-6">
                  <Quote
                    className="absolute -top-2 -left-1 w-8 h-8 opacity-10"
                    style={{ color: '#6B1E1E' }}
                  />
                  <p
                    className="leading-relaxed pl-4 text-sm md:text-base"
                    style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', color: '#2C1810' }}
                  >
                    {story.quote}
                  </p>
                </div>

                {/* Detail paragraph */}
                <p className="text-sm leading-relaxed border-t border-border/60 pt-5" style={{ color: '#3A1F1A' }}>
                  {story.detail}
                </p>
              </div>

              {/* Pagination + CTA */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/60">
                <div className="flex items-center gap-2">
                  {stories.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`rounded-full transition-all duration-300 ${
                        active === i
                          ? 'w-6 h-2 bg-[#C1533A]'
                          : 'w-2 h-2 bg-muted hover:bg-[#C9A84C]'
                      }`}
                    />
                  ))}
                </div>
                <motion.button
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-1.5 text-sm font-medium text-[#C1533A] hover:text-[#6B1E1E] transition-colors"
                >
                  Read full story
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Secondary mini-stories row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
        >
          {[
            { names: 'Ananya & Rahul', city: 'Delhi', img: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=300&h=220&fit=crop' },
            { names: 'Meera & Vivek', city: 'Kolkata', img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300&h=220&fit=crop' },
            { names: 'Sunita & Aryan', city: 'Jaipur', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=220&fit=crop' },
            { names: 'Lakshmi & Dev', city: 'Kochi', img: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=300&h=220&fit=crop' },
          ].map((mini) => (
            <motion.div
              key={mini.names}
              whileHover={{ y: -3 }}
              className="relative rounded-2xl overflow-hidden h-36 md:h-44 shadow-warm cursor-pointer group"
            >
              <img src={mini.img} alt={mini.names} className="w-full h-full object-cover img-reveal" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(44,24,16,0.7) 100%)' }} />
              <div className="absolute bottom-3 left-3">
                <p className="text-white text-xs font-semibold">{mini.names}</p>
                <p className="text-white/60 text-[10px]">{mini.city}</p>
              </div>
              <div className="absolute top-3 right-3">
                <Heart className="w-4 h-4 text-[#E8907A] fill-[#E8907A] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
