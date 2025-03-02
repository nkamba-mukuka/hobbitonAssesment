// import { LoginForm } from "@/app/components/login-form"
// import { RegisterForm } from "@/app/components/resgister-form"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
// import './globals.css'

// export default function Home() {
//     return (
//         <main className="flex min-h-screen flex-col items-center justify-center p-4">
//             <Card className="w-full max-w-md">
//                 <CardHeader className="text-center">
//                     <CardTitle className="text-2xl font-bold">Digital Wallet</CardTitle>
//                     <CardDescription>Login or create an account to continue</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     <div className="forms-wrapper">
//                         <Tabs className="w-full">
//                             <TabsList className="grid w-full grid-cols-2">
//                                 <TabsTrigger value="login">Login</TabsTrigger>
//                                 <TabsTrigger value="register">Register</TabsTrigger>
//                             </TabsList>
//                             <TabsContent value="login">
//                                 <LoginForm />
//                             </TabsContent>
//                             <TabsContent value="register">
//                                 <RegisterForm />
//                             </TabsContent>
//                         </Tabs>
//                     </div>
//                 </CardContent>

//             </Card>
//         </main>
//     )
// }

import { LoginForm } from "@/app/components/login-form"
import { RegisterForm } from "@/app/components/resgister-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import './globals.css'

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-xl border-0">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold text-gray-800">Digital Wallet</CardTitle>
                    <CardDescription className="text-lg text-gray-600">Login or create an account to continue</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="login" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-8">
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="register">Register</TabsTrigger>
                        </TabsList>
                        <TabsContent value="login">
                            <LoginForm />
                        </TabsContent>
                        <TabsContent value="register">
                            <RegisterForm />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </main>
    )
}






