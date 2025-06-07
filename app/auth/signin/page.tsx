'use client'

import { signIn, getProviders } from 'next-auth/react'
import { useState, useEffect } from 'react'
import type { ClientSafeProvider, LiteralUnion } from 'next-auth/react'
import type { BuiltInProviderType } from 'next-auth/providers/index'
import { useRouter, useSearchParams } from 'next/navigation' // Importar useSearchParams

// Importar componentes de UI (ajuste conforme sua biblioteca de UI)
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function SignInPage() {
  const router = useRouter()
  const searchParams = useSearchParams() // Usar searchParams para obter o callbackUrl
  const callbackUrl = searchParams.get('callbackUrl') || '/admin' // Se não houver callbackUrl, redirecionar para /admin

  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    (async () => {
      const res = await getProviders()
      setProviders(res)
    })()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const result = await signIn('credentials', {
      redirect: false, 
      username,
      password,
      // callbackUrl: callbackUrl, // Passar o callbackUrl para o signIn
    })

    setIsLoading(false)

    if (result?.error) {
      setError(result.error === "CredentialsSignin" ? "Credenciais inválidas. Tente novamente." : result.error)
    } else if (result?.ok) {
      router.push(callbackUrl) // Usar o callbackUrl obtido
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Acesse sua área administrativa.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Usuário</Label>
              <Input
                id="username"
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="admin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>
            )}
            <Button type="submit" className="w-full bg-rfs-blue hover:bg-rfs-blue/90" disabled={isLoading}>
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
        </CardContent>
        {providers && Object.values(providers).map((provider) => {
          if (provider.id === 'credentials') return null 
          return (
            <CardFooter key={provider.name} className="flex flex-col space-y-2 pt-4 mt-4 border-t">
              <p className="text-xs text-gray-500 dark:text-gray-400">Ou entre com</p>
              <Button
                variant="outline"
                onClick={() => signIn(provider.id, { callbackUrl })}
                className="w-full"
                disabled={isLoading}
              >
                {/* Idealmente, adicionar ícones aqui para cada provedor */}
                {provider.name}
              </Button>
            </CardFooter>
          )
        })}
      </Card>
    </div>
  )
} 