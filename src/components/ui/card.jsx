import { cn } from "../../lib/utils"

function Card({ className, ...props }) {
  return (
    <div
      className={cn("rounded-xl border border-slate-200 bg-white shadow-sm", className)}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }) {
  return <div className={cn("flex flex-col gap-1.5 p-5", className)} {...props} />
}

function CardTitle({ className, ...props }) {
  return <h3 className={cn("font-semibold text-slate-950", className)} {...props} />
}

function CardContent({ className, ...props }) {
  return <div className={cn("p-5 pt-0", className)} {...props} />
}

export { Card, CardContent, CardHeader, CardTitle }
