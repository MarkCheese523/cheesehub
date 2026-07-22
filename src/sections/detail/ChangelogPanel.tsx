import { CHANGELOG } from '@/lib/skill-data'

export default function ChangelogPanel() {
  return (
    <div className="max-w-2xl">
      <p className="font-mono text-xs text-muted-foreground">
        // changelog · 版本更新记录
      </p>
      <ol className="mt-6 space-y-0">
        {CHANGELOG.map((entry, i) => (
          <li key={entry.version} className="relative flex gap-4 pb-8 last:pb-0">
            {/* 时间线 */}
            {i < CHANGELOG.length - 1 && (
              <span
                aria-hidden
                className="absolute left-[5px] top-5 h-full w-px bg-foreground/10"
              />
            )}
            <span className="mt-1.5 size-[11px] shrink-0 rounded-full border-2 border-lime-600/60 bg-background dark:border-lime-400/60" />
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-full border border-lime-600/40 bg-lime-400/10 px-2.5 py-0.5 font-mono text-xs font-bold text-lime-600 dark:border-lime-400/40 dark:text-lime-400">
                  {entry.version}
                </span>
                <span className="font-mono text-xs text-muted-foreground/70">{entry.date}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">{entry.summary}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
