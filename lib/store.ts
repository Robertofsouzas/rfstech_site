"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export type ProjectType = "power-bi" | "n8n"

// Modificar a interface Project para incluir embedUrl e um flag para projetos padrão
export interface Project {
  id: string
  title: string
  slug: string
  type: ProjectType
  description: string
  fullDescription: string
  date: string
  image: string
  createdAt: string
  embedUrl?: string // URL para incorporação de relatórios Power BI ou fluxos n8n
  height?: string // Altura do iframe para relatórios incorporados
  isDefault?: boolean // Flag para identificar projetos padrão
}

interface ProjectStore {
  projects: Project[]
  addProject: (project: Omit<Project, "id" | "createdAt" | "isDefault">) => void
  removeProject: (id: string) => void
  updateProject: (id: string, project: Partial<Project>) => void
  getProjectsByType: (type: ProjectType) => Project[]
  getUserProjects: () => Project[] // Nova função para obter apenas projetos adicionados pelo usuário
}

// Atualizar os projetos padrão para incluir o flag isDefault
const defaultProjects: Project[] = [
  {
    id: "1",
    title: "Dashboard Financeiro",
    slug: "dashboard-financeiro",
    type: "power-bi",
    description: "Análise completa de indicadores financeiros com visualizações interativas.",
    fullDescription:
      "Dashboard completo para análise de indicadores financeiros, incluindo receitas, despesas, fluxo de caixa e projeções.",
    date: "2023-03-10",
    image: "/placeholder.svg?height=200&width=300",
    createdAt: "2023-03-10T10:00:00Z",
    embedUrl:
      "https://app.powerbi.com/view?r=eyJrIjoiMDc5ODhhOTgtMTVlYi00MjIzLWI3YzQtZGE5YmI5MjZkNTRiIiwidCI6IjA4YmY1YzEwLTk2MjAtNGMwYy1iZTliLTI5YmM0MGQzYzIxNiIsImMiOjh9",
    height: "600",
    isDefault: true,
  },
  {
    id: "2",
    title: "Análise de Marketing",
    slug: "analise-marketing",
    type: "power-bi",
    description: "Monitoramento de campanhas e métricas de desempenho em tempo real.",
    fullDescription: "Dashboard para monitoramento de campanhas de marketing e métricas de desempenho em tempo real.",
    date: "2023-06-22",
    image: "/placeholder.svg?height=200&width=300",
    createdAt: "2023-06-22T14:30:00Z",
    embedUrl:
      "https://app.powerbi.com/view?r=eyJrIjoiMDc5ODhhOTgtMTVlYi00MjIzLWI3YzQtZGE5YmI5MjZkNTRiIiwidCI6IjA4YmY1YzEwLTk2MjAtNGMwYy1iZTliLTI5YmM0MGQzYzIxNiIsImMiOjh9",
    height: "600",
    isDefault: true,
  },
  {
    id: "3",
    title: "Dashboard RH",
    slug: "dashboard-rh",
    type: "power-bi",
    description: "Análise de indicadores de recursos humanos e desempenho de equipes.",
    fullDescription:
      "Análise de indicadores de recursos humanos e desempenho de equipes, incluindo turnover e satisfação.",
    date: "2023-08-14",
    image: "/placeholder.svg?height=200&width=300",
    createdAt: "2023-08-14T09:15:00Z",
    isDefault: true,
  },
  {
    id: "4",
    title: "Dashboard Operacional",
    slug: "dashboard-operacional",
    type: "power-bi",
    description: "Monitoramento em tempo real de métricas operacionais críticas.",
    fullDescription: "Monitoramento em tempo real de métricas operacionais críticas para identificar gargalos.",
    date: "2023-11-05",
    image: "/placeholder.svg?height=200&width=300",
    createdAt: "2023-11-05T16:45:00Z",
    isDefault: true,
  },
  {
    id: "5",
    title: "Automação de Vendas",
    slug: "automacao-vendas",
    type: "n8n",
    description: "Fluxo de trabalho automatizado para processamento de pedidos e notificações.",
    fullDescription:
      "Fluxo de trabalho automatizado para processamento de pedidos, integração com sistemas de pagamento e envio de notificações.",
    date: "2023-05-15",
    image: "/placeholder.svg?height=200&width=300",
    createdAt: "2023-05-15T11:20:00Z",
    isDefault: true,
  },
  {
    id: "6",
    title: "Integração CRM",
    slug: "integracao-crm",
    type: "n8n",
    description: "Automação de fluxos entre sistemas CRM e outras plataformas.",
    fullDescription: "Automação de fluxos entre sistemas CRM e outras plataformas, sincronizando dados de clientes.",
    date: "2023-07-08",
    image: "/placeholder.svg?height=200&width=300",
    createdAt: "2023-07-08T13:40:00Z",
    isDefault: true,
  },
  {
    id: "7",
    title: "Automação de E-mails",
    slug: "automacao-emails",
    type: "n8n",
    description: "Sistema automatizado de envio de e-mails baseado em gatilhos específicos.",
    fullDescription:
      "Sistema automatizado de envio de e-mails baseado em gatilhos específicos, como ações de usuários.",
    date: "2023-09-29",
    image: "/placeholder.svg?height=200&width=300",
    createdAt: "2023-09-29T15:10:00Z",
    isDefault: true,
  },
]

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set, get) => ({
      projects: defaultProjects,
      addProject: (project) => {
        const newProject = {
          ...project,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          isDefault: false, // Projetos adicionados pelo usuário não são padrão
        }
        set((state) => ({
          projects: [...state.projects, newProject],
        }))
      },
      removeProject: (id) => {
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id),
        }))
      },
      updateProject: (id, updatedProject) => {
        set((state) => ({
          projects: state.projects.map((project) => (project.id === id ? { ...project, ...updatedProject } : project)),
        }))
      },
      getProjectsByType: (type) => {
        return get().projects.filter((project) => project.type === type)
      },
      getUserProjects: () => {
        // Retorna apenas os projetos que não são padrão (adicionados pelo usuário)
        return get().projects.filter((project) => !project.isDefault)
      },
    }),
    {
      name: "rfstech-projects-storage",
    },
  ),
)
