"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { api } from "@/app/services/api"

interface SendMoneyFormProps {
    onSuccess: () => void;
}

export function SendMoneyForm({ onSuccess }: SendMoneyFormProps) {
    const [recipientEmail, setRecipientEmail] = useState("")
    const [amount, setAmount] = useState("")
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

            await api.sendMoney(recipientEmail, numericAmount)
            setRecipientEmail("")
            setAmount("")
            onSuccess()
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to send money")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white/80 p-6 rounded-lg backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Send Money</h2>
            <div className="space-y-2">
                <Label htmlFor="recipient">Recipient Email:</Label>
                <Input
                    id="recipient"
                    type="email"
                    placeholder="Enter recipient's email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    required
                    disabled={isLoading}
                />
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
                className="w-full bg-pink-500 text-white hover:bg-pink-600"
                disabled={isLoading}
            >
                {isLoading ? "Sending..." : "Send Money"}
            </Button>
        </form>
    )
} 