const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Transaction {
    id: number;
    type: 'deposit' | 'withdrawal';
    amount: number;
    date: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface TransactionResponse {
    balance: number;
    transactions: Transaction[];
}

class ApiService {
    private token: string | null = null;

    setToken(token: string) {
        this.token = token;
        localStorage.setItem('token', token);
    }

    getToken() {
        if (!this.token) {
            this.token = localStorage.getItem('token');
        }
        return this.token;
    }

    private getHeaders() {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };
        const token = this.getToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        return headers;
    }

    async register(name: string, email: string, password: string): Promise<AuthResponse> {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ name, email, password }),
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }

        const data = await response.json();
        this.setToken(data.token);
        return data;
    }

    async login(email: string, password: string): Promise<AuthResponse> {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        this.setToken(data.token);
        return data;
    }

    async getTransactions(): Promise<TransactionResponse> {
        const response = await fetch(`${API_URL}/transactions`, {
            headers: this.getHeaders(),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch transactions');
        }

        return response.json();
    }

    async createTransaction(type: 'deposit' | 'withdrawal', amount: number): Promise<Transaction> {
        const response = await fetch(`${API_URL}/transactions`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ type, amount }),
        });

        if (!response.ok) {
            throw new Error('Failed to create transaction');
        }

        return response.json();
    }

    logout() {
        this.token = null;
        localStorage.removeItem('token');
    }
}

export const api = new ApiService(); 