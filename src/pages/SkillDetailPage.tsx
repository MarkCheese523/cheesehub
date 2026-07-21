import { useState } from 'react'
import { ArrowLeft, Check, Copy, Download, KeyRound } from 'lucide-react'
import Navbar from '@/sections/Navbar'
import Footer from '@/sections/Footer'
import SkillMdPanel from '@/sections/detail/SkillMdPanel'
import CharactersPanel from '@/sections/detail/CharactersPanel'
import ExamplesPanel from '@/sections/detail/ExamplesPanel'
import FilesPanel from '@/sections/detail/FilesPanel'
import { SKILL } from '@/lib/skill-data'

type TabKey = 'skillmd' | 'characters' | 'examples' | 'files'

const TABS: { key: TabKey; label: string }[] = [
  { key: 'skillmd', label: 'SKILL.md' },
  { key: 'characters', label: '角色' },
  { key: 'examples', label: '示例' },
  { key: 'files', label: '文件' },
]

interface SkillDetailPageProps {
  onBack: () => void
  onNavigate: (anchor?: string) => void
}

export default function SkillDetailPage({ onBack, onNavigate }: SkillDetailPageProps) {
  const [tab, setTab] = useState<TabKey>('skillmd')
  const [copied, setCopied] = useState(false)

  const copyInstallPrompt = async () => {
    try {
      await navigator.clipboard.writeText(SKILL.installPrompt)
    } catch {
      // clipboard API 不可用时降级
      const textarea = document.createElement('textarea')
      textarea.value = SKILL.installPrompt
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar onNavigate={onNavigate} />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 font-mono text-xs text-zinc-500 transition-colors hover:text-lime-400"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          cd ../skills
        </button>

        {/* 头部 */}
        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-4xl font-black tracking-tighter text-zinc-50 sm:text-5xl">
                {SKILL.name}
              </h1>
              <span className="rounded-full border border-lime-400/40 bg-lime-400/10 px-2.5 py-0.5 font-mono text-xs font-bold text-lime-400">
                {SKILL.version}
              </span>
            </div>
            <p className="mt-3 font-mono text-xs text-zinc-500">
              @{SKILL.author} <span className="text-lime-400">·</span> updated {SKILL.updated}
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-zinc-400">
              {SKILL.description}。黑+荧光绿双色，鸟山明式表情，ZenMux Gemini 生图。
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {SKILL.detailTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex shrink-0 flex-wrap gap-2">
            <a
              href={SKILL.zipUrl}
              download
              className="inline-flex items-center gap-2 rounded-md bg-lime-400 px-4 py-2 font-mono text-xs font-bold text-zinc-950 transition-colors hover:bg-lime-300"
            >
              <Download className="size-3.5" />
              下载 .zip
            </a>
            <button
              onClick={copyInstallPrompt}
              className="inline-flex items-center gap-2 rounded-md border border-lime-400/40 bg-lime-400/10 px-4 py-2 font-mono text-xs font-bold text-lime-300 transition-colors hover:bg-lime-400/20"
            >
              {copied ? (
                <>
                  <Check className="size-3.5" />
                  已复制!
                </>
              ) : (
                <>
                  <Copy className="size-3.5" />
                  复制安装提示词
                </>
              )}
            </button>
          </div>
        </div>

        {/* Agent 安装提示词 */}
        <div className="mt-8 rounded-xl border border-lime-400/20 bg-lime-400/[0.04] p-4">
          <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
            // 将提示词发送给你的 AI 安装该 skill
          </p>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
            <p className="flex-1 rounded-lg border border-white/10 bg-black/40 px-4 py-3 font-mono text-[13px] leading-6 text-zinc-200">
              {SKILL.installPrompt}
            </p>
            <button
              onClick={copyInstallPrompt}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-lime-400 px-4 py-3 font-mono text-xs font-bold text-zinc-950 transition-colors hover:bg-lime-300"
            >
              {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              {copied ? '已复制' : '复制'}
            </button>
          </div>
          <p className="mt-3 font-mono text-[11px] leading-5 text-zinc-600">
            AI 会读取安装文档，自动完成下载、解压到 skills 目录、API Key 配置，重启会话即可用
          </p>
        </div>

        {/* 触发词 */}
        <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-600">
            // 触发词 trigger words
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {SKILL.triggers.map((trigger) => (
              <code
                key={trigger}
                className="rounded border border-lime-400/20 bg-lime-400/[0.06] px-2 py-1 font-mono text-xs text-lime-300"
              >
                "{trigger}"
              </code>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-10 flex flex-wrap gap-1 border-b border-white/10">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={
                tab === t.key
                  ? '-mb-px border-b-2 border-lime-400 px-4 py-2.5 font-mono text-xs font-bold text-lime-400'
                  : '-mb-px border-b-2 border-transparent px-4 py-2.5 font-mono text-xs text-zinc-500 transition-colors hover:text-zinc-200'
              }
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="py-8">
          {tab === 'skillmd' && <SkillMdPanel />}
          {tab === 'characters' && <CharactersPanel />}
          {tab === 'examples' && <ExamplesPanel />}
          {tab === 'files' && <FilesPanel />}
        </div>

        {/* 配置说明 */}
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-zinc-300">
            <KeyRound className="size-3.5 text-lime-400" />
            配置说明
          </div>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            API Key 存放在
            <code className="mx-1 rounded bg-white/[0.07] px-1.5 py-0.5 font-mono text-[0.85em] text-lime-300">
              ~/.cheese-ink/config.json
            </code>
            ，不会被提交到任何仓库：
          </p>
          <pre className="mt-4 overflow-x-auto rounded-lg border border-white/10 bg-black/60 p-4 font-mono text-[13px] text-zinc-300">
            {`{ "api_key": "sk-...", "model": "google/gemini-3-pro-image" }`}
          </pre>
        </div>
      </main>

      <Footer />
    </div>
  )
}
