import type { Metadata } from "next"
import { Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Contato | RFStech",
  description: "Entre em contato com a RFStech para soluções em Business Intelligence e Automação",
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Entre em Contato</h1>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Estamos prontos para ajudar com suas necessidades em Business Intelligence e Automação
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12 mt-12">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Informações de Contato</h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    Entre em contato conosco através dos canais abaixo ou preencha o formulário.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 mt-0.5 text-gray-500 dark:text-gray-400" />
                    <div>
                      <h3 className="font-medium">Endereço</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Av. Exemplo, 1234
                        <br />
                        Bairro, Cidade - Estado
                        <br />
                        CEP: 12345-678
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="h-5 w-5 mt-0.5 text-gray-500 dark:text-gray-400" />
                    <div>
                      <h3 className="font-medium">Telefone</h3>
                      <p className="text-gray-500 dark:text-gray-400">+55 (11) 1234-5678</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="h-5 w-5 mt-0.5 text-gray-500 dark:text-gray-400" />
                    <div>
                      <h3 className="font-medium">E-mail</h3>
                      <p className="text-gray-500 dark:text-gray-400">contato@rfstech.com.br</p>
                    </div>
                  </div>
                </div>

                <div className="aspect-video w-full bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500 dark:text-gray-400">Mapa de Localização</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Envie uma Mensagem</h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    Preencha o formulário abaixo e entraremos em contato o mais breve possível.
                  </p>
                </div>

                <form className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Nome</Label>
                      <Input id="name" placeholder="Seu nome" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input id="email" type="email" placeholder="seu@email.com" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="subject">Assunto</Label>
                    <Input id="subject" placeholder="Assunto da mensagem" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="message">Mensagem</Label>
                    <Textarea id="message" placeholder="Sua mensagem" className="min-h-[150px]" />
                  </div>
                  <Button type="submit" className="w-full">
                    Enviar Mensagem
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
