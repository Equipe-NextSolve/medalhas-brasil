"use client"
import React, { useEffect, useState } from "react"
import { FaTrophy } from "react-icons/fa"

export default function LoadingScreen({ children }) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const handleLoad = () => setLoading(false)

        if (document.readyState === "complete") {
            setLoading(false)
        } else {
            window.addEventListener("load", handleLoad)
            return () => window.removeEventListener("load", handleLoad)
        }
    }, [])

    if (!loading) return children

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-9999">
            <div className="relative flex flex-col items-center justify-center">
                
                <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                        <circle
                            cx="64"
                            cy="64"
                            r="60"
                            stroke="currentColor"
                            strokeWidth="3"
                            fill="transparent"
                            className="text-darkGray" 
                        />
                        <circle
                            cx="64"
                            cy="64"
                            r="60"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="transparent"
                            strokeDasharray="377" 
                            strokeDashoffset="280"
                            strokeLinecap="round"
                            className="text-green animate-[spin_3s_linear_infinite]" 
                        />
                    </svg>

                    <div className="relative flex items-center justify-center animate-pulse">
                        <FaTrophy size={45} className="text-yellow" /> {/* color-yellow */}
                        
                        <div className="absolute inset-0 bg-white/10 blur-xl rounded-full"></div>
                    </div>
                </div>
                <div className="mt-10 flex flex-col items-center gap-2">
                    <p className="text-gray text-[11px] tracking-[0.4em] uppercase font-light animate-pulse">
                        Carregando Sucesso
                    </p>
                    
                    <div className="w-24 h-px bg-darkGray overflow-hidden">
                        <div className="w-full h-full bg-blue animate-[translateX_1.5s_infinite] origin-left" 
                             style={{ 
                                animation: 'progressMove 2s ease-in-out infinite' 
                             }}>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes progressMove {
                    0% { transform: translateX(-100%); }
                    50% { transform: translateX(0); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    )
}