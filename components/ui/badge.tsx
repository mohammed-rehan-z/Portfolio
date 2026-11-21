import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border border-blue-500/30 bg-blue-500/10 text-blue-300",
        secondary:
          "border border-indigo-500/30 bg-indigo-500/10 text-indigo-300",
        outline:
          "border border-white/[0.1] bg-[#0d1424] text-slate-300",
        success:
          "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
        amber:
          "border border-amber-500/30 bg-amber-500/10 text-amber-300",
        telemetry:
          "border border-white/[0.08] bg-[#0a0f1d] font-mono text-[11px] text-slate-200 tracking-wider uppercase",
        "subtle-cyan":
          "border border-blue-500/25 bg-blue-500/10 text-blue-300 font-mono uppercase",
        "subtle-indigo":
          "border border-indigo-500/25 bg-indigo-500/10 text-indigo-300 font-mono uppercase",
        "subtle-purple":
          "border border-purple-500/25 bg-purple-500/10 text-purple-300 font-mono uppercase",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean
  dotColor?: string
  ping?: boolean
}

function Badge({
  className,
  variant,
  dot,
  dotColor = "bg-blue-500",
  ping = false,
  children,
  ...props
}: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && (
        <span className="relative flex h-2 w-2">
          {ping && (
            <span
              className={cn(
                "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
                dotColor
              )}
            />
          )}
          <span className={cn("relative inline-flex h-2 w-2 rounded-full", dotColor)} />
        </span>
      )}
      {children}
    </div>
  )
}

export { Badge, badgeVariants }
