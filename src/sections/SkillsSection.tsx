import { useState } from 'react'
import { ArrowUpRight, Package } from 'lucide-react'
import { SKILL } from '@/lib/skill-data'

type TabKey = 'featured' | 'all'

interface SkillsSectionProps {
  onOpenSkill: (id: string) => void
}

function GhostCard({ index }: { index: number }) {
  return (
    <div className="flex min-h-[190px] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-foreground/15 p-5 text-center">
      <Package className="size-5 text-muted-foreground/50" />
      <span className="font-mono text-sm text-muted-foreground/70">虚位以待</span>
      <span className="font-mono text-[11px] text-muted-foreground/50">// future skill slot #{index}</span>
    </div>
  )
}

export default function SkillsSection({ onOpenSkill }: SkillsSectionProps) {
  const [tab, setTab] = useState<TabKey>('featured')

  const tabClass = (key: TabKey) =>
    key === tab
      ? 'rounded-full bg-lime-400 px-4 py-1.5 font-mono text-xs font-bold text-zinc-950 transition-colors'
      : 'rounded-full border border-foreground/10 px-4 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-lime-400/40 hover:text-foreground'

  return (
    <section id="skills" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button className={tabClass('featured')} onClick={() => setTab('featured')}>
              Featured
            </button>
            <button className={tabClass('all')} onClick={() => setTab('all')}>
              全部
            </button>
          </div>
          <span className="font-mono text-[11px] text-muted-foreground/70">
            {tab === 'featured' ? 'featured: 1' : 'total: 1'}
          </span>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* cheese-ink 真实卡片 */}
          <button
            onClick={() => onOpenSkill(SKILL.id)}
            className="group relative flex min-h-[190px] flex-col rounded-xl border border-foreground/10 bg-foreground/[0.03] p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-lime-400/40 hover:bg-foreground/[0.04] hover:shadow-[0_0_50px_-12px_rgba(163,230,53,0.35)]"
          >
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-mono text-base font-bold text-foreground transition-colors group-hover:text-lime-600 dark:group-hover:text-lime-400">
                {SKILL.name}
              </span>
              <span className="font-mono text-xs text-muted-foreground">@{SKILL.author}</span>
            </div>

            <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {SKILL.description}
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {SKILL.cardTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-foreground/10 bg-foreground/[0.03] px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-auto flex items-center justify-between pt-5">
              <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
                <span className="text-lime-600/90 dark:text-lime-400/90">{SKILL.version}</span>
                <span>·</span>
                <span>3 characters</span>
                <span>·</span>
                <span>zip {SKILL.zipSize}</span>
              </div>
              <ArrowUpRight className="size-4 text-muted-foreground/70 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lime-600 dark:group-hover:text-lime-400" />
            </div>
          </button>

          {/* 幽灵卡片 */}
          <GhostCard index={2} />
          <GhostCard index={3} />
        </div>
      </div>
    </section>
  )
}
