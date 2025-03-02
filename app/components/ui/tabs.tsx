
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TabsProps {
    defaultValue?: string
    className?: string
    children: React.ReactNode
}

interface TabsTriggerProps {
    value: string
    children: React.ReactNode
}

interface TabsContentProps {
    value: string
    children: React.ReactNode
}

const TabsContext = React.createContext<{ activeTab: string; setActiveTab: (value: string) => void } | undefined>(
    undefined,
)

export const Tabs: React.FC<TabsProps> = ({ defaultValue, className, children }) => {
    const [activeTab, setActiveTab] = React.useState(defaultValue)

    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            <div className={cn("tabs", className)}>{children}</div>
        </TabsContext.Provider>
    )
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, children }) => {
    const context = React.useContext(TabsContext)
    if (!context) throw new Error("TabsTrigger must be used within Tabs")

    const { activeTab, setActiveTab } = context

    return (
        <button
            className={cn(
                "tab-trigger px-4 py-2 font-semibold transition-colors duration-200",
                activeTab === value ? "bg-primary text-primary-foreground" : "bg-gray-100 text-gray-600 hover:bg-gray-200",
            )}
            onClick={() => setActiveTab(value)}
        >
            {children}
        </button>
    )
}

export const TabsContent: React.FC<TabsContentProps> = ({ value, children }) => {
    const context = React.useContext(TabsContext)
    if (!context) throw new Error("TabsContent must be used within Tabs")

    const { activeTab } = context

    if (activeTab !== value) return null

    return <div className="tab-content">{children}</div>
}

export const TabsList: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <div className={cn("tabs-list flex rounded-lg overflow-hidden", className)}>{children}</div>
)

