"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, Clock, Tag, Search } from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { NewsletterForm } from "@/components/newsletter-form"
import { Pagination } from "@/components/pagination"
import { HeroCarousel } from "@/components/hero-carousel"
import { blogPosts } from "@/config/blog"

// Todas as categorias únicas
const allCategories = Array.from(
  new Set(blogPosts.flatMap(post => post.categories))
)

// Número de posts por página
const POSTS_PER_PAGE = 6

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  // Filtrar posts baseado na busca e categoria
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory ? post.categories.includes(selectedCategory) : true
    return matchesSearch && matchesCategory
  })

  // Calcular total de páginas
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)

  // Obter posts da página atual
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  // Formatar data
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  // Resetar página ao mudar filtros
  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Carousel */}
        <HeroCarousel />

        <section className="w-full py-12 md:py-24 bg-gradient-to-b from-rfs-lightBlue to-rfs-white dark:from-rfs-darkBlue dark:to-rfs-darkBlue/90">
          <div className="container px-4 md:px-6">
            {/* Barra de pesquisa e filtros */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                <Input
                  type="search"
                  placeholder="Buscar artigos..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryChange(null)}
                  className={selectedCategory === null ? "bg-rfs-blue text-white" : ""}
                >
                  Todos
                </Button>
                {allCategories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleCategoryChange(category)}
                    className={selectedCategory === category ? "bg-rfs-blue text-white" : ""}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Lista de posts */}
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {currentPosts.map((post) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="group relative flex flex-col overflow-hidden rounded-lg border border-rfs-blue/20 bg-white dark:border-rfs-blue/30 dark:bg-rfs-darkBlue"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  
                  <div className="flex-1 p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.categories.map((category) => (
                        <Badge
                          key={category}
                          variant="secondary"
                          className="bg-rfs-blue/10 text-rfs-blue dark:bg-rfs-blue/20 dark:text-rfs-lightBlue"
                        >
                          <Tag className="mr-1 h-3 w-3" />
                          {category}
                        </Badge>
                      ))}
                    </div>
                    
                    <h2 className="mb-2 text-xl font-semibold tracking-tight text-rfs-darkBlue dark:text-rfs-white">
                      <Link href={`/blog/${post.id}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </h2>
                    
                    <p className="mb-4 text-sm text-rfs-black/70 dark:text-rfs-white/70 line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="relative h-8 w-8 rounded-full overflow-hidden">
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="text-sm">
                          <p className="font-medium text-rfs-darkBlue dark:text-rfs-white">
                            {post.author.name}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm text-rfs-black/60 dark:text-rfs-white/60">
                        <Calendar className="mr-1 h-4 w-4" />
                        {formatDate(post.date)}
                        <Clock className="ml-4 mr-1 h-4 w-4" />
                        {post.readTime} min
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Mensagem quando não há resultados */}
            {filteredPosts.length === 0 && (
              <div className="mt-12 text-center">
                <p className="text-rfs-black/70 dark:text-rfs-white/70">
                  Nenhum artigo encontrado com os filtros atuais.
                </p>
              </div>
            )}

            {/* Paginação */}
            {filteredPosts.length > 0 && (
              <div className="mt-12">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        </section>

        {/* Newsletter */}
        <NewsletterForm />
      </main>
      <SiteFooter />
    </div>
  )
} 