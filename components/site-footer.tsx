"use client"

import Link from "next/link"
import { Facebook, Github, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react"
import { Logo } from "@/components/logo"

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-rfs-blue/10 bg-rfs-white py-8 md:py-12 dark:bg-rfs-darkBlue dark:border-rfs-blue/20">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/">
              <Logo />
            </Link>
            <p className="text-sm text-rfs-black/70 dark:text-rfs-white/70">
              Transformando dados em insights estratégicos e processos em fluxos eficientes
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-rfs-black/60 hover:text-rfs-blue dark:text-rfs-white/60 dark:hover:text-rfs-blue transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-rfs-black/60 hover:text-rfs-blue dark:text-rfs-white/60 dark:hover:text-rfs-blue transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-rfs-black/60 hover:text-rfs-blue dark:text-rfs-white/60 dark:hover:text-rfs-blue transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-rfs-black/60 hover:text-rfs-blue dark:text-rfs-white/60 dark:hover:text-rfs-blue transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="#"
                className="text-rfs-black/60 hover:text-rfs-blue dark:text-rfs-white/60 dark:hover:text-rfs-blue transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-rfs-darkBlue dark:text-rfs-white">Empresa</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-rfs-black/70 hover:text-rfs-blue dark:text-rfs-white/70 dark:hover:text-rfs-blue transition-colors"
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link
                  href="/contato"
                  className="text-rfs-black/70 hover:text-rfs-blue dark:text-rfs-white/70 dark:hover:text-rfs-blue transition-colors"
                >
                  Contato
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-rfs-black/70 hover:text-rfs-blue dark:text-rfs-white/70 dark:hover:text-rfs-blue transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-rfs-black/70 hover:text-rfs-blue dark:text-rfs-white/70 dark:hover:text-rfs-blue transition-colors"
                >
                  Carreiras
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-rfs-darkBlue dark:text-rfs-white">Serviços</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/projetos?type=power-bi"
                  className="text-rfs-black/70 hover:text-rfs-blue dark:text-rfs-white/70 dark:hover:text-rfs-blue transition-colors"
                >
                  Power BI
                </Link>
              </li>
              <li>
                <Link
                  href="/projetos?type=n8n"
                  className="text-rfs-black/70 hover:text-rfs-blue dark:text-rfs-white/70 dark:hover:text-rfs-blue transition-colors"
                >
                  Automação n8n
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-rfs-black/70 hover:text-rfs-blue dark:text-rfs-white/70 dark:hover:text-rfs-blue transition-colors"
                >
                  Consultoria
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-rfs-black/70 hover:text-rfs-blue dark:text-rfs-white/70 dark:hover:text-rfs-blue transition-colors"
                >
                  Treinamentos
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-rfs-darkBlue dark:text-rfs-white">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-rfs-blue" />
                <span className="text-rfs-black/70 dark:text-rfs-white/70">
                  Av. Exemplo, 1234
                  <br />
                  Bairro, Cidade - Estado
                  <br />
                  CEP: 12345-678
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-rfs-blue" />
                <span className="text-rfs-black/70 dark:text-rfs-white/70">+55 (11) 1234-5678</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-rfs-blue" />
                <span className="text-rfs-black/70 dark:text-rfs-white/70">contato@rfstech.com.br</span>
              </li>
            </ul>

            <div className="mt-6 pt-4">
              <h3 className="text-sm font-medium mb-2 text-rfs-darkBlue dark:text-rfs-white">Newsletter</h3>
              <form className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  className="flex h-10 w-full rounded-md border border-rfs-blue/20 bg-rfs-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-rfs-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rfs-blue focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-rfs-blue/30 dark:bg-rfs-darkBlue dark:placeholder:text-rfs-white/50"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-rfs-blue text-rfs-white hover:bg-rfs-blue/90 h-10 px-4 py-2"
                >
                  Enviar
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-rfs-blue/10 pt-8 text-center text-sm text-rfs-black/60 dark:text-rfs-white/60 dark:border-rfs-blue/20">
          &copy; {new Date().getFullYear()} RFStech. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}
