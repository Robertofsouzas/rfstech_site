"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CarouselProps {
  slides: {
    title: string
    description: string
    color: string
    icon: React.ReactNode
    backgroundImage?: string
  }[]
  autoplayInterval?: number
}

export function Carousel({ slides, autoplayInterval = 5000 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const next = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
  }, [slides.length])

  const prev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length)
  }, [slides.length])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  // Pause autoplay on hover
  const pauseAutoplay = () => setIsAutoPlaying(false)
  const resumeAutoplay = () => setIsAutoPlaying(true)

  // Autoplay functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      next()
    }, autoplayInterval)

    return () => clearInterval(interval)
  }, [next, autoplayInterval, isAutoPlaying])

  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-lg"
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
    >
      <div
        className="flex transition-transform duration-700 ease-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="min-w-full h-full flex-shrink-0 flex items-center justify-center relative">
            {/* Background Image with Overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: slide.backgroundImage ? `url(${slide.backgroundImage})` : undefined }}
            />

            {/* Gradient Overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${slide.color}33 0%, #00008B66 100%)`,
              }}
            />

            {/* Content */}
            <div className="relative z-10 text-center p-8 max-w-md">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  {slide.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">{slide.title}</h3>
              <p className="text-white/90 text-lg">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <Button
          onClick={prev}
          size="icon"
          variant="ghost"
          className="h-10 w-10 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-all"
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous slide</span>
        </Button>
        <Button
          onClick={next}
          size="icon"
          variant="ghost"
          className="h-10 w-10 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-all"
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next slide</span>
        </Button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentIndex === index ? "bg-white w-6" : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
