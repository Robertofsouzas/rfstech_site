"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Experience {
  company: string
  role: string
  description: string
}

export default function AdminExperiencePage() {
  const [data, setData] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch("/config/experience.json")
      .then(res => res.json())
      .then(json => {
        setData(json)
        setLoading(false)
      })
  }, [])

  function handleChange(index: number, field: keyof Experience, value: string) {
    setData(prev => {
      const arr = [...prev]
      arr[index][field] = value
      return arr
    })
  }

  function handleAdd() {
    setData(prev => ([...prev, { company: "", role: "", description: "" }]))
  }

  function handleRemove(index: number) {
    setData(prev => prev.filter((_, i) => i !== index))
  }

  async function handleSave() {
    setSaving(true)
    await fetch("/api/admin/experience", {
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
        <CardTitle>Editar Experiência Profissional</CardTitle>
        <CardDescription>Altere as experiências profissionais exibidas no site principal.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((exp, i) => (
          <div key={i} className="border p-4 rounded-lg space-y-2">
            <Input
              label="Empresa"
              value={exp.company}
              onChange={e => handleChange(i, "company", e.target.value)}
              placeholder="Nome da empresa"
            />
            <Input
              label="Cargo"
              value={exp.role}
              onChange={e => handleChange(i, "role", e.target.value)}
              placeholder="Cargo"
            />
            <Textarea
              label="Descrição"
              value={exp.description}
              onChange={e => handleChange(i, "description", e.target.value)}
              placeholder="Descrição das atividades"
            />
            <Button type="button" variant="destructive" onClick={() => handleRemove(i)} disabled={data.length === 1}>Remover</Button>
          </div>
        ))}
        <Button type="button" onClick={handleAdd}>Adicionar Experiência</Button>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} disabled={saving}>{saving ? "Salvando..." : "Salvar Alterações"}</Button>
      </CardFooter>
    </Card>
  )
} 