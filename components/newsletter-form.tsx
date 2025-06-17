"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Aqui você pode adicionar a lógica para enviar o email para sua API
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulação de envio
      toast.success("Inscrição realizada com sucesso!")
      setEmail("")
    } catch (error) {
      toast.error("Erro ao realizar inscrição. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-rfs-darkBlue dark:text-rfs-white">
          Inscreva-se na Newsletter
        </h3>
        <p className="mt-2 text-sm text-rfs-black/70 dark:text-rfs-white/70">
          Receba as últimas atualizações e novidades diretamente no seu email.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          type="email"
          placeholder="Seu melhor email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1"
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-rfs-blue hover:bg-rfs-blue/90"
        >
          {isLoading ? "Enviando..." : "Inscrever-se"}
        </Button>
      </div>
    </form>
  )
} 