import { CHARACTERS } from '@/lib/skill-data'

export default function CharactersPanel() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {CHARACTERS.map((char) => (
        <div
          key={char.id}
          className="group overflow-hidden rounded-xl border border-foreground/10 bg-foreground/[0.03] transition-all duration-300 hover:border-lime-400/40 hover:shadow-[0_0_50px_-12px_rgba(163,230,53,0.3)]"
        >
          <div className="aspect-[3/4] overflow-hidden bg-muted">
            <img
              src={char.image}
              alt={`cheese-ink 角色 ${char.name}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
          <div className="p-4">
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-sm font-bold text-foreground group-hover:text-lime-600 dark:group-hover:text-lime-400">
                {char.name}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground/70">@@ {char.name}</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{char.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
