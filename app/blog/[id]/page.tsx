"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react"
import { motion } from "framer-motion"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RelatedPosts } from "@/components/related-posts"
import { SocialShare } from "@/components/social-share"
import { CommentsSection } from "@/components/comments-section"
import { blogPosts } from "@/config/blog"

// Formatar data
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = blogPosts.find(p => p.id === parseInt(params.id)) || blogPosts[0]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40" />
          <div className="absolute inset-0 flex items-center">
            <div className="container px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl"
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.categories.map((category) => (
                    <Badge
                      key={category}
                      className="bg-rfs-blue/90 text-white"
                    >
                      <Tag className="mr-1 h-3 w-3" />
                      {category}
                    </Badge>
                  ))}
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl/none text-white mb-4">
                  {post.title}
                </h1>
                <p className="text-xl text-white/90 max-w-[700px]">
                  {post.excerpt}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Conteúdo do Post */}
        <section className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_300px]">
              {/* Artigo Principal */}
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="prose prose-lg dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="space-y-8"
              >
                {/* Informações do Autor */}
                <div className="rounded-lg border border-rfs-blue/20 bg-white p-6 dark:border-rfs-blue/30 dark:bg-rfs-darkBlue">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative h-16 w-16 rounded-full overflow-hidden">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-rfs-darkBlue dark:text-rfs-white">
                        {post.author.name}
                      </h3>
                      <div className="flex items-center text-sm text-rfs-black/60 dark:text-rfs-white/60">
                        <Calendar className="mr-1 h-4 w-4" />
                        {formatDate(post.date)}
                        <Clock className="ml-4 mr-1 h-4 w-4" />
                        {post.readTime} min
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-rfs-black/70 dark:text-rfs-white/70">
                    {post.author.bio}
                  </p>
                </div>

                {/* Compartilhar */}
                <SocialShare
                  url={typeof window !== "undefined" ? window.location.href : ""}
                  title={post.title}
                  description={post.excerpt}
                />
              </motion.div>
            </div>

            {/* Voltar para o Blog */}
            <div className="mt-12">
              <Link href="/blog" className="inline-flex">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Voltar para o Blog
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Posts Relacionados */}
        <RelatedPosts
          currentPostId={post.id}
          currentCategories={post.categories}
          allPosts={blogPosts}
        />

        {/* Comentários */}
        <CommentsSection postId={post.id} />
      </main>
      <SiteFooter />
    </div>
  )
} 