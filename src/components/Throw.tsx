import { ThrowResult } from "./useExpressionResolver"

export const Throw = ({
  pretitle,
  title,
  value,
  equation,
  outcome,
}: ThrowResult & { title: string; pretitle?: string }) => (
  <div className="flex gap-2 justify-between items-center">
    <div className="flex flex-col">
      <div className="text-sm font-medium text-slate-400 -mb-0.5">
        {pretitle}
      </div>
      <div className="text-2xl font-black leading-7">{title}</div>
      <div className="flex gap-0 text-sm">
        {equation}
        <span className="text-slate-400">=</span>
        {outcome}
        <span className="text-slate-400">=</span>
        {value}
      </div>
    </div>

    <div className="text-6xl font-black">{value}</div>
  </div>
)
