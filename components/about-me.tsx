"use client"

import { BarChart3, Brain, Code, Database, FileSpreadsheet, Workflow } from "lucide-react"
import { motion } from "framer-motion"

export function AboutMe() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-rfs-white dark:bg-rfs-darkBlue">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-rfs-darkBlue dark:text-rfs-white">
              Sobre Mim
            </h2>
            <p className="max-w-[900px] text-rfs-black/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-rfs-white/70">
              Analista de Dados BI | Transformando Dados em Estratégias com Impacto Tangível
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-4xl space-y-8">
          <div className="prose prose-lg dark:prose-invert max-w-none text-rfs-black/80 dark:text-rfs-white/80">
            <p>
              Com mais de 4 anos de experiência em Business Intelligence, sou especializado em transformar dados brutos
              em insights estratégicos que impulsionam decisões corporativas. Minha expertise abrange ferramentas como
              Power BI, Microsoft Fabric, Databricks, Pentaho, SQL e Python, com foco em ETL, modelagem de dados,
              automação de processos e governança de dados.
            </p>

            <p>
              Tenho orgulho de ter atuado em empresas de grande porte, como a Petrobras, e em consultorias de TI
              renomadas, como F5Data LTDA e FireDev IT Solution. Minha trajetória inclui liderar projetos de BI desde o
              levantamento de requisitos até a implementação de soluções robustas de análise de dados, entregando valor
              real para as organizações.
            </p>

            <p>
              Além disso, possuo experiência avançada em automação de processos com n8n, criando fluxos de trabalho
              inteligentes que otimizam operações e eliminam tarefas repetitivas. Minha expertise em integração de
              sistemas permite conectar diferentes plataformas e APIs, criando ecossistemas de dados coesos e
              eficientes.
            </p>

            <p>
              Na área de Inteligência Artificial, desenvolvo soluções que combinam análise de dados tradicional com
              algoritmos de IA para identificar padrões, prever tendências e gerar recomendações automatizadas. Trabalho
              com modelos de machine learning e processamento de linguagem natural para extrair insights mais profundos
              dos dados e criar dashboards inteligentes com capacidades preditivas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <motion.div
              whileTap={{ scale: 0.97 }}
              className="flex flex-col items-center space-y-3 p-6 rounded-lg border border-rfs-blue/20 bg-rfs-white dark:border-rfs-blue/30 dark:bg-rfs-darkBlue/60 hover:scale-105 transition-transform duration-300 ease-in-out"
              role="button"
              tabIndex={0}
              aria-label="Business Intelligence: Desenvolvimento de dashboards interativos e relatórios analíticos com Power BI, Microsoft Fabric e Pentaho."
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rfs-blue/10 dark:bg-rfs-blue/20">
                <BarChart3 className="h-6 w-6 text-rfs-blue" />
              </div>
              <h3 className="text-xl font-bold text-rfs-darkBlue dark:text-rfs-white">Business Intelligence</h3>
              <p className="text-center text-rfs-black/70 dark:text-rfs-white/70">
                Desenvolvimento de dashboards interativos e relatórios analíticos com Power BI, Microsoft Fabric e
                Pentaho.
              </p>
            </motion.div>

            <motion.div
              whileTap={{ scale: 0.97 }}
              className="flex flex-col items-center space-y-3 p-6 rounded-lg border border-rfs-blue/20 bg-rfs-white dark:border-rfs-blue/30 dark:bg-rfs-darkBlue/60 hover:scale-105 transition-transform duration-300 ease-in-out"
              role="button"
              tabIndex={0}
              aria-label="Automação com n8n: Criação de fluxos de trabalho automatizados e integração entre sistemas com a plataforma n8n."
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rfs-blue/10 dark:bg-rfs-blue/20">
                <Workflow className="h-6 w-6 text-rfs-blue" />
              </div>
              <h3 className="text-xl font-bold text-rfs-darkBlue dark:text-rfs-white">Automação com n8n</h3>
              <p className="text-center text-rfs-black/70 dark:text-rfs-white/70">
                Criação de fluxos de trabalho automatizados e integração entre sistemas com a plataforma n8n.
              </p>
            </motion.div>

            <motion.div
              whileTap={{ scale: 0.97 }}
              className="flex flex-col items-center space-y-3 p-6 rounded-lg border border-rfs-blue/20 bg-rfs-white dark:border-rfs-blue/30 dark:bg-rfs-darkBlue/60 hover:scale-105 transition-transform duration-300 ease-in-out"
              role="button"
              tabIndex={0}
              aria-label="Inteligência Artificial: Implementação de soluções de IA para análise preditiva e processamento de linguagem natural."
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rfs-blue/10 dark:bg-rfs-blue/20">
                <Brain className="h-6 w-6 text-rfs-blue" />
              </div>
              <h3 className="text-xl font-bold text-rfs-darkBlue dark:text-rfs-white">Inteligência Artificial</h3>
              <p className="text-center text-rfs-black/70 dark:text-rfs-white/70">
                Implementação de soluções de IA para análise preditiva e processamento de linguagem natural.
              </p>
            </motion.div>

            <motion.div
              whileTap={{ scale: 0.97 }}
              className="flex flex-col items-center space-y-3 p-6 rounded-lg border border-rfs-blue/20 bg-rfs-white dark:border-rfs-blue/30 dark:bg-rfs-darkBlue/60 hover:scale-105 transition-transform duration-300 ease-in-out"
              role="button"
              tabIndex={0}
              aria-label="Modelagem de Dados: Desenvolvimento de modelos dimensionais e relacionais para análise eficiente de dados."
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rfs-blue/10 dark:bg-rfs-blue/20">
                <Database className="h-6 w-6 text-rfs-blue" />
              </div>
              <h3 className="text-xl font-bold text-rfs-darkBlue dark:text-rfs-white">Modelagem de Dados</h3>
              <p className="text-center text-rfs-black/70 dark:text-rfs-white/70">
                Desenvolvimento de modelos dimensionais e relacionais para análise eficiente de dados.
              </p>
            </motion.div>

            <motion.div
              whileTap={{ scale: 0.97 }}
              className="flex flex-col items-center space-y-3 p-6 rounded-lg border border-rfs-blue/20 bg-rfs-white dark:border-rfs-blue/30 dark:bg-rfs-darkBlue/60 hover:scale-105 transition-transform duration-300 ease-in-out"
              role="button"
              tabIndex={0}
              aria-label="Desenvolvimento: Programação em SQL, Python e DAX para ETL, análise de dados e automação de processos."
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rfs-blue/10 dark:bg-rfs-blue/20">
                <Code className="h-6 w-6 text-rfs-blue" />
              </div>
              <h3 className="text-xl font-bold text-rfs-darkBlue dark:text-rfs-white">Desenvolvimento</h3>
              <p className="text-center text-rfs-black/70 dark:text-rfs-white/70">
                Programação em SQL, Python e DAX para ETL, análise de dados e automação de processos.
              </p>
            </motion.div>

            <motion.div
              whileTap={{ scale: 0.97 }}
              className="flex flex-col items-center space-y-3 p-6 rounded-lg border border-rfs-blue/20 bg-rfs-white dark:border-rfs-blue/30 dark:bg-rfs-darkBlue/60 hover:scale-105 transition-transform duration-300 ease-in-out"
              role="button"
              tabIndex={0}
              aria-label="Governança de Dados: Implementação de práticas de qualidade e governança de dados para garantir consistência e confiabilidade."
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rfs-blue/10 dark:bg-rfs-blue/20">
                <FileSpreadsheet className="h-6 w-6 text-rfs-blue" />
              </div>
              <h3 className="text-xl font-bold text-rfs-darkBlue dark:text-rfs-white">Governança de Dados</h3>
              <p className="text-center text-rfs-black/70 dark:text-rfs-white/70">
                Implementação de práticas de qualidade e governança de dados para garantir consistência e
                confiabilidade.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
