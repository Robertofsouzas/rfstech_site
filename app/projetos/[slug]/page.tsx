"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, BarChart3, Calendar, CheckCircle2, Workflow } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Badge } from "@/components/ui/badge"
import { useProjectStore } from "@/lib/store"
import { formatDate } from "@/lib/utils"
// Importar o componente PowerBiDemo
import { PowerBiDemo } from "@/components/power-bi-demo"

type ProjectType = "power-bi" | "n8n"

interface Project {
  slug: string
  title: string
  type: ProjectType
  date: string
  fullDescription: string
  image?: string
  embedUrl?: string
  height?: string
}

// Dados de exemplo para benefícios e tecnologias
const projectBenefits: Record<ProjectType, string[]> = {
  "power-bi": [
    "Visão consolidada de todos os indicadores",
    "Análise de tendências e projeções futuras",
    "Monitoramento em tempo real",
    "Comparativo de performance com períodos anteriores",
  ],
  n8n: [
    "Redução de tempo em processos manuais",
    "Eliminação de erros humanos",
    "Notificações automáticas",
    "Integração com sistemas existentes",
  ],
}

const projectTechnologies: Record<ProjectType, string[]> = {
  "power-bi": ["Microsoft Power BI", "DAX avançado", "SQL Server", "Modelagem dimensional"],
  n8n: ["n8n", "REST API", "Webhooks", "JSON Processing"],
}

export default function ProjectPage() {
  const params = useParams()
  const router = useRouter()
  const { projects } = useProjectStore()
  const [project, setProject] = useState<Project | null>(null)
  const [isClient, setIsClient] = useState(false)
  const slug = params?.slug as string

  useEffect(() => {
    setIsClient(true)
    const foundProject = projects.find((p) => p.slug === slug)

    if (foundProject) {
      setProject(foundProject)
    }
  }, [slug, projects])

  // Redirecionar para a página de projetos se o projeto não for encontrado
  useEffect(() => {
    if (isClient && !project && projects.length > 0) {
      router.push("/projetos")
    }
  }, [project, isClient, router, projects])

  // Não renderizar nada durante a hidratação para evitar erros de SSR
  if (!isClient || !project) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-rfs-darkBlue dark:text-rfs-white">
                    Carregando projeto...
                  </h1>
                </div>
              </div>
            </div>
          </section>
        </main>
        <SiteFooter />
      </div>
    )
  }

  // Obter benefícios e tecnologias com base no tipo do projeto
  const benefits = projectBenefits[project.type] || []
  const technologies = projectTechnologies[project.type] || []

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mb-8">
              <Link href="/projetos" passHref>
                <Button
                  variant="ghost"
                  className="pl-0 flex items-center gap-2 text-rfs-blue hover:bg-rfs-blue/10 dark:text-rfs-lightBlue dark:hover:bg-rfs-blue/20"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Voltar para Projetos
                </Button>
              </Link>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    {project.type === "power-bi" ? (
                      <Badge className="bg-rfs-blue/10 text-rfs-blue dark:bg-rfs-blue/20 dark:text-rfs-lightBlue px-3 py-1">
                        <div className="flex items-center gap-2">
                          <BarChart3 className="h-4 w-4" />
                          <span className="font-medium">Power BI</span>
                        </div>
                      </Badge>
                    ) : project.type === "n8n" ? (
                      <Badge className="bg-rfs-blue/10 text-rfs-blue dark:bg-rfs-blue/20 dark:text-rfs-lightBlue px-3 py-1">
                        <div className="flex items-center gap-2">
                          <Workflow className="h-4 w-4" />
                          <span className="font-medium">n8n</span>
                        </div>
                      </Badge>
                    ) : null}
                  </div>

                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-rfs-darkBlue dark:text-rfs-white">
                    {project.title}
                  </h1>

                  <div className="flex items-center gap-2 text-rfs-black/60 dark:text-rfs-white/60">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(project.date)}</span>
                  </div>

                  <p className="text-rfs-black/70 dark:text-rfs-white/70 text-lg">{project.fullDescription}</p>
                </div>

                {benefits.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-rfs-darkBlue dark:text-rfs-white">Benefícios</h3>
                    <ul className="space-y-2">
                      {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-rfs-blue mt-0.5" />
                          <span className="text-rfs-black/70 dark:text-rfs-white/70">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="rounded-lg overflow-hidden border border-rfs-blue/20 bg-rfs-white dark:border-rfs-blue/30 dark:bg-rfs-darkBlue shadow-lg">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-auto object-cover"
                  width={800}
                  height={450}
                  loading="lazy"
                />
              </div>
            </div>

            <div className="mt-16">
              <Tabs defaultValue="preview" className="w-full">
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-rfs-lightBlue dark:bg-rfs-darkBlue/60">
                  <TabsTrigger
                    value="preview"
                    className="data-[state=active]:bg-rfs-blue data-[state=active]:text-rfs-white"
                  >
                    Visualização
                  </TabsTrigger>
                  <TabsTrigger
                    value="details"
                    className="data-[state=active]:bg-rfs-blue data-[state=active]:text-rfs-white"
                  >
                    Detalhes Técnicos
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value="preview"
                  className="p-6 border border-rfs-blue/20 rounded-lg mt-4 bg-rfs-white dark:border-rfs-blue/30 dark:bg-rfs-darkBlue"
                >
                  {project.type === "power-bi" ? (
                    <div
                      className="w-full bg-rfs-white dark:bg-rfs-darkBlue rounded-lg overflow-hidden"
                      style={{ height: `${project.height || 600}px` }}
                    >
                      {project.embedUrl ? (
                        <>
                          <div className="bg-[#F3F2F1] p-3 flex justify-between items-center border-b">
                            <div className="flex items-center gap-2">
                              <BarChart3 className="h-5 w-5 text-rfs-blue" />
                              <span className="font-medium text-rfs-darkBlue">{project.title}</span>
                            </div>
                          </div>
                          <div className="w-full h-[calc(100%-48px)]">
                            <iframe
                              title={`${project.title} - Power BI Report`}
                              width="100%"
                              height="100%"
                              src={project.embedUrl}
                              frameBorder="0"
                              allowFullScreen
                              style={{ width: "100%", height: "100%", border: "none" }}
                            ></iframe>
                          </div>
                        </>
                      ) : (
                        <PowerBiDemo title={project.title} />
                      )}
                    </div>
                  ) : project.type === "n8n" ? (
                    <div className="aspect-video w-full bg-rfs-lightBlue dark:bg-rfs-darkBlue/60 rounded-lg overflow-hidden">
                      {project.embedUrl ? (
                        <iframe
                          title={`${project.title} - n8n Workflow`}
                          width="100%"
                          height={project.height || "600"}
                          src={project.embedUrl}
                          frameBorder="0"
                          allowFullScreen
                          className="w-full h-full"
                        ></iframe>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center p-6 max-w-lg">
                            <div className="flex justify-center mb-4">
                              <Workflow className="h-12 w-12 text-rfs-blue" />
                            </div>
                            <h3 className="text-xl font-medium mb-2 text-rfs-darkBlue dark:text-rfs-white">
                              Fluxo de Trabalho n8n
                            </h3>
                            <p className="text-rfs-black/70 dark:text-rfs-white/70 mb-4">
                              Este fluxo de automação conecta múltiplos sistemas e processa dados de forma inteligente.
                            </p>
                            <img
                              src={project.image || "/placeholder.svg"}
                              alt="Fluxo de trabalho n8n"
                              className="max-w-full h-auto mx-auto rounded-lg border border-rfs-blue/20 dark:border-rfs-blue/30"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="aspect-video w-full bg-rfs-lightBlue dark:bg-rfs-darkBlue/60 rounded-lg flex items-center justify-center">
                      <p className="text-rfs-black/70 dark:text-rfs-white/70">Visualização não disponível</p>
                    </div>
                  )}
                </TabsContent>
                <TabsContent
                  value="details"
                  className="p-6 border border-rfs-blue/20 rounded-lg mt-4 bg-rfs-white dark:border-rfs-blue/30 dark:bg-rfs-darkBlue"
                >
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold mb-4 text-rfs-darkBlue dark:text-rfs-white">
                        Detalhes Técnicos
                      </h3>
                      <p className="text-rfs-black/70 dark:text-rfs-white/70 mb-4">
                        {project.type === "power-bi"
                          ? "Este dashboard foi desenvolvido utilizando as melhores práticas de Business Intelligence, com foco em performance e usabilidade."
                          : "Esta automação foi desenvolvida utilizando práticas avançadas de integração e processamento de dados, garantindo confiabilidade e escalabilidade."}
                      </p>
                    </div>

                    {technologies.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold mb-3 text-rfs-darkBlue dark:text-rfs-white">
                          Tecnologias Utilizadas
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {technologies.map((tech, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="px-3 py-1 border-rfs-blue/20 text-rfs-blue dark:border-rfs-blue/30 dark:text-rfs-lightBlue"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-rfs-darkBlue dark:text-rfs-white">Metodologia</h4>
                      <p className="text-rfs-black/70 dark:text-rfs-white/70">
                        {project.type === "power-bi"
                          ? "Utilizamos uma abordagem centrada no usuário, começando com a compreensão profunda das necessidades de negócio, seguida por modelagem de dados otimizada e criação de visualizações intuitivas e informativas."
                          : "Nossa metodologia de automação segue um processo rigoroso de mapeamento de fluxos, identificação de pontos de integração, desenvolvimento iterativo e testes extensivos para garantir robustez."}
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
