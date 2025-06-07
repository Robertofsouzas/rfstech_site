"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function AdminAboutPage() {
  const [data, setData] = useState({ title: "", description: "", paragraphs: [""] })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch("/config/about.json")
      .then(res => res.json())
      .then(json => {
        setData(json)
        setLoading(false)
      })
  }, [])

  function handleChangeParagraph(index: number, value: string) {
    setData(prev => {
      const paragraphs = [...prev.paragraphs]
      paragraphs[index] = value
      return { ...prev, paragraphs }
    })
  }

  function handleAddParagraph() {
    setData(prev => ({ ...prev, paragraphs: [...prev.paragraphs, ""] }))
  }

  function handleRemoveParagraph(index: number) {
    setData(prev => ({ ...prev, paragraphs: prev.paragraphs.filter((_, i) => i !== index) }))
  }

  async function handleSave() {
    setSaving(true)
    await fetch("/api/admin/about", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    setSaving(false)
    alert("Alterações salvas!")
  }

  if (loading) return <div>Carregando...</div>

  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Editar Sobre Mim</CardTitle>
        <CardDescription>Altere as informações da seção Sobre Mim do site principal.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          label="Título"
          value={data.title}
          onChange={e => setData({ ...data, title: e.target.value })}
          placeholder="Título da seção"
        />
        <Textarea
          label="Descrição"
          value={data.description}
          onChange={e => setData({ ...data, description: e.target.value })}
          placeholder="Descrição curta"
        />
        <div className="space-y-2">
          <label className="font-medium">Parágrafos</label>
          {data.paragraphs.map((p, i) => (
            <div key={i} className="flex gap-2 items-center">
              <Textarea
                value={p}
                onChange={e => handleChangeParagraph(i, e.target.value)}
                placeholder={`Parágrafo ${i + 1}`}
                className="flex-1"
              />
              <Button type="button" variant="destructive" onClick={() => handleRemoveParagraph(i)} disabled={data.paragraphs.length === 1}>Remover</Button>
            </div>
          ))}
          <Button type="button" onClick={handleAddParagraph}>Adicionar Parágrafo</Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} disabled={saving}>{saving ? "Salvando..." : "Salvar Alterações"}</Button>
      </CardFooter>
    </Card>
  )
} 