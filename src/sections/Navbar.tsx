import { Search } from 'lucide-react'

interface NavbarProps {
  /** 点击 logo 或导航链接：回到首页，可选滚动到锚点 */
  onNavigate: (anchor?: string) => void
}

export default function Navbar({ onNavigate }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <button
          onClick={() => onNavigate()}
          className="flex shrink-0 items-center gap-2 font-mono text-sm font-bold tracking-tight text-zinc-100 transition-colors hover:text-lime-400"
        >
          <span className="text-xl leading-none">🧀</span>
          CheeseHub
        </button>

        <nav className="hidden items-center gap-6 font-mono text-xs text-zinc-400 sm:flex">
          <button
            onClick={() => onNavigate('skills')}
            className="transition-colors hover:text-lime-400"
          >
            Skills
          </button>
          <button
            onClick={() => onNavigate('about')}
            className="transition-colors hover:text-lime-400"
          >
            About
          </button>
        </nav>

        <div className="flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-zinc-500 transition-colors hover:border-white/20">
          <Search className="size-3.5" />
          <span className="hidden font-mono text-xs md:inline">搜索 skills…</span>
          <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">
            ⌘K
          </kbd>
        </div>
      </div>
    </header>
  )
}
