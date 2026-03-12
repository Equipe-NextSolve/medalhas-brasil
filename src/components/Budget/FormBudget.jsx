'use client'
import {useState} from 'react'
import { Field, FieldDescription, FieldLabel } from '../ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function FormBudget() {
    const [formData, setFormData] = useState({
        nome: '',
        nomeEmpresa: '',
        contato: '',
        email: '',
        cpfCnpj: '',
        produto: '',
        quantidade: '',
        dataEvento: '',
        mensagem: ''
    })
    return (
        <div className='flex flex-col gap-10'>
            <h2>Preencha os campos abaixo</h2>
            <form action="">
                <div className="space-y-1">
                    <Label htmlFor="nome">Nome</Label>
                    <Input
                    id="nome"
                    name="nome"
                    placeholder="Seu nome completo"
                    value={formData.nome}
                    // onChange={handleChange}
                    />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="nomeEmpresa">Nome da Empresa</Label>
                    <Input
                    id="nomeEmpresa"
                    name="nomeEmpresa"
                    placeholder="Nome da empresa"
                    value={formData.nomeEmpresa}
                    // onChange={handleChange}
                    />
                </div>
                <Field>
                    <FieldLabel htmlFor="textarea-message">Mensagem</FieldLabel>
                    <Textarea placeholder="Escreva sua mensagem aqui"/>
                </Field>
            </form>
        </div>
    )
}
