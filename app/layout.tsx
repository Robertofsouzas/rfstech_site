import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { WhatsAppButton } from "@/components/whatsapp-button"
import AuthProvider from "@/app/auth-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RFStech - Soluções em Business Intelligence e Automação",
  description: "Transforme seus dados em insights estratégicos com nossas soluções de Business Intelligence, Automação e Inteligência Artificial.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            {children}
            <Toaster />
            <WhatsAppButton />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
