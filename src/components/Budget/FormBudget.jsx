'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
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
import emailjs from '@emailjs/browser'

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.08,
            duration: 0.4,
            ease: "easeOut"
        }
    })
}

function AnimatedField({ index, children }) {
    return (
        <motion.div
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            variants={fadeUp}
           
        >
            {children}
        </motion.div>
    )
}

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
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    function handleSelectChange(value) {
        setFormData((prev) => ({ ...prev, produto: value }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        console.log(formData)

        const dataToSend = {
            ...formData,
            time: new Date().toLocaleString('pt-BR')
        }

        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

        if (!serviceId || !templateId || !publicKey) {
            alert('Erro: As chaves do EmailJS não foram carregadas. Verifique seu arquivo .env.')
            console.error('EmailJS keys are missing. Check .env. file.')
            return
        }


        try {
            await emailjs.send(serviceId, templateId, dataToSend, publicKey)
            alert('Orçamento enviado com sucesso!')
            setFormData({
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
        } catch (error) {
            console.error('Erro ao enviar o orçamento:', error)
            alert('Ocorreu um erro ao enviar o orçamento. Tente novamente mais tarde.')
        }

    }

    return (
        <div className='flex flex-col px-8 sm:px-0 gap-10 w-full max-w-200'>
            <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                Preencha os campos abaixo
            </motion.h2>

            <form className='flex flex-col gap-7' onSubmit={handleSubmit}>

                <AnimatedField index={0}>
                    <div className='flex flex-col sm:flex-row w-full gap-10'>
                        <div className="space-y-1 w-full">
                            <Label htmlFor="nome">Nome</Label>
                            <Input id="nome" name="nome" placeholder="Seu nome completo" value={formData.nome} onChange={handleChange} />
                        </div>
                        <div className="space-y-1 w-full">
                            <Label htmlFor="nomeEmpresa">Nome da Empresa</Label>
                            <Input id="nomeEmpresa" name="nomeEmpresa" placeholder="Nome da empresa" value={formData.nomeEmpresa} onChange={handleChange} />
                        </div>
                    </div>
                </AnimatedField>

                <AnimatedField index={1}>
                    <div className="space-y-1">
                        <Label htmlFor="email">E-mail</Label>
                        <Input id="email" name="email" type="email" placeholder="email@exemplo.com" value={formData.email} onChange={handleChange} />
                    </div>
                </AnimatedField>

                <AnimatedField index={2}>
                    <div className='flex flex-col sm:flex-row w-full gap-10'>
                        <div className="space-y-1 w-full">
                            <Label htmlFor="contato">Contato</Label>
                            <Input id="contato" name="contato" placeholder="(00) 00000-0000" value={formData.contato} onChange={handleChange} />
                        </div>
                        <div className="space-y-1 w-full">
                            <Label htmlFor="quantidade">Quantidade</Label>
                            <Input id="quantidade" name="quantidade" type="text" inputMode="numeric" pattern="[0-9]*" placeholder="Ex: 100" value={formData.quantidade} onChange={handleChange} />
                        </div>
                        <div className="space-y-1 w-full">
                            <Label htmlFor="cpfCnpj">CPF / CNPJ</Label>
                            <Input id="cpfCnpj" name="cpfCnpj" placeholder="000.000.000-00" value={formData.cpfCnpj} onChange={handleChange} />
                        </div>
                    </div>
                </AnimatedField>

                <AnimatedField index={3}>
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
                </AnimatedField>

                <AnimatedField index={4}>
                    <div className="space-y-1">
                        <Label htmlFor="dataEvento">Data do Evento</Label>
                        <Input id="dataEvento" name="dataEvento" type="date" value={formData.dataEvento} onChange={handleChange} />
                    </div>
                </AnimatedField>

                <AnimatedField index={5}>
                    <div className="space-y-1">
                        <Label htmlFor="mensagem">Mensagem</Label>
                        <Textarea id="mensagem" name="mensagem" placeholder="Descreva sua necessidade..." rows={4} value={formData.mensagem} onChange={handleChange} />
                    </div>
                </AnimatedField>

                <div className="flex justify-center">
                    <AnimatedField index={6}>
                        <Button
                            type="submit"
                            className="
                                px-8 py-2 cursor-pointer rounded-md
                                bg-linear-to-r from-yellow-600 via-yellow-500 to-amber-400
                                text-black font-bold tracking-wide text-[12px] sm:text-sm
                                shadow-[0_4px_20px_rgba(217,153,35,0.35)]
                                hover:shadow-[0_6px_28px_rgba(217,153,35,0.55)]
                                hover:brightness-110 hover:-translate-y-0.5
                                active:translate-y-0 active:shadow-none
                                transition-all duration-300 ease-in-out
                            "
                        >
                            Enviar Orçamento
                        </Button>
                    </AnimatedField>
                </div>

            </form>
        </div>
    )
}