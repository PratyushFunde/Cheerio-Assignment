import { cn } from "../../lib/utils"

const variants = {
  default: "bg-blue-50 text-blue-700",
  success: "bg-emerald-50 text-emerald-700",
  destructive: "bg-red-50 text-red-700",
  secondary: "bg-slate-100 text-slate-600",
}

function Badge({ className, variant = "default", ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold",
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}

export { Badge }
