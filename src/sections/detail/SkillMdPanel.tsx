import { useEffect, useState } from 'react'
import { marked } from 'marked'
import { LoaderCircle } from 'lucide-react'

/** 剥掉 YAML frontmatter（--- ... ---） */
function stripFrontmatter(md: string): string {
  return md.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '')
}

export default function SkillMdPanel() {
  const [html, setHtml] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch('skills/cheese-ink/SKILL.md')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.text()
      })
      .then((text) => {
        const parsed = marked.parse(stripFrontmatter(text), { async: false }) as string
        if (!cancelled) setHtml(parsed)
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : '加载失败')
      })
    return () => {
      cancelled = true
    }
  }, [])

  if (error) {
    return (
      <div className="rounded-xl border border-red-400/20 bg-red-400/5 p-6 font-mono text-sm text-red-300">
        SKILL.md 加载失败：{error}
      </div>
    )
  }

  if (html === null) {
    return (
      <div className="flex items-center gap-2 py-16 font-mono text-xs text-muted-foreground">
        <LoaderCircle className="size-4 animate-spin text-lime-600 dark:text-lime-400" />
        正在加载 SKILL.md …
      </div>
    )
  }

  return (
    <article
      className="markdown-body max-w-none"
      // 内容为本地静态文件，XSS 风险可控
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
