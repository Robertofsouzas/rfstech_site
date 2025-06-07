"use client"

import { useEffect, useState } from "react"
import { BarChart3, PlusCircle, Workflow, Brain, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import { ProjectCard } from "@/components/project-card"
import { useProjectStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { motion, AnimatePresence } from "framer-motion"

const PROJECTS_PER_PAGE = 8

export function ProjectsSection() {
  const { getUserProjects, getProjectsByType } = useProjectStore()
  const [projects, setProjects] = useState<any[]>([])
  const [filteredProjects, setFilteredProjects] = useState<any[]>([])
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [isClient, setIsClient] = useState(false)
  const [hasUserProjects, setHasUserProjects] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [sortBy, setSortBy] = useState("newest")

  // Aplica filtros, ordenação e paginação
  const applyFilters = (allProjects: any[], filter: string, sort: string, page: number) => {
    let filtered = [...allProjects]
    
    // Filtrar por tipo
    if (filter !== "all") {
      filtered = filtered.filter((p) => p.type === filter)
    }
    
    // Ordenar projetos
    if (sort === "newest") {
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    } else if (sort === "oldest") {
      filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    } else if (sort === "a-z") {
      filtered.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sort === "z-a") {
      filtered.sort((a, b) => b.title.localeCompare(a.title))
    }
    
    // Calcular total de páginas
    const total = Math.ceil(filtered.length / PROJECTS_PER_PAGE)
    setTotalPages(total || 1)
    
    // Garantir que a página atual é válida
    const validPage = Math.min(Math.max(1, page), total || 1)
    if (validPage !== page) {
      setCurrentPage(validPage)
    }
    
    // Aplicar paginação
    const start = (validPage - 1) * PROJECTS_PER_PAGE
    const paginatedProjects = filtered.slice(start, start + PROJECTS_PER_PAGE)
    
    return paginatedProjects
  }

  useEffect(() => {
    setIsClient(true)
    // Obter todos os projetos adicionados pelo usuário
    const userProjects = getUserProjects()
    setProjects(userProjects)
    setHasUserProjects(userProjects.length > 0)

    // Adicionar data aos projetos (se não tiver)
    const projectsWithDates = userProjects.map(p => ({
      ...p,
      date: p.date || new Date().toISOString()
    }))
    
    setProjects(projectsWithDates)
    
    // Aplicar filtros iniciais
    const filtered = applyFilters(projectsWithDates, activeFilter, sortBy, currentPage)
    setFilteredProjects(filtered)
  }, [getUserProjects])

  // Atualizar quando os filtros forem alterados
  useEffect(() => {
    if (projects.length > 0) {
      const filtered = applyFilters(projects, activeFilter, sortBy, currentPage)
      setFilteredProjects(filtered)
    }
  }, [activeFilter, sortBy, currentPage, projects])

  // Atualizar paginação quando o filtro mudar
  useEffect(() => {
    setCurrentPage(1)
  }, [activeFilter, sortBy])

  // Não renderizar nada durante a hidratação para evitar erros de SSR
  if (!isClient) {
    return null
  }

  // Se não houver projetos adicionados pelo usuário, mostrar mensagem e botão para adicionar
  if (!hasUserProjects) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-6 text-rfs-black/60 dark:text-rfs-white/60">
          <p className="mb-2">Nenhum projeto em destaque encontrado.</p>
          <p>Adicione projetos na área administrativa para exibi-los aqui.</p>
        </div>
        <Link href="/admin?tab=projects" passHref>
          <Button className="bg-rfs-blue hover:bg-rfs-blue/90 text-rfs-white flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Adicionar Projetos
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="mt-12 space-y-8">
      {/* Filtros e Ordenação */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-rfs-lightBlue/50 dark:bg-rfs-darkBlue/50 rounded-lg border border-rfs-blue/10 dark:border-rfs-blue/20">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter("all")}
            className={activeFilter === "all" ? "bg-rfs-blue text-white" : "border-rfs-blue/20 text-rfs-darkBlue dark:text-rfs-white"}
          >
            Todos
          </Button>
          <Button
            variant={activeFilter === "power-bi" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter("power-bi")}
            className={activeFilter === "power-bi" ? "bg-rfs-blue text-white" : "border-rfs-blue/20 text-rfs-darkBlue dark:text-rfs-white"}
          >
            <BarChart3 className="mr-1 h-4 w-4" />
              Power BI
          </Button>
          <Button
            variant={activeFilter === "n8n" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter("n8n")}
            className={activeFilter === "n8n" ? "bg-rfs-blue text-white" : "border-rfs-blue/20 text-rfs-darkBlue dark:text-rfs-white"}
          >
            <Workflow className="mr-1 h-4 w-4" />
            Automação n8n
          </Button>
          <Button
            variant={activeFilter === "ai" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter("ai")}
            className={activeFilter === "ai" ? "bg-rfs-blue text-white" : "border-rfs-blue/20 text-rfs-darkBlue dark:text-rfs-white"}
          >
            <Brain className="mr-1 h-4 w-4" />
            IA
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-rfs-darkBlue dark:text-rfs-white" />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] bg-white dark:bg-rfs-darkBlue border-rfs-blue/20 dark:border-rfs-blue/30">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Mais recentes</SelectItem>
              <SelectItem value="oldest">Mais antigos</SelectItem>
              <SelectItem value="a-z">A-Z</SelectItem>
              <SelectItem value="z-a">Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Contador de resultados */}
      <div className="text-sm text-rfs-black/70 dark:text-rfs-white/70">
        {activeFilter === "all" 
          ? `Mostrando ${filteredProjects.length} de ${projects.length} projetos`
          : `Mostrando ${filteredProjects.length} ${
              activeFilter === "power-bi" ? "projetos Power BI" : 
              activeFilter === "n8n" ? "projetos de Automação" : 
              "projetos de IA"
            }`
        }
      </div>

      {/* Grid de Projetos */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div 
            key={`${activeFilter}-${sortBy}-${currentPage}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  type={project.type}
                  image={project.image}
                  slug={project.slug}
                />
              </motion.div>
              ))}
          </motion.div>
        </AnimatePresence>
        
        {/* Mensagem de nenhum resultado */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-rfs-black/60 dark:text-rfs-white/60">
              Nenhum projeto encontrado com os filtros atuais.
            </p>
          </div>
        )}
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="h-8 w-8 border-rfs-blue/20 dark:border-rfs-blue/30"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(i + 1)}
                  className={`h-8 w-8 p-0 ${
                    currentPage === i + 1 
                      ? "bg-rfs-blue text-white" 
                      : "border-rfs-blue/20 text-rfs-darkBlue dark:text-rfs-white"
                  }`}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="h-8 w-8 border-rfs-blue/20 dark:border-rfs-blue/30"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            </div>
          </div>
        )}
    </div>
  )
}
