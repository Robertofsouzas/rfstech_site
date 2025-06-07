"use client"

import Image from "next/image"
import { useTheme } from "@/components/theme-provider"

export function Logo({ size = "default" }: { size?: "default" | "small" | "large" }) {
  const { theme } = useTheme()

  // Definir tamanhos com base no parâmetro
  const heightClasses = {
    small: "h-8",
    default: "h-10",
    large: "h-12",
  }
  const textClasses = {
    small: "text-lg",
    default: "text-xl",
    large: "text-2xl",
  }

  const currentHeightClass = heightClasses[size] || heightClasses.default
  const currentTextClass = textClasses[size] || textClasses.default

  return (
    <div className={`flex items-center gap-2 font-bold ${currentHeightClass}`}>
      <Image
        src="/images/logo.jpg"
        alt="RFStech Logo"
        width={0}
        height={0}
        sizes="100vw"
        className={`object-contain ${currentHeightClass} w-auto`}
        loading="eager"
      />
      <div className={`flex items-center ${currentTextClass}`}>
        <div className={`flex items-center justify-center rounded-md bg-rfs-blue text-white aspect-square ${currentHeightClass} p-1`}>
          <span className="font-bold">RFS</span>
        </div>
        <span className={`ml-1 text-rfs-darkBlue dark:text-rfs-white ${currentTextClass}`}>tech</span>
      </div>
    </div>
  )
}
