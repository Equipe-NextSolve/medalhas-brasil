import React from 'react'
import Link from 'next/link'

function MedalIllustration() {
    return (
        <svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', maxWidth: 520 }}>
            {/* Fundo do card */}
            <rect x="20" y="20" width="440" height="320" rx="24" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />

            {/* ── Medalha Ouro (centro, destaque) ── */}
            <g transform="translate(240,140)">
                {/* Fita */}
                <rect x="-14" y="-115" width="28" height="70" rx="6" fill="#D99923" opacity="0.9" />
                <rect x="-14" y="-115" width="14" height="70" rx="6" fill="#C8871A" opacity="0.9" />
                {/* Clip fita */}
                <rect x="-18" y="-48" width="36" height="10" rx="4" fill="#B37519" />
                {/* Círculo externo */}
                <circle r="55" fill="#D99923" />
                <circle r="55" fill="url(#goldGrad)" />
                {/* Anel interno */}
                <circle r="46" fill="none" stroke="#C8871A" strokeWidth="3" opacity="0.6" />
                {/* Estrela */}
                <text textAnchor="middle" dominantBaseline="central" fontSize="42" fill="#fff" opacity="0.95" style={{ fontFamily: 'serif' }}>★</text>
                {/* Brilho */}
                <ellipse cx="-16" cy="-18" rx="12" ry="7" fill="rgba(255,255,255,0.25)" transform="rotate(-30)" />
            </g>

            {/* ── Medalha Prata (esquerda) ── */}
            <g transform="translate(110,175)">
                <rect x="-11" y="-95" width="22" height="58" rx="5" fill="#B0B8C8" opacity="0.9" />
                <rect x="-11" y="-95" width="11" height="58" rx="5" fill="#9AA4B4" opacity="0.9" />
                <rect x="-14" y="-40" width="28" height="8" rx="4" fill="#8A94A4" />
                <circle r="42" fill="#C0C8D8" />
                <circle r="42" fill="url(#silverGrad)" />
                <circle r="35" fill="none" stroke="#A8B0C0" strokeWidth="2.5" opacity="0.6" />
                <text textAnchor="middle" dominantBaseline="central" fontSize="32" fill="#fff" opacity="0.9" style={{ fontFamily: 'serif' }}>★</text>
                <ellipse cx="-12" cy="-14" rx="9" ry="5" fill="rgba(255,255,255,0.25)" transform="rotate(-30)" />
            </g>

            {/* ── Medalha Bronze (direita) ── */}
            <g transform="translate(370,175)">
                <rect x="-11" y="-95" width="22" height="58" rx="5" fill="#CD7F32" opacity="0.9" />
                <rect x="-11" y="-95" width="11" height="58" rx="5" fill="#B86E22" opacity="0.9" />
                <rect x="-14" y="-40" width="28" height="8" rx="4" fill="#A85E12" />
                <circle r="42" fill="#CD7F32" />
                <circle r="42" fill="url(#bronzeGrad)" />
                <circle r="35" fill="none" stroke="#B86E22" strokeWidth="2.5" opacity="0.6" />
                <text textAnchor="middle" dominantBaseline="central" fontSize="32" fill="#fff" opacity="0.9" style={{ fontFamily: 'serif' }}>★</text>
                <ellipse cx="-12" cy="-14" rx="9" ry="5" fill="rgba(255,255,255,0.25)" transform="rotate(-30)" />
            </g>

            {/* Gradientes */}
            <defs>
                <radialGradient id="goldGrad" cx="35%" cy="35%">
                    <stop offset="0%" stopColor="#FFE066" />
                    <stop offset="100%" stopColor="#B8740A" />
                </radialGradient>
                <radialGradient id="silverGrad" cx="35%" cy="35%">
                    <stop offset="0%" stopColor="#E8EEF8" />
                    <stop offset="100%" stopColor="#8090A8" />
                </radialGradient>
                <radialGradient id="bronzeGrad" cx="35%" cy="35%">
                    <stop offset="0%" stopColor="#EDA060" />
                    <stop offset="100%" stopColor="#8B4A10" />
                </radialGradient>
            </defs>

            {/* Texto inferior */}
            <text x="240" y="302" textAnchor="middle" fontSize="13" fill="rgba(255,255,255,0.55)"
                style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.1em', fontWeight: 600 }}>
                MEDALHAS PERSONALIZADAS
            </text>

            {/* Pontos decorativos */}
            {[60,90,420,450].map((cx, i) => (
                <circle key={i} cx={cx} cy={[310,280,310,280][i]} r="3" fill="rgba(255,255,255,0.2)" />
            ))}
        </svg>
    )
}

export default function InitialBudget() {
    return (
        <section className="w-full min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #D99923 0%, #c8791a 60%, #b35a00 100%)' }}>

            <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full opacity-10"
                style={{ background: '#fff' }} />
            <div className="absolute bottom-[-80px] left-[-60px] w-[350px] h-[350px] rounded-full opacity-10"
                style={{ background: '#fff' }} />

            <div className="max-w-6xl w-full grid md:grid-cols-2 gap-16 items-center relative z-10">

                <div className="flex justify-center">
                    <MedalIllustration />
                </div>

                <div className="text-white space-y-6">
                    <div className="inline-block rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase mb-2"
                        style={{ background: 'rgba(255,255,255,0.2)', letterSpacing: '0.15em' }}>
                        Medalhas Brasil
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight"
                        style={{ fontFamily: 'Montserrat, sans-serif', textShadow: '0 2px 16px rgba(0,0,0,0.15)' }}>
                        Solicite seu<br />
                        <span style={{ color: '#fff9e6' }}>Orçamento</span>
                    </h1>

                    <p className="text-lg leading-relaxed" style={{ opacity: 0.88, maxWidth: 420 }}>
                        Entre em contato com nossa equipe e receba uma proposta personalizada
                        para o seu projeto. Atendemos com qualidade e agilidade.
                    </p>

                    <div className="flex gap-4 flex-wrap">
                        <Link href="#budget"
                            className="inline-flex items-center gap-2 font-bold px-7 py-3.5 rounded-full transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5 active:scale-95"
                            style={{
                                background: '#fff',
                                color: '#c8791a',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                                fontSize: 15,
                            }}>
                            Solicitar Orçamento
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}