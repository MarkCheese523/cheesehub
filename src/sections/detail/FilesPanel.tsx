import { FileText, FolderOpen } from 'lucide-react'
import { SKILL_FILES } from '@/lib/skill-data'

export default function FilesPanel() {
  return (
    <div className="overflow-hidden rounded-xl border border-foreground/10">
      <div className="flex items-center gap-2 border-b border-foreground/10 bg-foreground/[0.03] px-4 py-3 font-mono text-xs text-muted-foreground">
        <FolderOpen className="size-3.5 text-lime-600 dark:text-lime-400" />
        cheese-ink/
      </div>
      <ul>
        {SKILL_FILES.map((file) => (
          <li key={file.path}>
            <a
              href={file.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 border-b border-foreground/5 px-4 py-3 transition-colors last:border-0 hover:bg-foreground/[0.03]"
            >
              <FileText className="size-3.5 shrink-0 text-muted-foreground/70 transition-colors group-hover:text-lime-600 dark:group-hover:text-lime-400" />
              <span className="font-mono text-xs text-foreground/80 transition-colors group-hover:text-lime-600 dark:group-hover:text-lime-300">
                {file.label}
              </span>
              <span
                aria-hidden
                className="mx-2 flex-1 border-b border-dotted border-foreground/10"
              />
              <span className="font-mono text-[11px] text-muted-foreground/70">{file.size}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
