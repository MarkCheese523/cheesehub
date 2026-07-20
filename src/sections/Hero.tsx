export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* 背景荧光 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% -10%, rgba(163,230,53,0.08), transparent 70%)',
        }}
      />
      {/* 背景网格 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-20 sm:px-6 sm:pt-28">
        <p className="mb-6 font-mono text-xs text-lime-400">// mark 的个人 skill 仓库</p>
        <h1 className="max-w-4xl text-5xl font-black leading-[1.05] tracking-tighter text-zinc-50 sm:text-7xl">
          Cheese for your <span className="text-lime-400">Agents.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
          Mark 自建的 Agent Skills 目录 —— 工具应自建，而非采购。
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-zinc-500">
          <span className="text-zinc-300">1</span> skill
          <span className="text-lime-400">·</span>
          <span className="text-zinc-300">3</span> characters
          <span className="text-lime-400">·</span>
          v1.0.0
        </div>
      </div>
    </section>
  )
}
