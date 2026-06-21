"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  Brain,
  HeartHandshake,
  Lock,
  Zap,
  UserPlus,
  SlidersHorizontal,
  ImagePlus,
  Cpu,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      {/* Navigation */}
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
        <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-transparent bg-background/50 px-4 py-3 backdrop-blur-md transition-all duration-300 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Heart className="h-5 w-5 fill-current" />
            </span>
            <span className="font-heading text-xl font-bold tracking-tight">Tobofu</span>
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            <li><a href="#home" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Home</a></li>
            <li><a href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Features</a></li>
            <li><a href="#how-it-works" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">How It Works</a></li>
          </ul>

          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" className="hidden sm:inline-flex">Login</Button>
            </Link>
            <Link href="/register">
              <Button className="rounded-full shadow-md shadow-primary/20">Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 lg:pt-44">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-secondary/20 blur-3xl"></div>
            <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-accent/15 blur-3xl"></div>
          </div>
          
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2 lg:gap-8">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
              className="text-center lg:text-left"
            >
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4" /> AI-powered matchmaking
              </motion.div>
              
              <motion.h1 variants={fadeUp} className="mt-6 font-heading text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl text-balance">
                Find Meaningful Connections <span className="text-primary">Powered by AI</span>
              </motion.h1>
              
              <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0 text-pretty">
                Tobofu intelligently matches individuals based on compatibility, preferences, education, profession, values, lifestyle, and relationship goals.
              </motion.p>
              
              <motion.div variants={fadeUp} className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
                <Link href="/register">
                  <Button size="lg" className="rounded-full shadow-lg shadow-primary/25 group px-7">
                    Get Started <ArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" size="lg" className="rounded-full px-7 bg-card/60 backdrop-blur">
                    Explore Matches
                  </Button>
                </Link>
              </motion.div>

              <motion.dl variants={fadeUp} className="mt-12 grid grid-cols-3 gap-4 border-t border-border/60 pt-8">
                <div className="text-center lg:text-left">
                  <dt className="sr-only">Verified Profiles</dt>
                  <dd><span className="font-heading text-2xl font-bold sm:text-3xl">10k+</span><p className="mt-1 text-xs text-muted-foreground sm:text-sm">Verified Profiles</p></dd>
                </div>
                <div className="text-center lg:text-left">
                  <dt className="sr-only">Successful Matches</dt>
                  <dd><span className="font-heading text-2xl font-bold sm:text-3xl">5k+</span><p className="mt-1 text-xs text-muted-foreground sm:text-sm">Successful Matches</p></dd>
                </div>
                <div className="text-center lg:text-left">
                  <dt className="sr-only">Compatibility Accuracy</dt>
                  <dd><span className="font-heading text-2xl font-bold sm:text-3xl">98%</span><p className="mt-1 text-xs text-muted-foreground sm:text-sm">Compatibility Accuracy</p></dd>
                </div>
              </motion.dl>
            </motion.div>

            {/* Hero Image / Widget */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mx-auto w-full max-w-md lg:max-w-none"
            >
              <div className="rounded-3xl border border-border/70 bg-card/80 p-5 shadow-2xl shadow-primary/10 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Sparkles className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-semibold">Compatibility Engine</span>
                  </div>
                  <span className="rounded-full bg-secondary/15 px-2.5 py-1 text-xs font-medium text-secondary">Live</span>
                </div>
                
                <div className="mt-5 flex items-center gap-4 rounded-2xl border border-border/60 bg-background/60 p-4">
                  <div className="h-16 w-16 rounded-xl bg-muted overflow-hidden flex items-center justify-center">
                    <span className="text-muted-foreground text-xs">Photo</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">Priya Sharma</p>
                    <p className="text-xs text-muted-foreground">Bengaluru · Architect</p>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <motion.div initial={{ width: 0 }} animate={{ width: "95%" }} transition={{ duration: 1, delay: 0.5 }} className="h-full rounded-full bg-primary" />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-heading text-xl font-bold text-primary">95%</p>
                    <p className="text-[10px] text-muted-foreground">Match</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-background/50 px-3 py-2.5">
                    <GraduationCap className="h-4 w-4 text-secondary" />
                    <div className="leading-tight">
                      <p className="text-[11px] text-muted-foreground">Education</p>
                      <p className="text-xs font-semibold">Match</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-background/50 px-3 py-2.5">
                    <Briefcase className="h-4 w-4 text-secondary" />
                    <div className="leading-tight">
                      <p className="text-[11px] text-muted-foreground">Profession</p>
                      <p className="text-xs font-semibold">Match</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-background/50 px-3 py-2.5">
                    <Heart className="h-4 w-4 text-secondary" />
                    <div className="leading-tight">
                      <p className="text-[11px] text-muted-foreground">Values</p>
                      <p className="text-xs font-semibold">98%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-background/50 px-3 py-2.5">
                    <ShieldCheck className="h-4 w-4 text-secondary" />
                    <div className="leading-tight">
                      <p className="text-[11px] text-muted-foreground">Verified</p>
                      <p className="text-xs font-semibold">Yes</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="relative py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">Why Tobofu</span>
              <h2 className="mt-3 text-balance font-heading text-3xl font-bold tracking-tight sm:text-4xl">Designed for meaningful relationships</h2>
              <p className="mt-4 text-pretty text-muted-foreground">Thoughtful technology and genuine care come together to help you find the right person.</p>
            </div>
            
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "AI Compatibility Engine", desc: "Advanced scoring using multiple profile dimensions for accurate matches.", icon: Brain },
                { title: "Genuine Profiles", desc: "Every member is verified so you connect with real people and real intentions.", icon: HeartHandshake },
                { title: "Privacy & Security", desc: "End-to-end profile protection keeps your personal information safe.", icon: Lock },
                { title: "Smart Matching", desc: "Instant, personalized recommendations that get sharper as you interact.", icon: Zap },
              ].map((feature, i) => (
                <motion.article 
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeUp}
                  className="group rounded-2xl border border-border/70 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                    <feature.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-heading text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.desc}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="relative bg-muted/40 py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">How It Works</span>
              <h2 className="mt-3 text-balance font-heading text-3xl font-bold tracking-tight sm:text-4xl">Your journey to a perfect match</h2>
              <p className="mt-4 text-pretty text-muted-foreground">Four simple steps from sign-up to a meaningful connection.</p>
            </div>
            
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { step: "1", title: "Create Profile", desc: "Sign up and tell us about yourself in minutes.", icon: UserPlus },
                { step: "2", title: "Set Preferences", desc: "Define what matters most in your ideal partner.", icon: SlidersHorizontal },
                { step: "3", title: "Upload Photos", desc: "Add verified photos to build a trusted profile.", icon: ImagePlus },
                { step: "4", title: "Discover Matches", desc: "Let our AI engine find highly compatible profiles.", icon: Cpu },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="relative rounded-2xl border border-border/70 bg-card p-6 shadow-sm"
                >
                  <span className="absolute -top-6 -right-4 text-[120px] font-bold text-muted/20 leading-none select-none">{step.step}</span>
                  <div className="relative z-10">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                      <step.icon className="h-6 w-6" />
                    </span>
                    <h3 className="font-heading text-lg font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>
      
      <footer className="border-t border-border/60 bg-card py-12">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-5 w-5 text-primary fill-primary" />
            <span className="font-heading text-xl font-bold tracking-tight">Tobofu</span>
          </div>
          <p className="text-muted-foreground text-sm">© {new Date().getFullYear()} Tobofu. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
