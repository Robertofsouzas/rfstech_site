"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Toaster } from "@/components/toaster"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, BarChart3, Workflow } from "lucide-react"
import { useProjectStore } from "@/lib/store"

export default function EmbedPage() {
  const [activeTab, setActiveTab] = useState("power-bi")
  const { toast } = useToast()
  const { projects, updateProject } = useProjectStore()

  // Filtrar projetos por tipo
  const powerBiProjects = projects.filter((p) => p.type === "power-bi")
  const n8nProjects = projects.filter((p) => p.type === "n8n")

  // Estados para os campos do formulário de incorporação Power BI
  const [powerBiProject, setPowerBiProject] = useState("")
  const [powerBiEmbed, setPowerBiEmbed] = useState("")
  const [powerBiHeight, setPowerBiHeight] = useState("600")
  const [isSubmittingPowerBi, setIsSubmittingPowerBi] = useState(false)

  // Estados para os campos do formulário de incorporação n8n
  const [n8nProject, setN8nProject] = useState("")
  const [n8nEmbed, setN8nEmbed] = useState("")
  const [n8nHeight, setN8nHeight] = useState("600")
  const [n8nImage, setN8nImage] = useState<File | null>(null)
  const [isSubmittingN8n, setIsSubmittingN8n] = useState(false)

  // Carregar dados do projeto selecionado
  useEffect(() => {
    if (powerBiProject) {
      const selectedProject = projects.find((p) => p.slug === powerBiProject)
      if (selectedProject) {
        setPowerBiEmbed(selectedProject.embedUrl || "")
        setPowerBiHeight(selectedProject.height || "600")
      }
    }
  }, [powerBiProject, projects])

  useEffect(() => {
    if (n8nProject) {
      const selectedProject = projects.find((p) => p.slug === n8nProject)
      if (selectedProject) {
        setN8nEmbed(selectedProject.embedUrl || "")
        setN8nHeight(selectedProject.height || "600")
      }
    }
  }, [n8nProject, projects])

  // Função para lidar com o upload de imagem
  const handleImageUpload = () => {
    toast({
      variant: "success",
      title: "Imagem enviada",
      description: "A imagem do fluxo de trabalho foi enviada com sucesso.",
    })
  }

  // Salvar configurações do Power BI
  const handleSavePowerBiConfig = () => {
    // Validação básica
    if (!powerBiProject) {
      toast({
        title: "Projeto não selecionado",
        description: "Por favor, selecione um projeto Power BI.",
        variant: "destructive",
      })
      return
    }

    if (powerBiEmbed && !powerBiEmbed.includes("powerbi.com")) {
      toast({
        title: "URL inválida",
        description: "Por favor, insira uma URL válida do Power BI para incorporação.",
        variant: "destructive",
      })
      return
    }

    setIsSubmittingPowerBi(true)

    // Simulando uma chamada de API
    setTimeout(() => {
      // Atualizar o projeto no store
      const projectToUpdate = projects.find((p) => p.slug === powerBiProject)

      if (projectToUpdate) {
        updateProject(projectToUpdate.id, {
          embedUrl: powerBiEmbed,
          height: powerBiHeight,
        })
      }

      setIsSubmittingPowerBi(false)

      // Mostrar notificação de sucesso
      toast({
        variant: "success",
        title: "Configurações salvas",
        description: "As configurações do relatório Power BI foram salvas com sucesso.",
      })
    }, 1000)
  }

  // Salvar configurações do n8n
  const handleSaveN8nConfig = () => {
    // Validação básica
    if (!n8nProject) {
      toast({
        title: "Projeto não selecionado",
        description: "Por favor, selecione um projeto n8n.",
        variant: "destructive",
      })
      return
    }

    setIsSubmittingN8n(true)

    // Simulando uma chamada de API
    setTimeout(() => {
      // Atualizar o projeto no store
      const projectToUpdate = projects.find((p) => p.slug === n8nProject)

      if (projectToUpdate) {
        updateProject(projectToUpdate.id, {
          embedUrl: n8nEmbed,
          height: n8nHeight,
        })
      }

      setIsSubmittingN8n(false)

      // Mostrar notificação de sucesso
      toast({
        variant: "success",
        title: "Configurações salvas",
        description: "As configurações do fluxo n8n foram salvas com sucesso.",
      })
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-rfs-darkBlue dark:text-rfs-white">
                  Incorporar Relatórios
                </h1>
                <p className="max-w-[900px] text-rfs-black/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-rfs-white/70">
                  Configure os relatórios do Power BI e fluxos do n8n para exibição no site
                </p>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 bg-rfs-lightBlue dark:bg-rfs-darkBlue/60">
                <TabsTrigger
                  value="power-bi"
                  className="data-[state=active]:bg-rfs-blue data-[state=active]:text-rfs-white flex items-center gap-2"
                >
                  <BarChart3 className="h-4 w-4" />
                  Power BI
                </TabsTrigger>
                <TabsTrigger
                  value="n8n"
                  className="data-[state=active]:bg-rfs-blue data-[state=active]:text-rfs-white flex items-center gap-2"
                >
                  <Workflow className="h-4 w-4" />
                  n8n
                </TabsTrigger>
              </TabsList>

              <TabsContent value="power-bi" className="mt-6">
                <Card className="border-rfs-blue/20 dark:border-rfs-blue/30">
                  <CardHeader>
                    <CardTitle className="text-rfs-darkBlue dark:text-rfs-white flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-rfs-blue" />
                      Configurar Relatório Power BI
                    </CardTitle>
                    <CardDescription className="text-rfs-black/70 dark:text-rfs-white/70">
                      Configure a URL de incorporação e as dimensões do relatório Power BI
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="powerbi-project" className="text-rfs-black/70 dark:text-rfs-white/70">
                          Projeto Power BI
                        </Label>
                        <Select value={powerBiProject} onValueChange={setPowerBiProject}>
                          <SelectTrigger id="powerbi-project" className="border-rfs-blue/20 dark:border-rfs-blue/30">
                            <SelectValue placeholder="Selecione um projeto" />
                          </SelectTrigger>
                          <SelectContent>
                            {powerBiProjects.map((project) => (
                              <SelectItem key={project.id} value={project.slug}>
                                {project.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="powerbi-embed" className="text-rfs-black/70 dark:text-rfs-white/70">
                          URL de Incorporação
                        </Label>
                        <Input
                          id="powerbi-embed"
                          placeholder="https://app.powerbi.com/view?r=eyJrIjoiMDc..."
                          value={powerBiEmbed}
                          onChange={(e) => setPowerBiEmbed(e.target.value)}
                          className="border-rfs-blue/20 dark:border-rfs-blue/30"
                        />
                        <p className="text-xs text-rfs-black/50 dark:text-rfs-white/50">
                          Cole a URL de incorporação do Power BI. Você pode obtê-la ao compartilhar seu relatório e
                          selecionar 'Incorporar'.
                        </p>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="powerbi-height" className="text-rfs-black/70 dark:text-rfs-white/70">
                          Altura (em pixels)
                        </Label>
                        <Input
                          id="powerbi-height"
                          type="number"
                          placeholder="600"
                          value={powerBiHeight}
                          onChange={(e) => setPowerBiHeight(e.target.value)}
                          className="border-rfs-blue/20 dark:border-rfs-blue/30"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={handleSavePowerBiConfig}
                      disabled={isSubmittingPowerBi}
                      className="bg-rfs-blue hover:bg-rfs-blue/90 text-rfs-white"
                    >
                      {isSubmittingPowerBi ? (
                        "Salvando..."
                      ) : (
                        <>
                          Salvar Configurações
                          <CheckCircle className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="n8n" className="mt-6">
                <Card className="border-rfs-blue/20 dark:border-rfs-blue/30">
                  <CardHeader>
                    <CardTitle className="text-rfs-darkBlue dark:text-rfs-white flex items-center gap-2">
                      <Workflow className="h-5 w-5 text-rfs-blue" />
                      Configurar Fluxo n8n
                    </CardTitle>
                    <CardDescription className="text-rfs-black/70 dark:text-rfs-white/70">
                      Configure a URL de incorporação e a imagem do fluxo de trabalho n8n
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="n8n-project" className="text-rfs-black/70 dark:text-rfs-white/70">
                          Projeto n8n
                        </Label>
                        <Select value={n8nProject} onValueChange={setN8nProject}>
                          <SelectTrigger id="n8n-project" className="border-rfs-blue/20 dark:border-rfs-blue/30">
                            <SelectValue placeholder="Selecione um projeto" />
                          </SelectTrigger>
                          <SelectContent>
                            {n8nProjects.map((project) => (
                              <SelectItem key={project.id} value={project.slug}>
                                {project.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="n8n-embed" className="text-rfs-black/70 dark:text-rfs-white/70">
                          URL de Incorporação (opcional)
                        </Label>
                        <Input
                          id="n8n-embed"
                          placeholder="https://n8n.io/embed/..."
                          value={n8nEmbed}
                          onChange={(e) => setN8nEmbed(e.target.value)}
                          className="border-rfs-blue/20 dark:border-rfs-blue/30"
                        />
                        <p className="text-xs text-rfs-black/50 dark:text-rfs-white/50">
                          Se disponível, cole a URL para incorporar o fluxo de trabalho n8n.
                        </p>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="n8n-height" className="text-rfs-black/70 dark:text-rfs-white/70">
                          Altura (em pixels)
                        </Label>
                        <Input
                          id="n8n-height"
                          type="number"
                          placeholder="600"
                          value={n8nHeight}
                          onChange={(e) => setN8nHeight(e.target.value)}
                          className="border-rfs-blue/20 dark:border-rfs-blue/30"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="n8n-image" className="text-rfs-black/70 dark:text-rfs-white/70">
                          Imagem do Fluxo de Trabalho
                        </Label>
                        <div className="flex gap-2">
                          <Input
                            id="n8n-image"
                            type="file"
                            className="flex-1 border-rfs-blue/20 dark:border-rfs-blue/30"
                            onChange={(e) => setN8nImage(e.target.files?.[0] || null)}
                          />
                          <Button
                            variant="outline"
                            onClick={handleImageUpload}
                            className="border-rfs-blue text-rfs-blue hover:bg-rfs-blue/10 dark:border-rfs-blue dark:text-rfs-white"
                          >
                            Upload
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={handleSaveN8nConfig}
                      disabled={isSubmittingN8n}
                      className="bg-rfs-blue hover:bg-rfs-blue/90 text-rfs-white"
                    >
                      {isSubmittingN8n ? (
                        "Salvando..."
                      ) : (
                        <>
                          Salvar Configurações
                          <CheckCircle className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <SiteFooter />
      <Toaster />
    </div>
  )
}
