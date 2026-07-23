import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

const EXAMPLES = [
  {
    src: 'skills/cheese-ink/web/example-1.jpg',
    alt: 'cheese-ink 生成示例 1',
    caption: '示例 01 — 单格漫画（3:4）',
  },
  {
    src: 'skills/cheese-ink/web/example-2.jpg',
    alt: 'cheese-ink 生成示例 2',
    caption: '示例 02 — 宽幅场景（21:9）',
  },
  {
    src: 'skills/cheese-ink/web/example-3.jpg',
    alt: 'cheese-ink 生成示例 3',
    caption: '示例 03 — 「2.8T参数？吓到了！」（21:9，2026-07-21 新作）',
  },
]

export default function ExamplesPanel() {
  const [selected, setSelected] = useState<number | null>(null)

  // Esc 关闭 + 打开时锁定页面滚动
  useEffect(() => {
    if (selected === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null)
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [selected])

  return (
    <div className="space-y-8">
      <p className="font-mono text-xs text-muted-foreground">
        // 黑+荧光绿双色 · Q版蜡笔简笔手绘 · 鸟山明表情 · 点击图片可放大
      </p>
      {EXAMPLES.map((ex, i) => (
        <figure
          key={ex.src}
          className="overflow-hidden rounded-xl border border-foreground/10 bg-foreground/[0.03]"
        >
          {/* 限高居中：宽幅自然满宽，竖图居中不超限高，避免不同比例图片撑出混乱高度 */}
          <div className="flex justify-center bg-foreground/[0.02] p-3 sm:p-4">
            <img
              src={ex.src}
              alt={ex.alt}
              loading="lazy"
              onClick={() => setSelected(i)}
              className="h-auto max-h-[420px] w-auto max-w-full cursor-zoom-in rounded-lg transition-transform hover:scale-[1.01] sm:max-h-[520px]"
            />
          </div>
          <figcaption className="border-t border-foreground/5 px-4 py-3 font-mono text-[11px] text-muted-foreground">
            {ex.caption}
          </figcaption>
        </figure>
      ))}

      {/* Lightbox */}
      {selected !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={EXAMPLES[selected].alt}
          onClick={() => setSelected(null)}
          className="fixed inset-0 z-50 flex cursor-zoom-out flex-col items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          <button
            onClick={() => setSelected(null)}
            aria-label="关闭"
            className="absolute right-4 top-4 rounded-full border border-white/15 bg-white/5 p-2 text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="size-5" />
          </button>
          <img
            src={EXAMPLES[selected].src}
            alt={EXAMPLES[selected].alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[86vh] max-w-[94vw] cursor-default rounded-lg object-contain shadow-2xl"
          />
          <p className="mt-4 font-mono text-xs text-zinc-400">
            {EXAMPLES[selected].caption}
            <span className="ml-3 text-zinc-600">Esc 或点击背景关闭</span>
          </p>
        </div>
      )}
    </div>
  )
}
