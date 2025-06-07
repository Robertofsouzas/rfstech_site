"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"

export function WhatsAppButton() {
  // Número do WhatsApp (substitua pelo número correto)
  const whatsappNumber = "5511999999999"
  const message = "Olá! Gostaria de saber mais sobre as soluções da RFStech."

  const handleClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      {/* Texto flutuante */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="absolute right-[80px] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-lg dark:bg-gray-800 dark:text-gray-100"
      >
        Fale conosco no WhatsApp!
        <div className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 transform bg-white dark:bg-gray-800" />
      </motion.div>

      {/* Botão */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className="group relative flex h-16 w-16 items-center justify-center"
      >
        {/* Efeito de ping */}
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-25" />
        
        {/* Círculo verde do botão */}
        <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform group-hover:bg-[#20BA5C] group-hover:shadow-xl">
          {/* Ícone oficial do WhatsApp */}
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <g clipPath="url(#clip0_87_101)">
              <path d="M16 4.667c6.276 0 11.333 5.057 11.333 11.333 0 6.276-5.057 11.333-11.333 11.333-2.624 0-5.072-0.872-7.072-2.464l-0.36-0.28-3.184 1.712 0.872-3.36-0.24-0.36C5.205 21.072 4.667 18.592 4.667 16c0-6.276 5.057-11.333 11.333-11.333z" fill="#fff"/>
              <path d="M12.8 10.667c-0.32-0.72-0.656-0.736-0.96-0.752-0.248-0.016-0.528-0.016-0.808-0.016-0.28 0-0.736 0.104-1.12 0.52-0.384 0.416-1.472 1.44-1.472 3.504 0 2.064 1.504 4.064 1.712 4.352 0.208 0.288 2.944 4.704 7.264 6.4 1.016 0.408 1.808 0.648 2.424 0.832 1.016 0.32 1.944 0.272 2.68 0.168 0.816-0.12 2.528-1.032 2.888-2.032 0.36-1 0.36-1.864 0.256-2.032-0.104-0.168-0.4-0.272-0.84-0.48-0.44-0.208-2.608-1.288-3.016-1.432-0.408-0.144-0.704-0.216-0.992 0.224-0.288 0.44-1.136 1.432-1.392 1.72-0.256 0.288-0.512 0.32-0.952 0.112-0.44-0.208-1.856-0.68-3.536-2.16-1.308-1.16-2.192-2.592-2.448-3.032-0.256-0.44-0.028-0.68 0.18-0.888 0.184-0.184 0.408-0.48 0.616-0.72 0.208-0.24 0.28-0.408 0.416-0.672 0.136-0.264 0.072-0.496-0.04-0.704z" fill="#25D366"/>
            </g>
            <defs>
              <clipPath id="clip0_87_101">
                <rect width="32" height="32" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </span>

        <span className="sr-only">Abrir WhatsApp</span>
      </motion.button>
    </motion.div>
  )
} 