import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Shield,
  Star,
  Workflow,
  LineChart,
  PieChart,
  Layers,
  Zap,
} from "lucide-react"
import Image from "next/image"
import { Fade } from "react-awesome-reveal"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Carousel } from "@/components/carousel"
import { ProjectsSection } from "@/components/projects-section"
import { AboutMe } from "@/components/about-me"

export default function Home() {
  // Slides para o carrossel com cores vibrantes, ícones e imagens de fundo contextuais
  const carouselSlides = [
    {
      title: "Dashboards Interativos",
      description: "Visualize seus dados de forma dinâmica e tome decisões baseadas em insights reais",
      color: "#1E90FF", // Dodger Blue
      icon: <BarChart3 className="h-10 w-10 text-white" />,
      backgroundImage: "/images/carousel/dashboard.png",
    },
    {
      title: "Automação Inteligente",
      description: "Otimize processos e elimine tarefas repetitivas com automações personalizadas",
      color: "#00BFFF", // Deep Sky Blue
      icon: <Zap className="h-10 w-10 text-white" />,
      backgroundImage: "/images/carousel/ia.robot.jpeg",
    },
    {
      title: "Fluxo Inteligente",
      description: "Automatize processos e fluxos de trabalho para aumentar a eficiência, reduzir erros manuais",
      color: "#E0E0E0",
      icon: <Workflow className="h-10 w-10 text-gray-700" />,
      backgroundImage: "/images/carousel/n8n_workflow_2.png",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-rfs-lightBlue to-rfs-white dark:from-rfs-darkBlue dark:to-rfs-darkBlue/90">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-rfs-blue text-rfs-white hover:bg-rfs-blue/80 mb-2">
                  Excelência em Business Intelligence e Automação
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-rfs-darkBlue dark:text-rfs-white">
                    RFStech
                  </h1>
                  <p className="max-w-[600px] text-rfs-black/70 md:text-xl dark:text-rfs-white/70">
                    Transformando dados em insights estratégicos e processos em fluxos eficientes
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/projetos" passHref>
                    <Button className="px-8 bg-rfs-blue hover:bg-rfs-blue/90 text-rfs-white">
                      Ver Projetos
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/contato" passHref>
                    <Button
                      variant="outline"
                      className="px-8 border-rfs-blue text-rfs-blue hover:bg-rfs-blue/10 dark:text-rfs-white dark:border-rfs-white"
                    >
                      Contato
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[500px] h-[400px] rounded-lg overflow-hidden shadow-xl">
                  {/* Carrossel com slides coloridos e imagens de fundo contextuais */}
                  <Carousel slides={carouselSlides} autoplayInterval={4000} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <Fade triggerOnce duration={4000}>
          <section className="w-full py-12 md:py-24 bg-rfs-white dark:bg-rfs-darkBlue">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-rfs-darkBlue dark:text-rfs-white">
                    Por que escolher a RFStech?
                  </h2>
                  <p className="max-w-[900px] text-rfs-black/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-rfs-white/70">
                    Combinamos expertise técnica com visão estratégica para entregar soluções de alto valor
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12 mt-12">
                <div className="flex flex-col items-center space-y-4 text-center p-4 rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rfs-blue/10 dark:bg-rfs-blue/20">
                    <Shield className="h-8 w-8 text-rfs-blue" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-rfs-darkBlue dark:text-rfs-white">Confiabilidade</h3>
                    <p className="text-rfs-black/70 dark:text-rfs-white/70">
                      Soluções robustas e seguras, desenvolvidas com as melhores práticas do mercado.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-4 text-center p-4 rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rfs-blue/10 dark:bg-rfs-blue/20">
                    <Star className="h-8 w-8 text-rfs-blue" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-rfs-darkBlue dark:text-rfs-white">Excelência</h3>
                    <p className="text-rfs-black/70 dark:text-rfs-white/70">
                      Compromisso com a qualidade e atenção aos detalhes em cada projeto que desenvolvemos.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-4 text-center p-4 rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rfs-blue/10 dark:bg-rfs-blue/20">
                    <CheckCircle2 className="h-8 w-8 text-rfs-blue" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-rfs-darkBlue dark:text-rfs-white">Resultados</h3>
                    <p className="text-rfs-black/70 dark:text-rfs-white/70">
                      Foco em entregar soluções que geram valor mensurável e impacto real para seu negócio.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Fade>

        {/* About Me Section */}
        <Fade triggerOnce duration={4000}>
          <AboutMe />
        </Fade>

        {/* Services Section */}
        <Fade triggerOnce duration={4000}>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-rfs-lightBlue dark:bg-rfs-darkBlue/80">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-rfs-darkBlue dark:text-rfs-white">
                    Nossos Serviços
                  </h2>
                  <p className="max-w-[900px] text-rfs-black/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-rfs-white/70">
                    Soluções personalizadas para transformar dados em decisões e processos em eficiência
                  </p>
                </div>
              </div>
              <div className="relative mx-auto my-8 h-64 w-full max-w-4xl overflow-hidden rounded-lg shadow-lg md:h-80 lg:h-96">
                <Image
                  src="/images/team-analyzing-data.png"
                  alt="Equipe analisando dados em painéis"
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-500 group-hover:scale-105"
                  priority={false}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 66vw"
                />
              </div>
              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-12 mt-12">
                <div className="flex flex-col space-y-4 rounded-lg border border-rfs-blue/20 bg-rfs-white p-6 dark:border-rfs-blue/30 dark:bg-rfs-darkBlue shadow-sm hover:scale-105 transition-transform duration-300 ease-in-out">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rfs-blue/10 dark:bg-rfs-blue/20">
                      <BarChart3 className="h-6 w-6 text-rfs-blue" />
                    </div>
                    <h3 className="text-xl font-bold text-rfs-darkBlue dark:text-rfs-white">Power BI</h3>
                  </div>
                  <p className="text-rfs-black/70 dark:text-rfs-white/70">
                    Dashboards interativos e relatórios analíticos que transformam seus dados em insights valiosos para
                    tomada de decisões estratégicas.
                  </p>
                  <ul className="space-y-2 text-sm text-rfs-black/70 dark:text-rfs-white/70">
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-rfs-blue" />
                      Modelagem avançada de dados
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-rfs-blue" />
                      Visualizações interativas e responsivas
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-rfs-blue" />
                      Integração com múltiplas fontes de dados
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col space-y-4 rounded-lg border border-rfs-blue/20 bg-rfs-white p-6 dark:border-rfs-blue/30 dark:bg-rfs-darkBlue shadow-sm hover:scale-105 transition-transform duration-300 ease-in-out">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rfs-blue/10 dark:bg-rfs-blue/20">
                      <Workflow className="h-6 w-6 text-rfs-blue" />
                    </div>
                    <h3 className="text-xl font-bold text-rfs-darkBlue dark:text-rfs-white">Automação n8n</h3>
                  </div>
                  <p className="text-rfs-black/70 dark:text-rfs-white/70">
                    Automatize processos e fluxos de trabalho para aumentar a eficiência, reduzir erros manuais e liberar
                    sua equipe para tarefas estratégicas.
                  </p>
                  <ul className="space-y-2 text-sm text-rfs-black/70 dark:text-rfs-white/70">
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-rfs-blue" />
                      Integração com múltiplas APIs e serviços
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-rfs-blue" />
                      Fluxos de trabalho personalizados
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-rfs-blue" />
                      Processamento e transformação de dados
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </Fade>

        {/* Featured Projects */}
        <Fade triggerOnce duration={4000}>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-rfs-white dark:bg-rfs-darkBlue">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-rfs-darkBlue dark:text-rfs-white">
                    Projetos em Destaque
                  </h2>
                  <p className="max-w-[900px] text-rfs-black/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-rfs-white/70">
                    Conheça alguns dos nossos projetos recentes que geraram resultados excepcionais
                  </p>
                </div>
              </div>

              {/* Componente de projetos que usa o store */}
              <ProjectsSection />

              <div className="flex justify-center mt-12">
                <Link href="/projetos" passHref>
                  <Button className="px-8 bg-rfs-blue hover:bg-rfs-blue/90 text-rfs-white">
                    Ver Todos os Projetos
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </Fade>

        {/* Testimonials Section */}
        <Fade triggerOnce duration={4000}>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-rfs-lightBlue dark:bg-rfs-darkBlue/80">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-rfs-darkBlue dark:text-rfs-white">
                    O que nossos clientes dizem
                  </h2>
                  <p className="max-w-[900px] text-rfs-black/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-rfs-white/70">
                    Veja como nossas soluções têm ajudado empresas a alcançar seus objetivos
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
                <div className="flex flex-col justify-between rounded-lg border border-rfs-blue/20 bg-rfs-white p-6 dark:border-rfs-blue/30 dark:bg-rfs-darkBlue shadow-sm hover:scale-105 transition-transform duration-300 ease-in-out">
                  <div className="space-y-4">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current text-rfs-blue" />
                      ))}
                    </div>
                    <p className="text-rfs-black/70 dark:text-rfs-white/70">
                      "Os dashboards desenvolvidos pela RFStech transformaram nossa visão sobre os dados da empresa. Agora
                      tomamos decisões muito mais embasadas e ágeis."
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-rfs-blue/10 dark:border-rfs-blue/20">
                    <p className="font-medium text-rfs-darkBlue dark:text-rfs-white">Carlos Silva</p>
                    <p className="text-sm text-rfs-black/60 dark:text-rfs-white/60">Diretor Financeiro, Empresa ABC</p>
                  </div>
                </div>
                <div className="flex flex-col justify-between rounded-lg border border-rfs-blue/20 bg-rfs-white p-6 dark:border-rfs-blue/30 dark:bg-rfs-darkBlue shadow-sm hover:scale-105 transition-transform duration-300 ease-in-out">
                  <div className="space-y-4">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current text-rfs-blue" />
                      ))}
                    </div>
                    <p className="text-rfs-black/70 dark:text-rfs-white/70">
                      "A automação dos nossos processos com n8n reduziu em 70% o tempo gasto em tarefas manuais. Nossa
                      equipe agora foca no que realmente importa."
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-rfs-blue/10 dark:border-rfs-blue/20">
                    <p className="font-medium text-rfs-darkBlue dark:text-rfs-white">Ana Oliveira</p>
                    <p className="text-sm text-rfs-black/60 dark:text-rfs-white/60">Gerente de Operações, Empresa XYZ</p>
                  </div>
                </div>
                <div className="flex flex-col justify-between rounded-lg border border-rfs-blue/20 bg-rfs-white p-6 dark:border-rfs-blue/30 dark:bg-rfs-darkBlue shadow-sm hover:scale-105 transition-transform duration-300 ease-in-out">
                  <div className="space-y-4">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current text-rfs-blue" />
                      ))}
                    </div>
                    <p className="text-rfs-black/70 dark:text-rfs-white/70">
                      "A equipe da RFStech entendeu perfeitamente nossas necessidades e entregou soluções que superaram
                      nossas expectativas. Profissionalismo impecável."
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-rfs-blue/10 dark:border-rfs-blue/20">
                    <p className="font-medium text-rfs-darkBlue dark:text-rfs-white">Roberto Mendes</p>
                    <p className="text-sm text-rfs-black/60 dark:text-rfs-white/60">CEO, Empresa 123</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Fade>
      </main>
      <SiteFooter />
    </div>
  )
}
