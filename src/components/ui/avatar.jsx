import { cn } from "../../lib/utils"

function Avatar({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-900 text-xs font-bold text-white",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { Avatar }
