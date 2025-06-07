"use client"

import { useEffect, useState } from "react"
import { BarChart3, Workflow } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectCard } from "@/components/project-card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useProjectStore } from "@/lib/store"

export default function ProjectsPage() {
  const { projects, getProjectsByType } = useProjectStore()
  const [powerBiProjects, setPowerBiProjects] = useState<any[]>([])
  const [n8nProjects, setN8nProjects] = useState<any[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setPowerBiProjects(getProjectsByType("power-bi"))
    setN8nProjects(getProjectsByType("n8n"))
  }, [projects, getProjectsByType])

  // Não renderizar nada durante a hidratação para evitar erros de SSR
  if (!isClient) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-rfs-lightBlue to-rfs-white dark:from-rfs-darkBlue dark:to-rfs-darkBlue/90">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-rfs-darkBlue dark:text-rfs-white">
                    Carregando projetos...
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

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-rfs-lightBlue to-rfs-white dark:from-rfs-darkBlue dark:to-rfs-darkBlue/90">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-rfs-blue text-rfs-white hover:bg-rfs-blue/80 mb-2">
                Portfólio de Excelência
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-rfs-darkBlue dark:text-rfs-white">
                  Nossos Projetos
                </h1>
                <p className="max-w-[900px] text-rfs-black/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-rfs-white/70">
                  Explore nossa coleção de soluções em Business Intelligence e Automação de Processos
                </p>
              </div>
            </div>

            <div className="mt-12">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-rfs-lightBlue dark:bg-rfs-darkBlue/60">
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:bg-rfs-blue data-[state=active]:text-rfs-white"
                  >
                    Todos
                  </TabsTrigger>
                  <TabsTrigger
                    value="power-bi"
                    className="data-[state=active]:bg-rfs-blue data-[state=active]:text-rfs-white"
                  >
                    Power BI
                  </TabsTrigger>
                  <TabsTrigger
                    value="n8n"
                    className="data-[state=active]:bg-rfs-blue data-[state=active]:text-rfs-white"
                  >
                    n8n
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-8">
                  <div className="space-y-16">
                    <div>
                      <h2 className="text-2xl font-bold mb-6 flex items-center text-rfs-darkBlue dark:text-rfs-white">
                        <BarChart3 className="mr-2 h-6 w-6 text-rfs-blue" />
                        Power BI
                      </h2>
                      {powerBiProjects.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                          {powerBiProjects.map((project) => (
                            <ProjectCard
                              key={project.id}
                              title={project.title}
                              description={project.description}
                              type={project.type}
                              image={project.image}
                              slug={project.slug}
                            />
                          ))}
                        </div>
                      ) : (
                        <p className="text-center py-8 text-rfs-black/60 dark:text-rfs-white/60">
                          Nenhum projeto Power BI encontrado. Adicione projetos na área administrativa.
                        </p>
                      )}
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold mb-6 flex items-center text-rfs-darkBlue dark:text-rfs-white">
                        <Workflow className="mr-2 h-6 w-6 text-rfs-blue" />
                        Automação n8n
                      </h2>
                      {n8nProjects.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                          {n8nProjects.map((project) => (
                            <ProjectCard
                              key={project.id}
                              title={project.title}
                              description={project.description}
                              type={project.type}
                              image={project.image}
                              slug={project.slug}
                            />
                          ))}
                        </div>
                      ) : (
                        <p className="text-center py-8 text-rfs-black/60 dark:text-rfs-white/60">
                          Nenhum projeto n8n encontrado. Adicione projetos na área administrativa.
                        </p>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="power-bi" className="mt-8">
                  {powerBiProjects.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                      {powerBiProjects.map((project) => (
                        <ProjectCard
                          key={project.id}
                          title={project.title}
                          description={project.description}
                          type={project.type}
                          image={project.image}
                          slug={project.slug}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-8 text-rfs-black/60 dark:text-rfs-white/60">
                      Nenhum projeto Power BI encontrado. Adicione projetos na área administrativa.
                    </p>
                  )}
                </TabsContent>

                <TabsContent value="n8n" className="mt-8">
                  {n8nProjects.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                      {n8nProjects.map((project) => (
                        <ProjectCard
                          key={project.id}
                          title={project.title}
                          description={project.description}
                          type={project.type}
                          image={project.image}
                          slug={project.slug}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-8 text-rfs-black/60 dark:text-rfs-white/60">
                      Nenhum projeto n8n encontrado. Adicione projetos na área administrativa.
                    </p>
                  )}
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
