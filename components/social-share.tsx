"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Share2, Copy, Facebook, Twitter, Linkedin, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { ShareByEmail } from "@/components/share-by-email"

interface SocialShareProps {
  url: string
  title: string
  description: string
}

export function SocialShare({ url, title, description }: SocialShareProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleCopyLink = async () => {
    setIsLoading(true)
    try {
      await navigator.clipboard.writeText(url)
      toast({
        title: "Link copiado!",
        description: "O link foi copiado para sua área de transferência.",
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Erro ao copiar link",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const shareLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`,
      color: "bg-[#1877F2] hover:bg-[#1877F2]/90"
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      color: "bg-[#1DA1F2] hover:bg-[#1DA1F2]/90"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`,
      color: "bg-[#0A66C2] hover:bg-[#0A66C2]/90"
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title}\n\n${description}\n\n${url}`)}`,
      color: "bg-[#25D366] hover:bg-[#25D366]/90"
    }
  ]

  return (
    <div className="rounded-lg border border-rfs-blue/20 bg-white p-6 dark:border-rfs-blue/30 dark:bg-rfs-darkBlue">
      <h3 className="font-semibold text-rfs-darkBlue dark:text-rfs-white mb-4 flex items-center">
        <Share2 className="mr-2 h-4 w-4" />
        Compartilhar
      </h3>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-2 gap-2"
      >
        {shareLinks.map((link) => (
          <Button
            key={link.name}
            variant="default"
            size="sm"
            className={`w-full ${link.color} text-white`}
            onClick={() => window.open(link.url, "_blank")}
          >
            <link.icon className="mr-2 h-4 w-4" />
            {link.name}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={handleCopyLink}
          disabled={isLoading}
        >
          <Copy className="mr-2 h-4 w-4" />
          Copiar Link
        </Button>
        <ShareByEmail
          postTitle={title}
          postUrl={url}
          postExcerpt={description}
        />
      </motion.div>
      <p className="mt-4 text-xs text-rfs-black/60 dark:text-rfs-white/60 text-center">
        Ajude-nos a compartilhar conhecimento!
      </p>
    </div>
  )
} 