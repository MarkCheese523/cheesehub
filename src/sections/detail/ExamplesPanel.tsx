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
          {/* 限高居中：宽幅自然满宽，竖图居中不超限高，避免不同比例图片撑出混乱高度 */}
          <div className="flex justify-center bg-foreground/[0.02] p-3 sm:p-4">
            <img
              src={ex.src}
              alt={ex.alt}
              loading="lazy"
              className="h-auto max-h-[420px] w-auto max-w-full rounded-lg sm:max-h-[520px]"
            />
          </div>
          <figcaption className="border-t border-foreground/5 px-4 py-3 font-mono text-[11px] text-muted-foreground">
            {ex.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
