"use client"

import { useState, useEffect } from "react"
import { BarChart3, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

// Este componente é uma demonstração de um relatório Power BI interativo
// Ele simula um relatório real com dados de exemplo
export function PowerBiDemo({ title }: { title: string }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Simular carregamento do relatório
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Adicionar um console.log para depuração
  console.log("Usando componente de demonstração PowerBiDemo - URL de incorporação real não fornecida")

  if (!isClient) {
    return null
  }

  return (
    <div className="w-full h-full min-h-[500px] bg-white rounded-lg overflow-hidden">
      {!isLoaded ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rfs-blue mx-auto mb-4"></div>
            <p className="text-rfs-black/70">Carregando relatório...</p>
          </div>
        </div>
      ) : (
        <div className="w-full h-full">
          <div className="bg-[#F3F2F1] p-3 flex justify-between items-center border-b">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-rfs-blue" />
              <span className="font-medium text-rfs-darkBlue">{title}</span>
            </div>
            <Button variant="ghost" size="sm" className="text-rfs-blue hover:bg-rfs-blue/10">
              <ExternalLink className="h-4 w-4 mr-1" />
              <span>Expandir</span>
            </Button>
          </div>

          <div className="p-4 h-[calc(100%-48px)] overflow-auto">
            {/* Simulação de um relatório Power BI */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-[#F9F9F9] p-4 rounded-lg border h-64">
                <h4 className="text-sm font-medium mb-2 text-rfs-darkBlue">Vendas por Região</h4>
                <div className="relative h-[calc(100%-30px)]">
                  <div className="absolute bottom-0 left-0 w-full flex items-end justify-around h-[calc(100%-20px)]">
                    <div className="w-8 bg-rfs-blue rounded-t h-[65%]"></div>
                    <div className="w-8 bg-rfs-blue rounded-t h-[85%]"></div>
                    <div className="w-8 bg-rfs-blue rounded-t h-[45%]"></div>
                    <div className="w-8 bg-rfs-blue rounded-t h-[75%]"></div>
                    <div className="w-8 bg-rfs-blue rounded-t h-[55%]"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full flex items-center justify-around">
                    <span className="text-xs text-rfs-black/60">Norte</span>
                    <span className="text-xs text-rfs-black/60">Sul</span>
                    <span className="text-xs text-rfs-black/60">Leste</span>
                    <span className="text-xs text-rfs-black/60">Oeste</span>
                    <span className="text-xs text-rfs-black/60">Centro</span>
                  </div>
                </div>
              </div>
              <div className="bg-[#F9F9F9] p-4 rounded-lg border h-64">
                <h4 className="text-sm font-medium mb-2 text-rfs-darkBlue">Vendas por Categoria</h4>
                <div className="flex items-center justify-center h-[calc(100%-30px)]">
                  <div className="relative w-40 h-40 rounded-full overflow-hidden">
                    <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-rfs-blue"></div>
                    <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#4682B4]"></div>
                    <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#6495ED]"></div>
                    <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[#87CEEB]"></div>
                    <div className="absolute top-1/2 left-1/2 w-10 h-10 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#F9F9F9] p-4 rounded-lg border mb-4">
              <h4 className="text-sm font-medium mb-2 text-rfs-darkBlue">Vendas por Período</h4>
              <div className="h-48 relative">
                <div className="absolute bottom-0 left-0 w-full h-[calc(100%-20px)] flex items-end">
                  <div className="flex-1 h-full relative">
                    <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-rfs-blue/20"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-rfs-blue/40"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-[10%] bg-rfs-blue/60"></div>
                  </div>
                  <div className="flex-1 h-full relative">
                    <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-rfs-blue/20"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-rfs-blue/40"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-rfs-blue/60"></div>
                  </div>
                  <div className="flex-1 h-full relative">
                    <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-rfs-blue/20"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-rfs-blue/40"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-rfs-blue/60"></div>
                  </div>
                  <div className="flex-1 h-full relative">
                    <div className="absolute bottom-0 left-0 right-0 h-[70%] bg-rfs-blue/20"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-[50%] bg-rfs-blue/40"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-rfs-blue/60"></div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full flex justify-around">
                  <span className="text-xs text-rfs-black/60">Q1</span>
                  <span className="text-xs text-rfs-black/60">Q2</span>
                  <span className="text-xs text-rfs-black/60">Q3</span>
                  <span className="text-xs text-rfs-black/60">Q4</span>
                </div>
              </div>
            </div>

            <div className="bg-[#F9F9F9] p-4 rounded-lg border">
              <h4 className="text-sm font-medium mb-2 text-rfs-darkBlue">Principais Métricas</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded border">
                  <div className="text-xs text-rfs-black/60 mb-1">Vendas Totais</div>
                  <div className="text-xl font-bold text-rfs-darkBlue">R$ 1.245.678</div>
                  <div className="text-xs text-green-600 flex items-center">
                    <span className="mr-1">↑</span> 12,5% vs. último período
                  </div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="text-xs text-rfs-black/60 mb-1">Ticket Médio</div>
                  <div className="text-xl font-bold text-rfs-darkBlue">R$ 437,82</div>
                  <div className="text-xs text-green-600 flex items-center">
                    <span className="mr-1">↑</span> 5,2% vs. último período
                  </div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="text-xs text-rfs-black/60 mb-1">Novos Clientes</div>
                  <div className="text-xl font-bold text-rfs-darkBlue">1.872</div>
                  <div className="text-xs text-red-600 flex items-center">
                    <span className="mr-1">↓</span> 3,1% vs. último período
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
