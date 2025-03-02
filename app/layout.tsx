// import React from "react";
// import "./globals.css";
// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import { AuthProvider } from "@/context/auth-context";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//     title: "e-wallet",
//     description: "an e-wallet system",
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//     return (
//         <html lang="en">
//             <body className={`${inter.className} bg-[#2A2A2A] text-[#E0E0E0]`}>
//                 <AuthProvider>
//                     <div className="centered-container">
//                     </div>

//                     <main className="flex-grow flex justify-center items-center">{children}</main>

//                     <div className="centered-container">
//                     </div>
//                 </AuthProvider>
//             </body>
//         </html>
//     );
// }




import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/context/auth-context"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthProvider>{children}</AuthProvider>
            </body>
        </html>
    )
}

