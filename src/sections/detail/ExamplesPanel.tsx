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
  return (
    <div className="space-y-8">
      <p className="font-mono text-xs text-muted-foreground">
        // 黑+荧光绿双色 · Q版蜡笔简笔手绘 · 鸟山明表情
      </p>
      {EXAMPLES.map((ex) => (
        <figure
          key={ex.src}
          className="overflow-hidden rounded-xl border border-foreground/10 bg-foreground/[0.03]"
        >
          <img src={ex.src} alt={ex.alt} loading="lazy" className="w-full" />
          <figcaption className="border-t border-foreground/5 px-4 py-3 font-mono text-[11px] text-muted-foreground">
            {ex.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
