"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { AuthState, User } from "@/types/auth"

interface AuthContextType {
    authState: AuthState
    setUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        isLoading: false,
    })

    const setUser = (user: User | null) => {
        setAuthState((prev) => ({ ...prev, user }))
    }

    return <AuthContext.Provider value={{ authState, setUser }}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

