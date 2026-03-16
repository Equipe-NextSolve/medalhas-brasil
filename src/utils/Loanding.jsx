"use client"
import React, { useEffect, useState } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

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

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white/40 backdrop-blur-md z-[9999]">
                <div className="flex flex-col items-center gap-4">
                    <AiOutlineLoading3Quarters className="text-[#D99923] text-5xl animate-spin" />
                    <p className="text-[#BFBFBF] text-sm tracking-widest uppercase text-black">Carregando</p>
                </div>
            </div>
        )
    }
    return children
}