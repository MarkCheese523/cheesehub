import { useCallback, useEffect, useState } from 'react'
import HomePage from './pages/HomePage'
import SkillDetailPage from './pages/SkillDetailPage'

type Page = { name: 'home' } | { name: 'skill'; id: string }

export default function App() {
  const [page, setPage] = useState<Page>({ name: 'home' })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [page])

  const goHome = useCallback((anchor?: string) => {
    setPage({ name: 'home' })
    if (anchor) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' })
        })
      })
    }
  }, [])

  const openSkill = useCallback((id: string) => {
    setPage({ name: 'skill', id })
  }, [])

  return page.name === 'home' ? (
    <HomePage onNavigate={goHome} onOpenSkill={openSkill} />
  ) : (
    <SkillDetailPage onBack={() => goHome()} onNavigate={goHome} />
  )
}
