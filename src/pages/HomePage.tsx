import Navbar from '@/sections/Navbar'
import Hero from '@/sections/Hero'
import Marquee from '@/sections/Marquee'
import SkillsSection from '@/sections/SkillsSection'
import AboutSection from '@/sections/AboutSection'
import InstallSection from '@/sections/InstallSection'
import Footer from '@/sections/Footer'

interface HomePageProps {
  onNavigate: (anchor?: string) => void
  onOpenSkill: (id: string) => void
}

export default function HomePage({ onNavigate, onOpenSkill }: HomePageProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar onNavigate={onNavigate} />
      <main>
        <Hero />
        <Marquee />
        <SkillsSection onOpenSkill={onOpenSkill} />
        <AboutSection />
        <InstallSection />
      </main>
      <Footer />
    </div>
  )
}
