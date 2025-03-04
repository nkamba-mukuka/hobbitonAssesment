"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { api } from "@/app/services/api"

interface TransactionFormProps {
    onSuccess: () => void;
}

export function TransactionForm({ onSuccess }: TransactionFormProps) {
    const [amount, setAmount] = useState("")
    const [type, setType] = useState<"deposit" | "withdrawal">("deposit")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        try {
            const numericAmount = parseFloat(amount)
            if (isNaN(numericAmount) || numericAmount <= 0) {
                throw new Error("Please enter a valid amount")
            }

            await api.createTransaction(type, numericAmount)
            setAmount("")
            onSuccess()
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to process transaction")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white/80 p-6 rounded-lg backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Deposit or Withdraw</h2>
            <div className="space-y-2">
                <Label htmlFor="type">Transaction Type:</Label>
                <div className="flex gap-4">
                    <Button
                        type="button"
                        onClick={() => setType("deposit")}
                        className={`flex-1 ${type === "deposit" ? "bg-green-500 hover:bg-green-600" : "bg-gray-200 hover:bg-gray-300"}`}
                        disabled={isLoading}
                    >
                        Deposit
                    </Button>
                    <Button
                        type="button"
                        onClick={() => setType("withdrawal")}
                        className={`flex-1 ${type === "withdrawal" ? "bg-red-500 hover:bg-red-600" : "bg-gray-200 hover:bg-gray-300"}`}
                        disabled={isLoading}
                    >
                        Withdraw
                    </Button>
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="amount">Amount:</Label>
                <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    min="0"
                    step="0.01"
                    disabled={isLoading}
                />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button
                type="submit"
                className={`w-full ${type === "deposit" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"} text-white`}
                disabled={isLoading}
            >
                {isLoading ? "Processing..." : type === "deposit" ? "Deposit" : "Withdraw"}
            </Button>
        </form>
    )
} 