"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, BarChart2, Brain, Workflow } from "lucide-react"
import { Button } from "@/components/ui/button"
import React from "react"

const slides = [
  {
    id: 1,
    title: "Business Intelligence",
    description: "Transforme dados em insights estratégicos com nossas soluções de BI",
    gradient: "from-blue-600/50 to-purple-600/50",
    icon: BarChart2,
    color: "text-blue-500"
  },
  {
    id: 2,
    title: "Inteligência Artificial",
    description: "Potencialize seu negócio com soluções inteligentes e inovadoras",
    gradient: "from-emerald-600/50 to-blue-600/50",
    icon: Brain,
    color: "text-emerald-500"
  },
  {
    id: 3,
    title: "Automação de Processos",
    description: "Otimize operações e aumente a produtividade com automação inteligente",
    gradient: "from-orange-600/50 to-red-600/50",
    icon: Workflow,
    color: "text-orange-500"
  }
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 5000)
    }

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const handlePrevSlide = () => {
    setIsAutoPlaying(false)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const handleNextSlide = () => {
    setIsAutoPlaying(false)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  return (
    <div className="relative h-[70vh] min-h-[500px] w-full overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].gradient} opacity-20`} />
          
          <div className="absolute inset-0 flex items-center">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] items-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="space-y-4"
                >
                  <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none text-white">
                    {slides[currentSlide].title}
                  </h2>
                  <p className="text-xl text-white/90 md:text-2xl max-w-[600px]">
                    {slides[currentSlide].description}
                  </p>
                  <div className="flex gap-4">
                    <Button
                      size="lg"
                      className="bg-white text-gray-900 hover:bg-gray-100"
                    >
                      Saiba Mais
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white/10"
                    >
                      Fale Conosco
                    </Button>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="relative hidden lg:block"
                >
                  <div className="relative h-[400px] w-[400px]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      {React.createElement(slides[currentSlide].icon, {
                        className: "w-64 h-64 text-white/20"
                      })}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-2xl" />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controles do Carrossel */}
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePrevSlide}
          className="h-12 w-12 rounded-full bg-black/20 text-white hover:bg-black/40 backdrop-blur-sm"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleNextSlide}
          className="h-12 w-12 rounded-full bg-black/20 text-white hover:bg-black/40 backdrop-blur-sm"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Indicadores */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsAutoPlaying(false)
              setCurrentSlide(index)
            }}
            className={`h-2 transition-all duration-300 ${
              index === currentSlide
                ? "w-8 bg-white"
                : "w-2 bg-white/50 hover:bg-white/75"
            } rounded-full`}
          />
        ))}
      </div>
    </div>
  )
} 