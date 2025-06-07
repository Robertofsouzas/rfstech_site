"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, Clock } from "lucide-react"

interface Post {
  id: number
  title: string
  excerpt: string
  image: string
  date: string
  readTime: number
  categories: string[]
}

interface RelatedPostsProps {
  currentPostId: number
  currentCategories: string[]
  allPosts: Post[]
}

export function RelatedPosts({
  currentPostId,
  currentCategories,
  allPosts
}: RelatedPostsProps) {
  // Encontrar posts relacionados baseado nas categorias
  const relatedPosts = allPosts
    .filter(post => 
      post.id !== currentPostId && // Excluir o post atual
      post.categories.some(category => 
        currentCategories.includes(category)
      )
    )
    .slice(0, 3) // Limitar a 3 posts relacionados

  // Formatar data
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  if (relatedPosts.length === 0) return null

  return (
    <section className="py-12 border-t border-rfs-blue/20 dark:border-rfs-blue/30">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold tracking-tighter text-rfs-darkBlue dark:text-rfs-white mb-8">
          Posts Relacionados
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {relatedPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-rfs-blue/20 bg-white dark:border-rfs-blue/30 dark:bg-rfs-darkBlue"
            >
              <Link href={`/blog/${post.id}`} className="relative aspect-video overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              </Link>
              <div className="flex-1 p-6">
                <h3 className="mb-2 text-xl font-semibold tracking-tight text-rfs-darkBlue dark:text-rfs-white">
                  <Link href={`/blog/${post.id}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h3>
                <p className="mb-4 text-sm text-rfs-black/70 dark:text-rfs-white/70 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="mt-auto flex items-center text-sm text-rfs-black/60 dark:text-rfs-white/60">
                  <Calendar className="mr-1 h-4 w-4" />
                  {formatDate(post.date)}
                  <Clock className="ml-4 mr-1 h-4 w-4" />
                  {post.readTime} min
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
} 