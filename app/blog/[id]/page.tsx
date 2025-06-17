import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RelatedPosts } from "@/components/related-posts"
import { CommentsSection } from "@/components/comments-section"
import { BlogPostContent, BlogPostSidebar } from "@/components/blog-post-content"
import { blogPosts } from "@/config/blog"

// Formatar data
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function BlogPostPage({ params }: Props) {
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
              <div className="max-w-4xl">
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
              </div>
            </div>
          </div>
        </section>

        {/* Conteúdo do Post */}
        <section className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_300px]">
              {/* Artigo Principal */}
              <BlogPostContent post={post} />

              {/* Sidebar */}
              <BlogPostSidebar post={post} />
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