"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Menu, Moon, Sun, Workflow } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useTheme } from "@/components/theme-provider"
import { Logo } from "@/components/logo"

export function SiteHeader() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const routes = [
    {
      href: "/",
      label: "Início",
      active: pathname === "/",
    },
    {
      href: "/sobre",
      label: "Sobre",
      active: pathname === "/sobre",
    },
    {
      href: "/projetos",
      label: "Projetos",
      active: pathname === "/projetos" || pathname.startsWith("/projetos/"),
    },
    {
      href: "/contato",
      label: "Contato",
      active: pathname === "/contato",
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-rfs-blue/10 bg-rfs-white/95 backdrop-blur supports-[backdrop-filter]:bg-rfs-white/60 dark:bg-rfs-darkBlue/95 dark:border-rfs-blue/20 dark:supports-[backdrop-filter]:bg-rfs-darkBlue/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6">
          <Logo />
        </Link>
        <div className="hidden md:flex gap-6 mr-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`text-sm font-medium transition-colors hover:text-rfs-blue ${
                route.active ? "text-rfs-darkBlue dark:text-rfs-white" : "text-rfs-black/70 dark:text-rfs-white/70"
              }`}
            >
              {route.label}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/projetos?type=power-bi"
            className="flex items-center gap-1 text-sm text-rfs-black/70 hover:text-rfs-blue dark:text-rfs-white/70 dark:hover:text-rfs-blue transition-colors"
          >
            <BarChart3 className="h-4 w-4" />
            <span>Power BI</span>
          </Link>
          <Link
            href="/projetos?type=n8n"
            className="flex items-center gap-1 text-sm text-rfs-black/70 hover:text-rfs-blue dark:text-rfs-white/70 dark:hover:text-rfs-blue transition-colors"
          >
            <Workflow className="h-4 w-4" />
            <span>n8n</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle Theme"
            className="mr-2 text-rfs-black/70 hover:text-rfs-blue hover:bg-rfs-blue/10 dark:text-rfs-white/70 dark:hover:text-rfs-blue dark:hover:bg-rfs-blue/20"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-rfs-black/70 hover:text-rfs-blue hover:bg-rfs-blue/10 dark:text-rfs-white/70 dark:hover:text-rfs-blue dark:hover:bg-rfs-blue/20"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-rfs-blue/20 bg-rfs-white dark:bg-rfs-darkBlue dark:border-rfs-blue/30"
            >
              <div className="mb-6">
                <Logo />
              </div>
              <div className="flex flex-col gap-6 mt-8">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={`text-sm font-medium transition-colors hover:text-rfs-blue ${
                      route.active
                        ? "text-rfs-darkBlue dark:text-rfs-white"
                        : "text-rfs-black/70 dark:text-rfs-white/70"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {route.label}
                  </Link>
                ))}
                <div className="space-y-3 pt-3 border-t border-rfs-blue/10 dark:border-rfs-blue/20">
                  <Link
                    href="/projetos?type=power-bi"
                    className="flex items-center gap-2 text-sm text-rfs-black/70 hover:text-rfs-blue dark:text-rfs-white/70 dark:hover:text-rfs-blue"
                    onClick={() => setIsOpen(false)}
                  >
                    <BarChart3 className="h-4 w-4" />
                    <span>Power BI</span>
                  </Link>
                  <Link
                    href="/projetos?type=n8n"
                    className="flex items-center gap-2 text-sm text-rfs-black/70 hover:text-rfs-blue dark:text-rfs-white/70 dark:hover:text-rfs-blue"
                    onClick={() => setIsOpen(false)}
                  >
                    <Workflow className="h-4 w-4" />
                    <span>n8n</span>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
