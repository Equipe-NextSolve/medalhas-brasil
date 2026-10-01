'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    TextField,
    MenuItem,
    createTheme,
    ThemeProvider,
    InputAdornment,
} from '@mui/material'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/pt-br'
import {
    CheckCircle2,
    MessageCircle,
    SendHorizontal,
    CalendarDays,
    Truck,
    Building2,
    Package,
    Hash,
    FileText,
    Image as ImageIcon,
} from 'lucide-react'

const theme = createTheme({
    palette: { primary: { main: '#D99923' } },
    typography: { fontFamily: 'Inter, sans-serif' },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    background: '#fafafa',
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#D99923' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#D99923',
                        borderWidth: 2,
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: { '&.Mui-focused': { color: '#D99923' } },
            },
        },
    },
})

const PRODUTOS = [
    'Medalhas',
    'Troféus',
    'Fitas Personalizadas',
    'Couros',
    'Kit Completo (Medalha + Fita)',
    'Outro',
]

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.07, duration: 0.4, ease: 'easeOut' },
    }),
}

function Field({ index, children }) {
    return (
        <motion.div custom={index} initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-20px' }} variants={fadeUp}>
            {children}
        </motion.div>
    )
}

function SuccessScreen({ onBack }) {
    const WA_LINK =
        'https://api.whatsapp.com/send/?phone=5585986990288&text=Ol%C3%A1!%20Acabei%20de%20enviar%20meu%20pedido%20pelo%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es.'

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col items-center justify-center text-center py-20 gap-8"
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 14 }}
            >
                <CheckCircle2 size={80} strokeWidth={1.5} style={{ color: '#D99923' }} />
            </motion.div>

            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold" style={{ color: '#111', fontFamily: 'Montserrat, sans-serif' }}>
                    Pedido enviado com sucesso!
                </h2>
                <p className="text-base" style={{ color: '#777', maxWidth: 420 }}>
                    Recebemos suas informações e entraremos em contato em breve.
                    Se preferir, fale diretamente com nossa equipe pelo WhatsApp.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <a href={WA_LINK} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-sm transition-all duration-200 hover:brightness-110 active:scale-95"
                    style={{ background: '#25D366', color: '#fff', boxShadow: '0 4px 16px rgba(37,211,102,0.35)' }}>
                    <MessageCircle size={18} />
                    Falar pelo WhatsApp
                </a>
                <button onClick={onBack}
                    className="rounded-full px-7 py-3.5 font-medium text-sm transition-colors hover:bg-black/5"
                    style={{ border: '1px solid #E0E0E0', color: '#666' }}>
                    Enviar outro pedido
                </button>
            </div>
        </motion.div>
    )
}

const emptyForm = {
    nomeEmpresa: '',
    nomeEvento: '',
    produto: '',
    quantidade: '',
    dataEvento: null,
    prazoEntrega: null,
    observacoes: '',
}

export default function FormBudget() {
    const [sent, setSent] = useState(false)
    const [loading, setLoading] = useState(false)
    const [imageFiles, setImageFiles] = useState([])
    const [form, setForm] = useState(emptyForm)

    function set(field, value) {
        setForm((prev) => ({ ...prev, [field]: value }))
    }

    function handleImageChange(e) {
        const files = Array.from(e.target.files || [])
        setImageFiles((prev) => [...prev, ...files])
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        await new Promise((r) => setTimeout(r, 900))
        setLoading(false)
        setSent(true)
    }

    function handleBack() {
        setSent(false)
        setForm(emptyForm)
        setImageFiles([])
    }

    if (sent) return <SuccessScreen onBack={handleBack} />

    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                <div className="w-full max-w-3xl px-4 sm:px-0" id="budget">

                    <motion.h2
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="text-2xl font-bold mb-8"
                        style={{ color: '#111', fontFamily: 'Montserrat, sans-serif' }}
                    >
                        Preencha os dados do pedido
                    </motion.h2>

                    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>

                        <Field index={0}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <TextField
                                    label="Nome da empresa contratante"
                                    value={form.nomeEmpresa}
                                    onChange={(e) => set('nomeEmpresa', e.target.value)}
                                    required fullWidth
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Building2 size={16} color="#aaa" />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />
                                <TextField
                                    label="Nome do evento"
                                    value={form.nomeEvento}
                                    onChange={(e) => set('nomeEvento', e.target.value)}
                                    required fullWidth
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <FileText size={16} color="#aaa" />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />
                            </div>
                        </Field>

                        <Field index={1}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <TextField
                                    select label="Tipo de produto"
                                    value={form.produto}
                                    onChange={(e) => set('produto', e.target.value)}
                                    required fullWidth
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Package size={16} color="#aaa" />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                >
                                    {PRODUTOS.map((p) => (
                                        <MenuItem key={p} value={p}>{p}</MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    label="Quantidade"
                                    value={form.quantidade}
                                    onChange={(e) => set('quantidade', e.target.value.replace(/\D/g, ''))}
                                    required fullWidth
                                    inputMode="numeric"
                                    placeholder="Ex: 100"
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Hash size={16} color="#aaa" />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />
                            </div>
                        </Field>

                        <Field index={2}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <DatePicker
                                    label="Data do evento"
                                    value={form.dataEvento}
                                    onChange={(v) => set('dataEvento', v)}
                                    disablePast
                                    slotProps={{
                                        textField: {
                                            fullWidth: true, required: true,
                                            InputProps: {
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <CalendarDays size={16} color="#aaa" />
                                                    </InputAdornment>
                                                ),
                                            },
                                        },
                                    }}
                                />
                                <DatePicker
                                    label="Prazo de entrega"
                                    value={form.prazoEntrega}
                                    onChange={(v) => set('prazoEntrega', v)}
                                    disablePast
                                    slotProps={{
                                        textField: {
                                            fullWidth: true, required: true,
                                            InputProps: {
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Truck size={16} color="#aaa" />
                                                    </InputAdornment>
                                                ),
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </Field>

                        <Field index={3}>
                            <div
                                onClick={() => document.getElementById('img-upload').click()}
                                className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed cursor-pointer transition-colors duration-200 py-8"
                                style={{ borderColor: '#E0E0E0', background: '#fafafa' }}
                                onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#D99923')}
                                onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#E0E0E0')}
                            >
                                <ImageIcon size={28} color="#aaa" />
                                <div className="text-center">
                                    <p className="text-sm font-medium" style={{ color: '#555' }}>
                                        Clique para adicionar imagens
                                    </p>
                                    <p className="text-xs mt-0.5" style={{ color: '#aaa' }}>
                                        Arte, logo ou referências (PNG, JPG, PDF)
                                    </p>
                                </div>
                                {imageFiles.length > 0 && (
                                    <p className="text-xs font-semibold" style={{ color: '#D99923' }}>
                                        {imageFiles.length} arquivo{imageFiles.length > 1 ? 's' : ''} selecionado{imageFiles.length > 1 ? 's' : ''}
                                    </p>
                                )}
                            </div>
                            <input
                                id="img-upload" type="file" accept="image/*,.pdf"
                                multiple className="hidden" onChange={handleImageChange}
                            />
                        </Field>

                        <Field index={4}>
                            <TextField
                                label="Observações"
                                value={form.observacoes}
                                onChange={(e) => set('observacoes', e.target.value)}
                                multiline rows={4} fullWidth
                                placeholder="Descreva detalhes do pedido, personalização, cores, etc."
                            />
                        </Field>

                        <Field index={5}>
                            <div className="flex justify-center mt-2">
                                <button
                                    type="submit" disabled={loading}
                                    className="flex items-center gap-2 rounded-full px-10 py-4 font-bold text-sm tracking-wide transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5 active:scale-95 disabled:opacity-70 disabled:pointer-events-none"
                                    style={{
                                        background: 'linear-gradient(135deg, #D99923 0%, #c8871a 100%)',
                                        color: '#000',
                                        boxShadow: '0 4px 20px rgba(217,153,35,0.4)',
                                    }}
                                >
                                    {loading ? (
                                        <>
                                            <span className="w-4 h-4 rounded-full border-2 border-black/20 border-t-black animate-spin" />
                                            Enviando…
                                        </>
                                    ) : (
                                        <>
                                            <SendHorizontal size={16} />
                                            Enviar Pedido
                                        </>
                                    )}
                                </button>
                            </div>
                        </Field>

                    </form>
                </div>
            </LocalizationProvider>
        </ThemeProvider>
    )
}