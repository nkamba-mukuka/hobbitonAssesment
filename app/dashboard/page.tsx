"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"

export default function Dashboard() {
    const { authState, setUser } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (authState.isLoading) return
        if (!authState.user) {
            router.push("/")
        }
    }, [authState.user, router])

    const handleLogout = () => {
        setUser(null)
        router.push("/")
    }

    if (authState.isLoading) {
        return <p>Loading...</p>
    }

    if (!authState.user) {
        return null
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Welcome, {authState.user.name}!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p>Email: {authState.user.email}</p>
                    <Button onClick={handleLogout} variant="destructive" className="w-full">
                        Logout
                    </Button>
                </CardContent>
            </Card>
        </main>
    )
}




