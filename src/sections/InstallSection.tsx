import { useState } from 'react'
import { Check, Copy, Download, Sparkles } from 'lucide-react'
import { SKILL } from '@/lib/skill-data'

export default function InstallSection() {
  const [copied, setCopied] = useState(false)

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(SKILL.installPrompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // 剪贴板不可用时静默失败，用户可手动选择复制
    }
  }

  return (
    <section className="border-t border-white/5">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2">
        <div>
          <p className="font-mono text-xs text-lime-400">// install</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-zinc-50 sm:text-4xl">
            一句话安装
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-zinc-400">
            不用手动下载解压。把右侧提示词
            <span className="text-zinc-200">复制并发给你的 AI</span>
            ，它会读取安装文档，自动把 skill 装进你的 skills 目录。
          </p>
          <ul className="mt-6 space-y-2 font-mono text-xs text-zinc-500">
            <li className="flex items-center gap-2">
              <span className="text-lime-400">01</span> 复制提示词
            </li>
            <li className="flex items-center gap-2">
              <span className="text-lime-400">02</span> 发给你的 AI（Claude Code / Kimi / Cursor …）
            </li>
            <li className="flex items-center gap-2">
              <span className="text-lime-400">03</span> AI 自动下载、解压、配置，重启即用
            </li>
          </ul>
          <a
            href={SKILL.zipUrl}
            download
            className="mt-8 inline-flex items-center gap-2 font-mono text-xs text-zinc-500 underline decoration-zinc-700 underline-offset-4 transition-colors hover:text-lime-300"
          >
            <Download className="size-3.5" />
            手动党？直接下载 cheese-ink.zip（{SKILL.zipSize}）
          </a>
        </div>

        {/* 提示词卡片 */}
        <div className="overflow-hidden rounded-xl border border-lime-400/20 bg-black/60 shadow-[0_0_60px_-20px_rgba(163,230,53,0.25)]">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <Sparkles className="size-3.5 text-lime-400" />
            <span className="font-mono text-[11px] text-zinc-500">
              将提示词发送给你的 AI 安装该 skill
            </span>
          </div>
          <div className="p-5">
            <p className="rounded-lg border border-white/10 bg-white/[0.03] p-4 font-mono text-[13px] leading-7 text-zinc-200">
              {SKILL.installPrompt}
            </p>
            <button
              onClick={copyPrompt}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-lime-400 px-4 py-2.5 font-mono text-sm font-bold text-zinc-950 transition-colors hover:bg-lime-300"
            >
              {copied ? (
                <>
                  <Check className="size-4" /> 已复制，去发给你的 AI 吧
                </>
              ) : (
                <>
                  <Copy className="size-4" /> 复制安装提示词
                </>
              )}
            </button>
            <p className="mt-4 font-mono text-[11px] leading-5 text-zinc-600">
              AI 会读取 {SKILL.installDocUrl.replace('http://', '')} 中的安装文档完成安装
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
