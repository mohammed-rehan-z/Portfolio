import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#00f0ff] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border border-[rgba(0,240,255,0.3)] bg-[rgba(0,240,255,0.08)] text-[#00f0ff]",
        secondary:
          "border border-[rgba(99,102,241,0.3)] bg-[rgba(99,102,241,0.08)] text-[#c0c1ff]",
        outline:
          "border border-[rgba(255,255,255,0.1)] bg-[rgba(22,27,34,0.6)] text-[#8b949e]",
        success:
          "border border-[rgba(34,197,94,0.3)] bg-[rgba(34,197,94,0.1)] text-[#4ade80]",
        amber:
          "border border-[rgba(245,158,11,0.3)] bg-[rgba(245,158,11,0.1)] text-[#fbbf24]",
        telemetry:
          "border border-[rgba(255,255,255,0.08)] bg-[rgba(15,19,28,0.85)] font-mono text-[11px] text-[#f0f6fc] tracking-wider uppercase",
        "subtle-cyan":
          "border border-[rgba(0,240,255,0.25)] bg-[rgba(0,240,255,0.1)] text-[#00f0ff] font-mono uppercase",
        "subtle-indigo":
          "border border-[rgba(99,102,241,0.25)] bg-[rgba(99,102,241,0.1)] text-[#c0c1ff] font-mono uppercase",
        "subtle-purple":
          "border border-[rgba(139,92,246,0.25)] bg-[rgba(139,92,246,0.1)] text-[#e1d2ff] font-mono uppercase",
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
  dotColor = "bg-[#00f0ff]",
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
