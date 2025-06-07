"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

import { Button } from "@/components/ui/button"

// Interface para os depoimentos
interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  image: string
  content: string
}

// Dados de exemplo para depoimentos
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "João Silva",
    role: "Gerente de BI",
    company: "TechCorp Brasil",
    image: "/images/testimonials/person-1.jpg",
    content: "A implementação dos dashboards da RFStech transformou completamente nossa análise de dados. Conseguimos visualizar tendências que antes eram impossíveis de perceber e tomar decisões muito mais embasadas. O retorno sobre o investimento foi imediato."
  },
  {
    id: 2,
    name: "Carla Mendes",
    role: "Diretora de Operações",
    company: "Grupo Innovar",
    image: "/images/testimonials/person-2.jpg",
    content: "As automações implementadas pela RFStech nos permitiram reduzir em 70% o tempo gasto em tarefas repetitivas. Nossa equipe agora pode focar em atividades estratégicas, o que resultou em um aumento significativo de produtividade e satisfação dos colaboradores."
  },
  {
    id: 3,
    name: "Pedro Almeida",
    role: "CEO",
    company: "AlphaTech",
    image: "/images/testimonials/person-3.jpg",
    content: "Trabalhar com a RFStech foi uma experiência excepcional. Além da competência técnica indiscutível, a capacidade de entender nossas necessidades de negócio fez toda a diferença. Os insights gerados pelas análises nos ajudaram a identificar novas oportunidades de mercado."
  },
  {
    id: 4,
    name: "Ana Ferreira",
    role: "Gerente de Marketing",
    company: "Nova Digital",
    image: "/images/testimonials/person-4.jpg",
    content: "Os dashboards de marketing criados pela RFStech revolucionaram nossa estratégia digital. Agora conseguimos acompanhar em tempo real o desempenho de nossas campanhas e fazer ajustes rápidos. O ROI de nossas ações de marketing aumentou em mais de 40%."
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="w-full py-12 md:py-24 bg-rfs-lightBlue dark:bg-rfs-darkBlue/80">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 max-w-[800px]">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-rfs-darkBlue dark:text-rfs-white">
              O que nossos clientes dizem
            </h2>
            <p className="text-rfs-black/70 md:text-xl dark:text-rfs-white/70">
              Veja como nossas soluções têm transformado negócios e impulsionado resultados
            </p>
          </div>
        </div>

        <div className="mt-12 relative">
          {/* Desktop layout (3 cards visíveis) */}
          <div className="hidden lg:block">
            <div className="flex gap-6">
              {[
                (currentIndex - 1 + testimonials.length) % testimonials.length,
                currentIndex,
                (currentIndex + 1) % testimonials.length,
              ].map((index, i) => {
                const testimonial = testimonials[index]
                const isCenter = i === 1
                
                return (
                  <motion.div
                    key={testimonial.id}
                    className={`flex-1 ${isCenter ? "scale-105" : "scale-95 opacity-70"}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isCenter ? 1 : 0.7, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="bg-white dark:bg-rfs-darkBlue border border-rfs-blue/20 dark:border-rfs-blue/30 rounded-lg p-6 h-full shadow-md relative flex flex-col">
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-rfs-blue rounded-full p-3 shadow-lg">
                        <Quote className="h-6 w-6 text-white" />
                      </div>
                      
                      <div className="pt-4 flex-grow">
                        <p className="text-rfs-black/80 dark:text-rfs-white/80 italic">
                          "{testimonial.content}"
                        </p>
                      </div>
                      
                      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 flex items-center">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="ml-4">
                          <h4 className="font-semibold text-rfs-darkBlue dark:text-rfs-white">{testimonial.name}</h4>
                          <p className="text-sm text-rfs-black/70 dark:text-rfs-white/70">
                            {testimonial.role}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Mobile layout (1 card por vez) */}
          <div className="lg:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[currentIndex].id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white dark:bg-rfs-darkBlue border border-rfs-blue/20 dark:border-rfs-blue/30 rounded-lg p-6 shadow-md relative flex flex-col"
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-rfs-blue rounded-full p-3 shadow-lg">
                  <Quote className="h-6 w-6 text-white" />
                </div>
                
                <div className="pt-4 flex-grow">
                  <p className="text-rfs-black/80 dark:text-rfs-white/80 italic">
                    "{testimonials[currentIndex].content}"
                  </p>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 flex items-center">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      fill
                      sizes="48px"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-rfs-darkBlue dark:text-rfs-white">{testimonials[currentIndex].name}</h4>
                    <p className="text-sm text-rfs-black/70 dark:text-rfs-white/70">
                      {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navegação */}
          <div className="flex justify-center mt-8 gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full h-10 w-10 border-rfs-blue/30 text-rfs-blue hover:bg-rfs-blue/10 dark:border-rfs-blue/40 dark:text-rfs-lightBlue"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 w-2 p-0 rounded-full ${
                    currentIndex === index 
                      ? "bg-rfs-blue border-rfs-blue" 
                      : "bg-transparent border-rfs-blue/30"
                  }`}
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full h-10 w-10 border-rfs-blue/30 text-rfs-blue hover:bg-rfs-blue/10 dark:border-rfs-blue/40 dark:text-rfs-lightBlue"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
} 