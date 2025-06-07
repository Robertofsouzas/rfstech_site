import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AboutMe } from "@/components/about-me"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sobre | RFStech",
  description: "Conheça minhas competências e experiências em Business Intelligence, Automação e IA",
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-rfs-lightBlue to-rfs-white dark:from-rfs-darkBlue dark:to-rfs-darkBlue/90">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-rfs-darkBlue dark:text-rfs-white">
                  Sobre Mim
                </h1>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Conheça minha trajetória, competências e experiências profissionais
                </p>
              </div>
            </div>
          </div>
        </section>

        <AboutMe />

        <section className="w-full py-12 md:py-24 bg-rfs-lightBlue dark:bg-rfs-darkBlue/80">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl space-y-8">
              <h2 className="text-2xl font-bold text-center text-rfs-darkBlue dark:text-rfs-white">
                Experiência Profissional
              </h2>

              <div className="space-y-8">
                <div className="rounded-lg border border-rfs-blue/20 bg-rfs-white p-6 dark:border-rfs-blue/30 dark:bg-rfs-darkBlue/60">
                  <h3 className="text-xl font-bold text-rfs-darkBlue dark:text-rfs-white">Petrobras</h3>
                  <p className="text-sm text-rfs-black/60 dark:text-rfs-white/60 mb-4">Analista de Dados BI</p>
                  <p className="text-rfs-black/70 dark:text-rfs-white/70">
                    Desenvolvimento de soluções de Business Intelligence para análise de dados operacionais e
                    estratégicos, implementação de dashboards interativos com Power BI e automação de processos com n8n.
                  </p>
                </div>

                <div className="rounded-lg border border-rfs-blue/20 bg-rfs-white p-6 dark:border-rfs-blue/30 dark:bg-rfs-darkBlue/60">
                  <h3 className="text-xl font-bold text-rfs-darkBlue dark:text-rfs-white">F5Data LTDA</h3>
                  <p className="text-sm text-rfs-black/60 dark:text-rfs-white/60 mb-4">Consultor BI</p>
                  <p className="text-rfs-black/70 dark:text-rfs-white/70">
                    Consultoria em projetos de Business Intelligence, implementação de soluções de análise de dados,
                    desenvolvimento de modelos de dados e integração de sistemas com ferramentas de automação.
                  </p>
                </div>

                <div className="rounded-lg border border-rfs-blue/20 bg-rfs-white p-6 dark:border-rfs-blue/30 dark:bg-rfs-darkBlue/60">
                  <h3 className="text-xl font-bold text-rfs-darkBlue dark:text-rfs-white">FireDev IT Solution</h3>
                  <p className="text-sm text-rfs-black/60 dark:text-rfs-white/60 mb-4">Analista de BI</p>
                  <p className="text-rfs-black/70 dark:text-rfs-white/70">
                    Desenvolvimento de soluções de BI, implementação de projetos de automação com n8n e integração de
                    algoritmos de IA para análise preditiva e processamento de dados.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
