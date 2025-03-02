import * as React from "react"
import { cn } from "@/lib/utils"

// Card component
interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => (
    <div className={cn("border rounded-lg shadow-lg overflow-hidden", className)}>{children}</div>
)

// CardHeader component
interface CardHeaderProps {
    children: React.ReactNode;
    className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => (
    <div className={cn("border-b p-4 bg-gray-50", className)}>{children}</div>
)

// CardTitle component
interface CardTitleProps {
    children: React.ReactNode;
    className?: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({ children, className }) => (
    <h2 className={cn("text-xl font-semibold", className)}>{children}</h2>
)

// CardDescription component
interface CardDescriptionProps {
    children: React.ReactNode;
    className?: string;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({ children, className }) => (
    <p className={cn("text-sm text-gray-500", className)}>{children}</p>
)

// CardContent component
interface CardContentProps {
    children: React.ReactNode;
    className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className }) => (
    <div className={cn("p-4", className)}>{children}</div>
)
