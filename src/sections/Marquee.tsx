import { MARQUEE_TEXT } from '@/lib/skill-data'

export default function Marquee() {
  return (
    <div className="overflow-hidden border-y border-white/5 bg-white/[0.015] py-3" aria-hidden>
      <div className="animate-marquee flex w-max whitespace-nowrap font-mono text-xs text-zinc-600">
        <span className="pr-6">{MARQUEE_TEXT}</span>
        <span className="pr-6">{MARQUEE_TEXT}</span>
      </div>
    </div>
  )
}
