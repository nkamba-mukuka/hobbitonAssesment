// "use client"

// import { useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { useAuth } from "@/context/auth-context"
// import { Button } from "@/app/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"

// export default function Dashboard() {
//     const { authState, setUser } = useAuth()
//     const router = useRouter()

//     useEffect(() => {
//         if (authState.isLoading) return
//         if (!authState.user) {
//             router.push("/")
//         }
//     }, [authState.user, router])

//     const handleLogout = () => {
//         setUser(null)
//         router.push("/")
//     }

//     if (authState.isLoading) {
//         return <p>Loading...</p>
//     }

//     if (!authState.user) {
//         return null
//     }

//     return (
//         <main className="flex min-h-screen flex-col items-center justify-center p-4">
//             <Card className="w-full max-w-md">
//                 <CardHeader>
//                     <CardTitle>Welcome, {authState.user.name}!</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                     <p>Email: {authState.user.email}</p>
//                     <Button onClick={handleLogout} variant="destructive" className="w-full">
//                         Logout
//                     </Button>
//                 </CardContent>
//             </Card>
//         </main>
//     )
// }
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"

// Mock transaction data
const mockTransactions = [
    { id: 1, type: "deposit", amount: 500, date: "2023-06-01" },
    { id: 2, type: "withdrawal", amount: 100, date: "2023-06-02" },
    { id: 3, type: "deposit", amount: 200, date: "2023-06-03" },
    { id: 4, type: "withdrawal", amount: 50, date: "2023-06-04" },
]

export default function Dashboard() {
    const { authState, setUser } = useAuth()
    const router = useRouter()
    const [balance, setBalance] = useState(0)

    useEffect(() => {
        if (authState.isLoading) return
        if (!authState.user) {
            router.push("/")
        } else {
            // Calculate initial balance
            const initialBalance = mockTransactions.reduce((acc, transaction) => {
                return transaction.type === "deposit" ? acc + transaction.amount : acc - transaction.amount
            }, 0)
            setBalance(initialBalance)
        }
    }, [authState.user, authState.isLoading, router])

    const handleLogout = () => {
        setUser(null)
        router.push("/")
    }

    if (authState.isLoading) {
        return <p className="text-center mt-8">Loading...</p>
    }

    if (!authState.user) {
        return null
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-start p-4 bg-gray-100">
            <Card className="w-full max-w-3xl mt-8">
                <CardHeader>
                    <CardTitle className="text-2xl">Welcome, {authState.user.name}!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-primary text-primary-foreground p-4 rounded-lg">
                        <h2 className="text-xl font-semibold">Current Balance</h2>
                        <p className="text-3xl font-bold">${balance.toFixed(2)}</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
                        <ul className="space-y-2">
                            {mockTransactions.map((transaction) => (
                                <li key={transaction.id} className="bg-white p-3 rounded-md shadow flex justify-between items-center">
                                    <span className={transaction.type === "deposit" ? "text-green-600" : "text-red-600"}>
                                        {transaction.type === "deposit" ? "+" : "-"} ${transaction.amount}
                                    </span>
                                    <span className="text-gray-500">{transaction.date}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Button onClick={handleLogout} variant="destructive" className="w-full">
                        Logout
                    </Button>
                </CardContent>
            </Card>
        </main>
    )
}





