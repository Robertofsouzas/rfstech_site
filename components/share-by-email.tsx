"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ShareByEmailProps {
  postTitle: string
  postUrl: string
  postExcerpt: string
}

export function ShareByEmail({ postTitle, postUrl, postExcerpt }: ShareByEmailProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    senderName: "",
    senderEmail: "",
    recipientEmail: "",
    message: ""
  })
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Aqui você pode adicionar a lógica para enviar o e-mail
      // Simulando uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1500))

      toast({
        title: "E-mail enviado com sucesso!",
        description: "O artigo foi compartilhado com o destinatário.",
        variant: "default",
      })

      setIsOpen(false)
      setFormData({
        senderName: "",
        senderEmail: "",
        recipientEmail: "",
        message: ""
      })
    } catch (error) {
      toast({
        title: "Erro ao enviar e-mail",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
        >
          <Mail className="mr-2 h-4 w-4" />
          Enviar por E-mail
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Compartilhar por E-mail</DialogTitle>
          <DialogDescription>
            Envie este artigo para um amigo ou colega.
          </DialogDescription>
        </DialogHeader>
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Input
              name="senderName"
              placeholder="Seu nome"
              value={formData.senderName}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Input
              name="senderEmail"
              type="email"
              placeholder="Seu e-mail"
              value={formData.senderEmail}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Input
              name="recipientEmail"
              type="email"
              placeholder="E-mail do destinatário"
              value={formData.recipientEmail}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Textarea
              name="message"
              placeholder="Mensagem pessoal (opcional)"
              value={formData.message}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <div className="rounded-md bg-muted p-4">
              <h4 className="mb-2 text-sm font-medium">Prévia do E-mail</h4>
              <div className="text-sm text-muted-foreground">
                <p className="mb-2">Olá!</p>
                <p className="mb-2">
                  {formData.senderName || "Alguém"} compartilhou um artigo do blog da RFStech com você:
                </p>
                <p className="mb-2 font-medium">{postTitle}</p>
                <p className="mb-2">{postExcerpt}</p>
                <p className="text-xs">Leia o artigo completo em: {postUrl}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-rfs-blue hover:bg-rfs-blue/90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar"
              )}
            </Button>
          </div>
        </motion.form>
      </DialogContent>
    </Dialog>
  )
} 