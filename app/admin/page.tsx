"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProjectForm } from "@/components/project-form"
import { CompanyInfoForm } from "@/components/company-info-form"
import { Toaster } from "@/components/toaster"
import { Button } from "@/components/ui/button"
import { BarChart3, Settings, Workflow } from "lucide-react"
import Link from "next/link"

export default function AdminPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")
  const [activeTab, setActiveTab] = useState("company-info")

  // Definir a aba ativa com base no parâmetro da URL
  useEffect(() => {
    if (tabParam) {
      if (tabParam === "projects" || tabParam === "embed" || tabParam === "company-info") {
        setActiveTab(tabParam)
      }
    }
  }, [tabParam])

  // Atualizar a URL quando a aba mudar
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    router.push(`/admin?tab=${value}`, { scroll: false })
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
                  Área Administrativa
                </h1>
                <p className="max-w-[900px] text-rfs-black/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-rfs-white/70">
                  Gerencie as informações do seu site
                </p>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 bg-rfs-lightBlue dark:bg-rfs-darkBlue/60">
                <TabsTrigger
                  value="company-info"
                  className="data-[state=active]:bg-rfs-blue data-[state=active]:text-rfs-white flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Informações da Empresa
                </TabsTrigger>
                <TabsTrigger
                  value="projects"
                  className="data-[state=active]:bg-rfs-blue data-[state=active]:text-rfs-white flex items-center gap-2"
                >
                  <BarChart3 className="h-4 w-4" />
                  Projetos
                </TabsTrigger>
                <TabsTrigger
                  value="embed"
                  className="data-[state=active]:bg-rfs-blue data-[state=active]:text-rfs-white flex items-center gap-2"
                >
                  <Workflow className="h-4 w-4" />
                  Incorporar Relatórios
                </TabsTrigger>
              </TabsList>

              <TabsContent value="company-info" className="mt-6">
                <CompanyInfoForm />
              </TabsContent>

              <TabsContent value="projects" className="mt-6">
                <ProjectForm />
              </TabsContent>

              <TabsContent value="embed" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-rfs-darkBlue border border-rfs-blue/20 dark:border-rfs-blue/30 rounded-lg p-6 flex flex-col items-center text-center">
                    <BarChart3 className="h-12 w-12 text-rfs-blue mb-4" />
                    <h3 className="text-xl font-bold mb-2 text-rfs-darkBlue dark:text-rfs-white">Power BI</h3>
                    <p className="text-rfs-black/70 dark:text-rfs-white/70 mb-6">
                      Configure as URLs de incorporação e dimensões dos seus relatórios Power BI.
                    </p>
                    <Link href="/admin/embed?tab=power-bi" passHref>
                      <Button className="bg-rfs-blue hover:bg-rfs-blue/90 text-rfs-white">Configurar Power BI</Button>
                    </Link>
                  </div>

                  <div className="bg-white dark:bg-rfs-darkBlue border border-rfs-blue/20 dark:border-rfs-blue/30 rounded-lg p-6 flex flex-col items-center text-center">
                    <Workflow className="h-12 w-12 text-rfs-blue mb-4" />
                    <h3 className="text-xl font-bold mb-2 text-rfs-darkBlue dark:text-rfs-white">n8n</h3>
                    <p className="text-rfs-black/70 dark:text-rfs-white/70 mb-6">
                      Configure as URLs de incorporação e imagens dos seus fluxos de trabalho n8n.
                    </p>
                    <Link href="/admin/embed?tab=n8n" passHref>
                      <Button className="bg-rfs-blue hover:bg-rfs-blue/90 text-rfs-white">Configurar n8n</Button>
                    </Link>
                  </div>
                </div>
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
