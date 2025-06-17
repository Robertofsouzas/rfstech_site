"use client"

import { motion } from "framer-motion"
import { SocialShare } from "@/components/social-share"
import Image from "next/image"
import { Calendar, Clock } from "lucide-react"
import { formatDate } from "@/lib/utils"

interface BlogPostContentProps {
  post: {
    id: number
    title: string
    excerpt: string
    content: string
    image: string
    date: string
    readTime: number
    categories: string[]
    author: {
      name: string
      avatar: string
      bio: string
    }
  }
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="prose prose-lg dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: post.content }}
    />
  )
}

interface BlogPostSidebarProps {
  post: {
    id: number
    title: string
    excerpt: string
    date: string
    readTime: number
    author: {
      name: string
      avatar: string
      bio: string
    }
  }
}

export function BlogPostSidebar({ post }: BlogPostSidebarProps) {
  return (
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
  )
} 