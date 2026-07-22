import { Moon, Search, Sun } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'

interface NavbarProps {
  /** 点击 logo 或导航链接：回到首页，可选滚动到锚点 */
  onNavigate: (anchor?: string) => void
}

export default function Navbar({ onNavigate }: NavbarProps) {
  const { theme, toggle } = useTheme()

  return (
    <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <button
          onClick={() => onNavigate()}
          className="flex shrink-0 items-center gap-2 font-mono text-sm font-bold tracking-tight text-foreground transition-colors hover:text-lime-600 dark:hover:text-lime-400"
        >
          <span className="text-xl leading-none">🧀</span>
          CheeseHub
        </button>

        <nav className="hidden items-center gap-6 font-mono text-xs text-muted-foreground sm:flex">
          <button
            onClick={() => onNavigate('skills')}
            className="transition-colors hover:text-lime-600 dark:hover:text-lime-400"
          >
            Skills
          </button>
          <button
            onClick={() => onNavigate('about')}
            className="transition-colors hover:text-lime-600 dark:hover:text-lime-400"
          >
            About
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-md border border-foreground/10 bg-foreground/[0.03] px-3 py-1.5 text-muted-foreground transition-colors hover:border-foreground/20">
            <Search className="size-3.5" />
            <span className="hidden font-mono text-xs md:inline">搜索 skills…</span>
            <kbd className="rounded border border-foreground/10 bg-foreground/5 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
              ⌘K
            </kbd>
          </div>
          <button
            onClick={toggle}
            aria-label={theme === 'dark' ? '切换到浅色主题' : '切换到深色主题'}
            title={theme === 'dark' ? '切换到浅色主题' : '切换到深色主题'}
            className="flex items-center justify-center rounded-md border border-foreground/10 bg-foreground/[0.03] p-1.5 text-muted-foreground transition-colors hover:border-lime-400/40 hover:text-lime-600 dark:hover:text-lime-400"
          >
            {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
        </div>
      </div>
    </header>
  )
}
