import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090d16] disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[#00f0ff] to-[#6366f1] text-[#090d16] font-semibold hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:-translate-y-0.5",
        cyan:
          "bg-[#00f0ff] text-[#090d16] font-semibold hover:bg-white hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]",
        secondary:
          "bg-[rgba(22,27,34,0.85)] text-[#00f0ff] border border-[rgba(0,240,255,0.3)] hover:border-[#00f0ff] hover:bg-[rgba(0,240,255,0.08)] hover:text-white backdrop-blur-md",
        outline:
          "border border-[rgba(255,255,255,0.12)] bg-transparent text-[#f0f6fc] hover:bg-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.25)]",
        ghost:
          "text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[rgba(255,255,255,0.06)]",
        subtle:
          "bg-[rgba(255,255,255,0.05)] text-[#f0f6fc] border border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.15)]",
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
