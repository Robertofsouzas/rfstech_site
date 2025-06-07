"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, CheckCircle, Plus, Trash2, Workflow } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useProjectStore, type ProjectType } from "@/lib/store"
import { formatDate } from "@/lib/utils"

export function ProjectForm() {
  const [activeTab, setActiveTab] = useState("add")
  const [projectTypeTab, setProjectTypeTab] = useState("power-bi")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const { projects, addProject, removeProject, updateProject, getUserProjects } = useProjectStore()

  // Estados para o formulário de adição de projeto
  const [projectTitle, setProjectTitle] = useState("")
  const [projectSlug, setProjectSlug] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const [projectFullDescription, setProjectFullDescription] = useState("")
  const [projectDate, setProjectDate] = useState("")
  const [projectImage, setProjectImage] = useState<File | null>(null)
  const [projectEmbedUrl, setProjectEmbedUrl] = useState("")
  const [projectHeight, setProjectHeight] = useState("600")

  // Função para gerar slug a partir do título
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-")
  }

  // Atualizar o slug quando o título mudar
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setProjectTitle(title)
    setProjectSlug(generateSlug(title))
  }

  const resetForm = () => {
    setProjectTitle("")
    setProjectSlug("")
    setProjectDescription("")
    setProjectFullDescription("")
    setProjectDate("")
    setProjectImage(null)
    setProjectEmbedUrl("")
    setProjectHeight("600")
  }

  const handleAddProject = () => {
    // Validação básica
    if (!projectTitle || !projectDescription) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    // Validação da URL de incorporação para Power BI
    if (projectTypeTab === "power-bi" && projectEmbedUrl) {
      if (!projectEmbedUrl.includes("powerbi.com")) {
        toast({
          title: "URL inválida",
          description: "Por favor, insira uma URL válida do Power BI para incorporação.",
          variant: "destructive",
        })
        return
      }
    }

    setIsSubmitting(true)

    // Simulando upload de imagem
    const imagePath = projectImage ? URL.createObjectURL(projectImage) : "/placeholder.svg?height=200&width=300"

    // Adicionar projeto ao store
    setTimeout(() => {
      addProject({
        title: projectTitle,
        slug: projectSlug || generateSlug(projectTitle),
        type: projectTypeTab as ProjectType,
        description: projectDescription,
        fullDescription: projectFullDescription || projectDescription,
        date: projectDate || new Date().toISOString().split("T")[0],
        image: imagePath,
        embedUrl: projectEmbedUrl,
        height: projectHeight,
      })

      setIsSubmitting(false)

      // Limpar o formulário
      resetForm()

      // Mostrar notificação de sucesso
      toast({
        variant: "success",
        title: "Projeto adicionado",
        description: "O projeto foi adicionado com sucesso ao portfólio.",
      })
    }, 1000)
  }

  const handleSaveChanges = () => {
    setIsSubmitting(true)

    // Simulando uma chamada de API
    setTimeout(() => {
      setIsSubmitting(false)

      // Mostrar notificação de sucesso
      toast({
        variant: "success",
        title: "Alterações salvas",
        description: "As alterações nos projetos foram salvas com sucesso.",
      })
    }, 1000)
  }

  const handleDeleteProject = (id: string, projectName: string) => {
    removeProject(id)

    // Mostrar notificação de sucesso
    toast({
      variant: "success",
      title: "Projeto removido",
      description: `O projeto "${projectName}" foi removido com sucesso.`,
    })
  }

  // Filtrar projetos por tipo
  const powerBiProjects = projects.filter((p) => p.type === "power-bi")
  const n8nProjects = projects.filter((p) => p.type === "n8n")

  // Filtrar projetos adicionados pelo usuário
  const userProjects = getUserProjects()
  const userPowerBiProjects = userProjects.filter((p) => p.type === "power-bi")
  const userN8nProjects = userProjects.filter((p) => p.type === "n8n")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 bg-rfs-lightBlue dark:bg-rfs-darkBlue/60">
        <TabsTrigger value="add" className="data-[state=active]:bg-rfs-blue data-[state=active]:text-rfs-white">
          Adicionar Projeto
        </TabsTrigger>
        <TabsTrigger value="manage" className="data-[state=active]:bg-rfs-blue data-[state=active]:text-rfs-white">
          Gerenciar Projetos
        </TabsTrigger>
      </TabsList>

      <TabsContent value="add" className="mt-4">
        <Card className="border-rfs-blue/20 dark:border-rfs-blue/30">
          <CardHeader>
            <CardTitle className="text-rfs-darkBlue dark:text-rfs-white">Adicionar Novo Projeto</CardTitle>
            <CardDescription className="text-rfs-black/70 dark:text-rfs-white/70">
              Crie um novo projeto para exibir em seu portfólio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={projectTypeTab} onValueChange={setProjectTypeTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-rfs-lightBlue dark:bg-rfs-darkBlue/60 mb-6">
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

              <div className="space-y-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="project-title" className="text-rfs-black/70 dark:text-rfs-white/70">
                      Título do Projeto*
                    </Label>
                    <Input
                      id="project-title"
                      placeholder={
                        projectTypeTab === "power-bi" ? "Ex: Dashboard Financeiro" : "Ex: Automação de Vendas"
                      }
                      value={projectTitle}
                      onChange={handleTitleChange}
                      className="border-rfs-blue/20 dark:border-rfs-blue/30"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="project-slug" className="text-rfs-black/70 dark:text-rfs-white/70">
                      Slug (URL)
                    </Label>
                    <Input
                      id="project-slug"
                      placeholder={projectTypeTab === "power-bi" ? "Ex: dashboard-financeiro" : "Ex: automacao-vendas"}
                      value={projectSlug}
                      onChange={(e) => setProjectSlug(e.target.value)}
                      className="border-rfs-blue/20 dark:border-rfs-blue/30"
                    />
                    <p className="text-xs text-rfs-black/50 dark:text-rfs-white/50">
                      O slug é gerado automaticamente a partir do título, mas pode ser personalizado.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="project-description" className="text-rfs-black/70 dark:text-rfs-white/70">
                      Descrição Curta*
                    </Label>
                    <Textarea
                      id="project-description"
                      placeholder="Breve descrição do projeto (exibida nos cards)"
                      className="min-h-[80px] border-rfs-blue/20 dark:border-rfs-blue/30"
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="project-full-description" className="text-rfs-black/70 dark:text-rfs-white/70">
                      Descrição Completa
                    </Label>
                    <Textarea
                      id="project-full-description"
                      placeholder="Descrição detalhada do projeto (exibida na página do projeto)"
                      className="min-h-[120px] border-rfs-blue/20 dark:border-rfs-blue/30"
                      value={projectFullDescription}
                      onChange={(e) => setProjectFullDescription(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="project-date" className="text-rfs-black/70 dark:text-rfs-white/70">
                      Data de Conclusão
                    </Label>
                    <Input
                      id="project-date"
                      type="date"
                      value={projectDate}
                      onChange={(e) => setProjectDate(e.target.value)}
                      className="border-rfs-blue/20 dark:border-rfs-blue/30"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="project-image" className="text-rfs-black/70 dark:text-rfs-white/70">
                      Imagem do Projeto
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="project-image"
                        type="file"
                        className="flex-1 border-rfs-blue/20 dark:border-rfs-blue/30"
                        onChange={(e) => setProjectImage(e.target.files?.[0] || null)}
                        accept="image/*"
                      />
                      <Button
                        variant="outline"
                        className="border-rfs-blue text-rfs-blue hover:bg-rfs-blue/10 dark:border-rfs-blue dark:text-rfs-white"
                      >
                        Upload
                      </Button>
                    </div>
                  </div>

                  {/* Campos específicos para Power BI */}
                  {projectTypeTab === "power-bi" && (
                    <>
                      <div className="grid gap-2">
                        <Label htmlFor="project-embed-url" className="text-rfs-black/70 dark:text-rfs-white/70">
                          URL de Incorporação do Power BI
                        </Label>
                        <Input
                          id="project-embed-url"
                          placeholder="Ex: https://app.powerbi.com/view?r=eyJrIjoiMDc..."
                          value={projectEmbedUrl}
                          onChange={(e) => setProjectEmbedUrl(e.target.value)}
                          className="border-rfs-blue/20 dark:border-rfs-blue/30"
                        />
                        <p className="text-xs text-rfs-black/50 dark:text-rfs-white/50">
                          Cole a URL de incorporação do Power BI. Você pode obtê-la ao compartilhar seu relatório e
                          selecionar 'Incorporar'.
                        </p>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="project-height" className="text-rfs-black/70 dark:text-rfs-white/70">
                          Altura do Relatório (em pixels)
                        </Label>
                        <Input
                          id="project-height"
                          type="number"
                          placeholder="600"
                          value={projectHeight}
                          onChange={(e) => setProjectHeight(e.target.value)}
                          className="border-rfs-blue/20 dark:border-rfs-blue/30"
                        />
                      </div>
                    </>
                  )}

                  {/* Campos específicos para n8n */}
                  {projectTypeTab === "n8n" && (
                    <>
                      <div className="grid gap-2">
                        <Label htmlFor="project-embed-url-n8n" className="text-rfs-black/70 dark:text-rfs-white/70">
                          URL de Incorporação do Fluxo n8n (opcional)
                        </Label>
                        <Input
                          id="project-embed-url-n8n"
                          placeholder="Ex: https://n8n.io/embed/..."
                          value={projectEmbedUrl}
                          onChange={(e) => setProjectEmbedUrl(e.target.value)}
                          className="border-rfs-blue/20 dark:border-rfs-blue/30"
                        />
                        <p className="text-xs text-rfs-black/50 dark:text-rfs-white/50">
                          Se disponível, cole a URL para incorporar o fluxo de trabalho n8n.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button
              className="flex items-center gap-2 bg-rfs-blue hover:bg-rfs-blue/90 text-rfs-white"
              onClick={handleAddProject}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Adicionando..."
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Adicionar Projeto
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="manage" className="mt-4">
        <Card className="border-rfs-blue/20 dark:border-rfs-blue/30">
          <CardHeader>
            <CardTitle className="text-rfs-darkBlue dark:text-rfs-white">Gerenciar Projetos</CardTitle>
            <CardDescription className="text-rfs-black/70 dark:text-rfs-white/70">
              Edite ou remova projetos existentes do seu portfólio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="user-projects" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-rfs-lightBlue dark:bg-rfs-darkBlue/60 mb-6">
                <TabsTrigger
                  value="user-projects"
                  className="data-[state=active]:bg-rfs-blue data-[state=active]:text-rfs-white"
                >
                  Meus Projetos
                </TabsTrigger>
                <TabsTrigger
                  value="power-bi-projects"
                  className="data-[state=active]:bg-rfs-blue data-[state=active]:text-rfs-white"
                >
                  Power BI
                </TabsTrigger>
                <TabsTrigger
                  value="n8n-projects"
                  className="data-[state=active]:bg-rfs-blue data-[state=active]:text-rfs-white"
                >
                  n8n
                </TabsTrigger>
              </TabsList>

              <TabsContent value="user-projects">
                <div className="space-y-4">
                  {userProjects.length === 0 ? (
                    <p className="text-center py-8 text-rfs-black/60 dark:text-rfs-white/60">
                      Você ainda não adicionou nenhum projeto. Adicione projetos na aba "Adicionar Projeto".
                    </p>
                  ) : (
                    userProjects.map((project, index) => (
                      <div
                        key={project.id}
                        className={`flex items-center justify-between pb-4 ${
                          index < userProjects.length - 1 ? "border-b border-rfs-blue/10 dark:border-rfs-blue/20" : ""
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {project.type === "power-bi" ? (
                            <BarChart3 className="h-5 w-5 text-rfs-blue" />
                          ) : (
                            <Workflow className="h-5 w-5 text-rfs-blue" />
                          )}
                          <div>
                            <h3 className="font-medium text-rfs-darkBlue dark:text-rfs-white">{project.title}</h3>
                            <p className="text-sm text-rfs-black/60 dark:text-rfs-white/60">
                              Adicionado em {formatDate(project.createdAt)}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-rfs-blue text-rfs-blue hover:bg-rfs-blue/10 dark:border-rfs-blue dark:text-rfs-white"
                          >
                            Editar
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={() => handleDeleteProject(project.id, project.title)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Remover</span>
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="power-bi-projects">
                <div className="space-y-4">
                  {userPowerBiProjects.length === 0 ? (
                    <p className="text-center py-8 text-rfs-black/60 dark:text-rfs-white/60">
                      Você ainda não adicionou nenhum projeto Power BI. Adicione projetos na aba "Adicionar Projeto".
                    </p>
                  ) : (
                    userPowerBiProjects.map((project, index) => (
                      <div
                        key={project.id}
                        className={`flex items-center justify-between pb-4 ${
                          index < userPowerBiProjects.length - 1
                            ? "border-b border-rfs-blue/10 dark:border-rfs-blue/20"
                            : ""
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <BarChart3 className="h-5 w-5 text-rfs-blue" />
                          <div>
                            <h3 className="font-medium text-rfs-darkBlue dark:text-rfs-white">{project.title}</h3>
                            <p className="text-sm text-rfs-black/60 dark:text-rfs-white/60">
                              Adicionado em {formatDate(project.createdAt)}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-rfs-blue text-rfs-blue hover:bg-rfs-blue/10 dark:border-rfs-blue dark:text-rfs-white"
                          >
                            Editar
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={() => handleDeleteProject(project.id, project.title)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Remover</span>
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="n8n-projects">
                <div className="space-y-4">
                  {userN8nProjects.length === 0 ? (
                    <p className="text-center py-8 text-rfs-black/60 dark:text-rfs-white/60">
                      Você ainda não adicionou nenhum projeto n8n. Adicione projetos na aba "Adicionar Projeto".
                    </p>
                  ) : (
                    userN8nProjects.map((project, index) => (
                      <div
                        key={project.id}
                        className={`flex items-center justify-between pb-4 ${
                          index < userN8nProjects.length - 1
                            ? "border-b border-rfs-blue/10 dark:border-rfs-blue/20"
                            : ""
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Workflow className="h-5 w-5 text-rfs-blue" />
                          <div>
                            <h3 className="font-medium text-rfs-darkBlue dark:text-rfs-white">{project.title}</h3>
                            <p className="text-sm text-rfs-black/60 dark:text-rfs-white/60">
                              Adicionado em {formatDate(project.createdAt)}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-rfs-blue text-rfs-blue hover:bg-rfs-blue/10 dark:border-rfs-blue dark:text-rfs-white"
                          >
                            Editar
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={() => handleDeleteProject(project.id, project.title)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Remover</span>
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              className="border-rfs-blue text-rfs-blue hover:bg-rfs-blue/10 dark:border-rfs-blue dark:text-rfs-white"
            >
              Cancelar
            </Button>
            <Button
              className="bg-rfs-blue hover:bg-rfs-blue/90 text-rfs-white"
              onClick={handleSaveChanges}
              disabled={isSubmitting}
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
      </TabsContent>
    </Tabs>
  )
}
