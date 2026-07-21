import { ArrowUpRight } from 'lucide-react'

const COLUMNS: { title: string; links: string[] }[] = [
  { title: 'Browse', links: ['Skills', 'Featured', '全部'] },
  { title: 'About', links: ['关于 CheeseHub', 'CheeseHeart', '理念'] },
  { title: 'Ecosystem', links: ['Claude Code', 'ZenMux', 'Gemini', 'Skill 规范'] },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-sm font-bold text-zinc-100">
              <span className="text-lg leading-none">🧀</span>
              CheeseHub
            </div>
            <p className="mt-4 font-mono text-[11px] leading-relaxed text-zinc-600">
              Cheese for your Agents.
              <br />
              工具应自建，而非采购。
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <span className="group inline-flex cursor-pointer items-center gap-1 font-mono text-xs text-zinc-500 transition-colors hover:text-lime-400">
                      {link}
                      {col.title === 'Ecosystem' && (
                        <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex items-center justify-between border-t border-white/5 py-6 font-mono text-[11px] text-zinc-600">
          <span>© 2026 CheeseHeart</span>
          <span>made with 🧀 by cheeseheart</span>
        </div>
      </div>

      {/* 巨大水印 */}
      <div
        aria-hidden
        className="pointer-events-none select-none whitespace-nowrap text-center font-black leading-[0.75] tracking-tighter text-white/[0.04]"
        style={{ fontSize: 'clamp(80px, 16vw, 220px)' }}
      >
        CHEESEHUB
      </div>
    </footer>
  )
}
