"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle } from "lucide-react"

export function CompanyInfoForm() {
  const [activeTab, setActiveTab] = useState("general")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSaveChanges = () => {
    setIsSubmitting(true)

    // Simulando uma chamada de API
    setTimeout(() => {
      setIsSubmitting(false)

      // Mostrar notificação de sucesso
      toast({
        variant: "success",
        title: "Alterações salvas",
        description: "As informações da empresa foram atualizadas com sucesso.",
      })
    }, 1000)
  }

  return (
    <Card className="border-rfs-blue/20 dark:border-rfs-blue/30">
      <CardHeader>
        <CardTitle className="text-rfs-darkBlue dark:text-rfs-white">Informações da Empresa</CardTitle>
        <CardDescription className="text-rfs-black/70 dark:text-rfs-white/70">
          Atualize as informações básicas da sua empresa que serão exibidas no site
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-rfs-lightBlue dark:bg-rfs-darkBlue/60">
            <TabsTrigger value="general" className="data-[state=active]:bg-rfs-blue data-[state=active]:text-rfs-white">
              Geral
            </TabsTrigger>
            <TabsTrigger value="contact" className="data-[state=active]:bg-rfs-blue data-[state=active]:text-rfs-white">
              Contato
            </TabsTrigger>
            <TabsTrigger value="social" className="data-[state=active]:bg-rfs-blue data-[state=active]:text-rfs-white">
              Redes Sociais
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4 mt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="company-name" className="text-rfs-black/70 dark:text-rfs-white/70">
                  Nome da Empresa
                </Label>
                <Input
                  id="company-name"
                  defaultValue="RFStech"
                  className="border-rfs-blue/20 dark:border-rfs-blue/30"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="company-slogan" className="text-rfs-black/70 dark:text-rfs-white/70">
                  Slogan
                </Label>
                <Input
                  id="company-slogan"
                  defaultValue="Soluções em Business Intelligence e Automação de Processos"
                  className="border-rfs-blue/20 dark:border-rfs-blue/30"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="company-about" className="text-rfs-black/70 dark:text-rfs-white/70">
                  Sobre a Empresa
                </Label>
                <Textarea
                  id="company-about"
                  className="min-h-[120px] border-rfs-blue/20 dark:border-rfs-blue/30"
                  defaultValue="A RFStech é especializada em soluções de Business Intelligence com Power BI e automação de processos com n8n, ajudando empresas a transformar dados em insights valiosos e otimizar seus fluxos de trabalho."
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="company-logo" className="text-rfs-black/70 dark:text-rfs-white/70">
                  Logo da Empresa
                </Label>
                <div className="flex gap-2">
                  <Input id="company-logo" type="file" className="flex-1 border-rfs-blue/20 dark:border-rfs-blue/30" />
                  <Button
                    variant="outline"
                    className="border-rfs-blue text-rfs-blue hover:bg-rfs-blue/10 dark:border-rfs-blue dark:text-rfs-white"
                  >
                    Upload
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4 mt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="company-address" className="text-rfs-black/70 dark:text-rfs-white/70">
                  Endereço
                </Label>
                <Textarea
                  id="company-address"
                  className="min-h-[80px] border-rfs-blue/20 dark:border-rfs-blue/30"
                  defaultValue="Av. Exemplo, 1234
Bairro, Cidade - Estado
CEP: 12345-678"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="company-phone" className="text-rfs-black/70 dark:text-rfs-white/70">
                  Telefone
                </Label>
                <Input
                  id="company-phone"
                  defaultValue="+55 (11) 1234-5678"
                  className="border-rfs-blue/20 dark:border-rfs-blue/30"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="company-email" className="text-rfs-black/70 dark:text-rfs-white/70">
                  E-mail
                </Label>
                <Input
                  id="company-email"
                  type="email"
                  defaultValue="contato@rfstech.com.br"
                  className="border-rfs-blue/20 dark:border-rfs-blue/30"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="company-hours" className="text-rfs-black/70 dark:text-rfs-white/70">
                  Horário de Funcionamento
                </Label>
                <Input
                  id="company-hours"
                  defaultValue="Segunda a Sexta, 9h às 18h"
                  className="border-rfs-blue/20 dark:border-rfs-blue/30"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="social" className="space-y-4 mt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="company-website" className="text-rfs-black/70 dark:text-rfs-white/70">
                  Website
                </Label>
                <Input
                  id="company-website"
                  defaultValue="https://www.rfstech.com.br"
                  className="border-rfs-blue/20 dark:border-rfs-blue/30"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="company-linkedin" className="text-rfs-black/70 dark:text-rfs-white/70">
                  LinkedIn
                </Label>
                <Input
                  id="company-linkedin"
                  defaultValue="https://www.linkedin.com/company/rfstech"
                  className="border-rfs-blue/20 dark:border-rfs-blue/30"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="company-facebook" className="text-rfs-black/70 dark:text-rfs-white/70">
                  Facebook
                </Label>
                <Input
                  id="company-facebook"
                  defaultValue="https://www.facebook.com/rfstech"
                  className="border-rfs-blue/20 dark:border-rfs-blue/30"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="company-instagram" className="text-rfs-black/70 dark:text-rfs-white/70">
                  Instagram
                </Label>
                <Input
                  id="company-instagram"
                  defaultValue="https://www.instagram.com/rfstech"
                  className="border-rfs-blue/20 dark:border-rfs-blue/30"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="company-twitter" className="text-rfs-black/70 dark:text-rfs-white/70">
                  Twitter
                </Label>
                <Input
                  id="company-twitter"
                  defaultValue="https://www.twitter.com/rfstech"
                  className="border-rfs-blue/20 dark:border-rfs-blue/30"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSaveChanges}
          disabled={isSubmitting}
          className="bg-rfs-blue hover:bg-rfs-blue/90 text-rfs-white"
        >
          {isSubmitting ? (
            "Salvando..."
          ) : (
            <>
              Salvar Alterações
              <CheckCircle className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
