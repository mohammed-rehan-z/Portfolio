import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080d1a] disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:shadow-[0_4px_16px_rgba(37,99,235,0.4)] hover:-translate-y-0.5",
        cyan:
          "bg-blue-600 text-white font-semibold hover:bg-blue-500 hover:shadow-[0_4px_16px_rgba(37,99,235,0.4)]",
        secondary:
          "bg-[#0d1424] text-blue-300 border border-white/[0.08] hover:border-blue-500/50 hover:bg-[#131d33] hover:text-white backdrop-blur-md",
        outline:
          "border border-white/[0.12] bg-transparent text-slate-200 hover:bg-white/[0.06] hover:border-white/[0.25]",
        ghost:
          "text-slate-400 hover:text-white hover:bg-white/[0.06]",
        subtle:
          "bg-white/[0.05] text-slate-200 border border-white/[0.08] hover:bg-white/[0.1] hover:border-white/[0.15]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-xl px-6 text-base",
        icon: "h-9 w-9 rounded-lg p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
