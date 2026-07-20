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
]

export default function ExamplesPanel() {
  return (
    <div className="space-y-8">
      <p className="font-mono text-xs text-zinc-500">
        // 黑+荧光绿双色 · Q版蜡笔简笔手绘 · 鸟山明表情
      </p>
      {EXAMPLES.map((ex) => (
        <figure
          key={ex.src}
          className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]"
        >
          <img src={ex.src} alt={ex.alt} loading="lazy" className="w-full" />
          <figcaption className="border-t border-white/5 px-4 py-3 font-mono text-[11px] text-zinc-500">
            {ex.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
