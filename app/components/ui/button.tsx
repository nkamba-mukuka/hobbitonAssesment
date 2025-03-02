"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export const Button = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "destructive" }
>(({ className, children, type = "button", variant = "default", ...props }, ref) => {
    return (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
                variant === "destructive"
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-primary text-primary-foreground hover:bg-primary/90",
                className,
            )}
            ref={ref}
            {...props}
            type={type}
        >
            {children}
        </button>
    )
})
Button.displayName = "Button"



