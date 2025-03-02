"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export const Label = React.forwardRef<
    HTMLLabelElement,
    React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, children, ...props }, ref) => {
    return (
        <label
            className={cn("text-sm font-medium text-gray-700", className)}
            ref={ref}
            {...props}
        >
            {children}
        </label>
    )
})
Label.displayName = "Label"
