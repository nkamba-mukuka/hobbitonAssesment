
import * as React from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    value?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, value, ...props }, ref) => {
    return (
        <input
            ref={ref}
            // defaultValue={defaultValue}
            value={value}
            className={`input ${className}`}
            {...props}
        />
    )
});

Input.displayName = "Input";
