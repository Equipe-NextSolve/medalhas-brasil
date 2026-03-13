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

    function handleChange(e) {
        const {name, value} = e.target
        setFormData((prev) => ({...prev, [name]: value}))
    }

    function handleSelectChange(value) {
        setFormData((prev)=> ({...prev, produto: value}))
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log(formData)
    }

    return (
        <div className='flex flex-col gap-10 w-full max-w-200'>
            <h2>Preencha os campos abaixo</h2>
            <form action="" className='flex flex-col gap-7'>
                <div className='flex w-full gap-10'>
                    <div className="space-y-1 w-full">
                        <Label htmlFor="nome">Nome</Label>
                        <Input
                        id="nome"
                        name="nome"
                        placeholder="Seu nome completo"
                        value={formData.nome}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-1 w-full">
                        <Label htmlFor="nomeEmpresa">Nome da Empresa</Label>
                        <Input
                        id="nomeEmpresa"
                        name="nomeEmpresa"
                        placeholder="Nome da empresa"
                        value={formData.nomeEmpresa}
                        onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="space-y-1">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email@exemplo.com"
                    value={formData.email}
                    onChange={handleChange}
                    />
                </div>   
                <div className='flex w-full gap-10'>
                    <div className="space-y-1 w-full">
                        <Label htmlFor="contato ">Contato</Label>
                        <Input
                        id="contato"
                        name="contato"
                        placeholder="(00) 00000-0000"
                        value={formData.contato}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-1 w-full">
                        <Label htmlFor="quantidade ">Quantidade</Label>
                        <Input
                        id="quantidade"
                        name="quantidade"
                        type="number"
                        placeholder="Ex: 100"
                        value={formData.quantidade}
                        onChange={handleChange}
                        />
                    </div>
                    
                    <div className="space-y-1 w-full">
                        <Label htmlFor="cpfCnpj ">CPF / CNPJ</Label>
                        <Input
                        id="cpfCnpj"
                        name="cpfCnpj"
                        placeholder="000.000.000-00"
                        value={formData.cpfCnpj}
                        onChange={handleChange}
                        />
                    </div>
                </div>  
                      
                <div className="space-y-1">
                    <Label htmlFor="produto">Produto</Label>
                    <Select onValueChange={handleSelectChange} value={formData.produto}>
                    <SelectTrigger id="produto">
                        <SelectValue placeholder="Selecione um produto" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="produto-a">Produto A</SelectItem>
                        <SelectItem value="produto-b">Produto B</SelectItem>
                        <SelectItem value="produto-c">Produto C</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                <div className="space-y-1">
                    <Label htmlFor="dataEvento">Data do Evento</Label>
                    <Input
                    id="dataEvento"
                    name="dataEvento"
                    type="date"
                    value={formData.dataEvento}
                    onChange={handleChange}
                    />
                </div>   
                <div className="space-y-1">
                <Label htmlFor="mensagem">Mensagem</Label>
                <Textarea
                    id="mensagem"
                    name="mensagem"
                    placeholder="Descreva sua necessidade..."
                    rows={4}
                    value={formData.mensagem}
                    onChange={handleChange}
                />
                </div>
                
                <Button type="submit" className="w-full">
                    Enviar Orçamento
                </Button>
                
            </form>
        </div>
    )
}
