export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="font-mono text-xs text-lime-400">// about</p>
        <h2 className="mt-4 text-3xl font-black tracking-tight text-zinc-50 sm:text-4xl">
          关于 CheeseHub
        </h2>
        <div className="mt-6 max-w-2xl space-y-4 text-[15px] leading-relaxed text-zinc-400">
          <p>
            CheeseHub 是 CheeseHeart 的公司级 Agent Skills 仓库。这里收录的每一个
            skill，都是团队在真实工作流里反复打磨出来的自用工具 —— 从笔记插图生成开始，陆续有来。
          </p>
          <p>
            理念很简单：
            <span className="text-zinc-100">
              工具应为策略服务，而非策略适应工具。
            </span>
            与其让通用软件的标准化界面约束自己的思维方式，不如基于通用 Agent
            自建一套独一无二的工具链。
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-2 font-mono text-[11px] text-zinc-500">
          <span className="rounded-full border border-white/10 px-3 py-1">self-hosted</span>
          <span className="rounded-full border border-white/10 px-3 py-1">agent-driven</span>
          <span className="rounded-full border border-white/10 px-3 py-1">built, not bought</span>
        </div>
      </div>
    </section>
  )
}
