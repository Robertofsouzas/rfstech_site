"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MessageSquare, Send, Loader2 } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

interface Comment {
  id: number
  author: {
    name: string
    avatar: string
  }
  content: string
  date: string
  likes: number
}

interface CommentsProps {
  postId: number
}

// Dados de exemplo para comentários
const exampleComments: Comment[] = [
  {
    id: 1,
    author: {
      name: "João Silva",
      avatar: "/images/avatars/joao.jpg"
    },
    content: "Excelente artigo! As dicas sobre otimização de performance foram muito úteis.",
    date: "2024-03-15T10:30:00",
    likes: 5
  },
  {
    id: 2,
    author: {
      name: "Maria Santos",
      avatar: "/images/avatars/maria.jpg"
    },
    content: "Adorei a abordagem prática. Já estou aplicando algumas dessas técnicas no meu trabalho.",
    date: "2024-03-15T11:15:00",
    likes: 3
  }
]

export function CommentsSection({ postId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>(exampleComments)
  const [newComment, setNewComment] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setIsLoading(true)

    try {
      // Aqui você pode adicionar a lógica para enviar o comentário para seu backend
      await new Promise(resolve => setTimeout(resolve, 1000))

      const comment: Comment = {
        id: comments.length + 1,
        author: {
          name: "Usuário Anônimo",
          avatar: "/images/avatars/default.jpg"
        },
        content: newComment,
        date: new Date().toISOString(),
        likes: 0
      }

      setComments(prev => [comment, ...prev])
      setNewComment("")

      toast({
        title: "Comentário enviado!",
        description: "Seu comentário foi publicado com sucesso.",
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Erro ao enviar comentário",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <section className="py-12 border-t border-rfs-blue/20 dark:border-rfs-blue/30">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold tracking-tighter text-rfs-darkBlue dark:text-rfs-white mb-8 flex items-center">
          <MessageSquare className="mr-2 h-5 w-5" />
          Comentários ({comments.length})
        </h2>

        {/* Formulário de Comentário */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-12"
        >
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <Textarea
              placeholder="Deixe seu comentário..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px] resize-none"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading || !newComment.trim()}
              className="bg-rfs-blue hover:bg-rfs-blue/90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Enviar Comentário
                </>
              )}
            </Button>
          </form>
        </motion.div>

        {/* Lista de Comentários */}
        <div className="space-y-6">
          {comments.map((comment, index) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex gap-4 p-4 rounded-lg bg-white dark:bg-rfs-darkBlue border border-rfs-blue/20 dark:border-rfs-blue/30"
            >
              <div className="flex-shrink-0">
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                  <Image
                    src={comment.author.avatar}
                    alt={comment.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-rfs-darkBlue dark:text-rfs-white">
                    {comment.author.name}
                  </h3>
                  <time className="text-sm text-rfs-black/60 dark:text-rfs-white/60">
                    {formatDate(comment.date)}
                  </time>
                </div>
                <p className="text-rfs-black/80 dark:text-rfs-white/80">
                  {comment.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 