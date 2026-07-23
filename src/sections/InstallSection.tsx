import { useState } from 'react'
import { Check, Copy, Sparkles } from 'lucide-react'
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
    <section className="border-t border-foreground/5">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2">
        <div>
          <p className="font-mono text-xs text-lime-600 dark:text-lime-400">// install</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            一句话安装
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            CheeseHub 的每个 skill 都支持提示词安装：进入 skill
            详情页复制提示词发给你的 AI，它会读取该 skill
            的安装文档，自动完成下载、解压、配置。
          </p>
          <ul className="mt-6 space-y-2 font-mono text-xs text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="text-lime-600 dark:text-lime-400">01</span> 点进 skill 卡片，进入详情页
            </li>
            <li className="flex items-center gap-2">
              <span className="text-lime-600 dark:text-lime-400">02</span> 复制安装提示词，发给你的 AI
            </li>
            <li className="flex items-center gap-2">
              <span className="text-lime-600 dark:text-lime-400">03</span> AI 自动安装到 skills 目录，重启即用
            </li>
          </ul>
          <p className="mt-6 max-w-md font-mono text-[11px] leading-5 text-muted-foreground/70">
            已安装过旧版？详情页还有「更新提示词」，升级时保留你的自建数据。
          </p>
        </div>

        {/* 提示词卡片（终端窗口，两个主题下均保持纯暗色） */}
        <div className="overflow-hidden rounded-xl border border-lime-400/20 bg-black/60 shadow-[0_0_60px_-20px_rgba(163,230,53,0.25)]">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <Sparkles className="size-3.5 text-lime-400" />
            <span className="font-mono text-[11px] text-zinc-500">
              安装提示词 · 以 {SKILL.name} 为例
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
                  <Copy className="size-4" /> 复制提示词试试
                </>
              )}
            </button>
            <p className="mt-4 font-mono text-[11px] leading-5 text-zinc-600">
              每个 skill 的详情页都有独立的安装 / 更新提示词和 .zip 下载
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
