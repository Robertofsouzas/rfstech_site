import Link from "next/link"
import Image from "next/image"
import { BarChart3, ExternalLink, Workflow, Brain, Calendar, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ProjectCardProps {
  title: string
  description: string
  type: "power-bi" | "n8n" | "ai"
  image: string
  slug: string
  date?: string
  client?: string
  demoUrl?: string
}

export function ProjectCard({ 
  title, 
  description, 
  type, 
  image, 
  slug,
  date,
  client,
  demoUrl
}: ProjectCardProps) {
  // Formatar data
  const formattedDate = date ? new Date(date).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'short'
  }) : null

  // Configurar ícone e cor baseado no tipo
  const getTypeConfig = () => {
    switch (type) {
      case "power-bi":
        return {
          icon: <BarChart3 className="h-3 w-3" />,
          label: "Power BI",
          colorClass: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
        }
      case "n8n":
        return {
          icon: <Workflow className="h-3 w-3" />,
          label: "Automação n8n",
          colorClass: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300"
        }
      case "ai":
        return {
          icon: <Brain className="h-3 w-3" />,
          label: "IA",
          colorClass: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300"
        }
      default:
        return {
          icon: <BarChart3 className="h-3 w-3" />,
          label: "Power BI",
          colorClass: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
        }
    }
  }

  const typeConfig = getTypeConfig()

  return (
    <motion.div 
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.97 }}
      className="h-full"
      role="button"
      tabIndex={0}
      aria-label={`Ver detalhes do projeto ${title}`}
    >
      <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-md border border-rfs-blue/20 dark:border-rfs-blue/30 bg-rfs-white dark:bg-rfs-darkBlue">
      <div className="relative aspect-video w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
          <Image
            src={image || "/images/placeholder-project.jpg"}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 hover:scale-110"
            priority={false}
            quality={80}
            loading="lazy"
        />
        <Badge
            className={`absolute top-2 right-2 z-20 ${typeConfig.colorClass}`}
        >
            <div className="flex items-center gap-1">
              {typeConfig.icon}
              <span>{typeConfig.label}</span>
            </div>
          </Badge>
          
          {formattedDate && (
            <div className="absolute bottom-2 left-2 z-20 flex items-center text-xs text-white/90">
              <Calendar className="h-3 w-3 mr-1" />
              {formattedDate}
            </div>
          )}
          
          {client && (
            <div className="absolute bottom-2 right-2 z-20">
              <Badge variant="outline" className="text-white border-white/30 bg-black/30">
                {client}
        </Badge>
      </div>
          )}
        </div>
        
        <CardContent className="p-4 flex-grow">
        <h3 className="font-semibold text-lg mb-2 text-rfs-darkBlue dark:text-rfs-white">{title}</h3>
          <p className="text-sm text-rfs-black/70 dark:text-rfs-white/70 line-clamp-3">{description}</p>
      </CardContent>
        
        <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <Link
          href={`/projetos/${slug}`}
            className="text-sm font-medium text-rfs-blue flex items-center gap-1 hover:underline dark:text-rfs-lightBlue group"
        >
          Ver detalhes
            <ExternalLink className="h-3 w-3 transition-transform group-hover:rotate-45" />
          </Link>
          
          {demoUrl && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="px-2 py-1 h-auto text-xs border-rfs-blue/20 text-rfs-blue hover:bg-rfs-blue/10 dark:border-rfs-blue/30 dark:text-rfs-lightBlue"
                    asChild
                  >
                    <Link href={demoUrl} target="_blank" rel="noopener noreferrer">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      Demo
        </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Visualizar demonstração</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
      </CardFooter>
    </Card>
    </motion.div>
  )
}
