import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { MatchPreviewSection } from '@/components/sections/MatchPreviewSection'
import { SuccessStoriesSection } from '@/components/sections/SuccessStoriesSection'
import { TestimonialSection } from '@/components/sections/TestimonialSection'
import { CTASection } from '@/components/sections/CTASection'

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <MatchPreviewSection />
        <SuccessStoriesSection />
        <TestimonialSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
