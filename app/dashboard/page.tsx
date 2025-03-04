"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { api, Transaction } from "@/app/services/api"
import { SendMoneyForm } from "@/app/components/send-money-form"
import { TransactionForm } from "@/app/components/transaction-form"

export default function Dashboard() {
    const { authState, setUser } = useAuth()
    const router = useRouter()
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [balance, setBalance] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        if (authState.isLoading) return
        if (!authState.user) {
            router.push("/")
            return
        }

        fetchTransactions()
    }, [authState.user, router])

    const fetchTransactions = async () => {
        try {
            const response = await api.getTransactions()
            setTransactions(response.transactions)
            setBalance(response.balance)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to fetch transactions")
        } finally {
            setIsLoading(false)
        }
    }

    const handleLogout = () => {
        api.logout()
        setUser(null)
        router.push("/")
    }

    if (authState.isLoading || isLoading) {
        return <p className="text-center mt-8">Loading...</p>
    }

    if (!authState.user) {
        return null
    }

    return (
        <main className="min-h-screen w-full ">
            <div className="flex flex-col items-center justify-center min-h-screen p-4 relative z-10">
                <Card className="w-full max-w-3xl bg-white/90 backdrop-blur-sm shadow-xl">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold text-gray-800">Welcome, {authState.user.name}!</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="bg-pink-500/90 text-white p-6 rounded-lg backdrop-blur-sm">
                            <h2 className="text-xl font-semibold">Current Balance</h2>
                            <p className="text-3xl font-bold">${balance.toFixed(2)}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <TransactionForm onSuccess={fetchTransactions} />
                            <SendMoneyForm onSuccess={fetchTransactions} />
                        </div>
                        <div className="bg-white/80 p-6 rounded-lg backdrop-blur-sm">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Transaction History</h2>
                            {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
                            <ul className="space-y-2">
                                {transactions.map((transaction) => (
                                    <li key={transaction.id} className="bg-white/90 p-3 rounded-md shadow flex justify-between items-center">
                                        <span className={transaction.type === "deposit" ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                                            {transaction.type === "deposit" ? "+" : "-"} ${transaction.amount}
                                        </span>
                                        <span className="text-gray-600">{new Date(transaction.date).toLocaleDateString()}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Button
                            onClick={handleLogout}
                            variant="destructive"
                            className="w-full bg-red-500 hover:bg-red-600 text-white"
                        >
                            Logout
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}





