"use client"
import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { BiSolidMessageRounded } from "react-icons/bi"
import { IoClose } from "react-icons/io5"

export default function Messenger() {
    const [open, setOpen] = useState(false)
    const boxRef = useRef(null)

    const contacts = [
        { name: "Diana", phone: "5585999863324", label: "85 99986-3324" },
        { name: "Eduarda", phone: "5585997636536", label: "85 99763-6536" },
        { name: "Marlon", phone: "5585986990288", label: "85 98699-0288" }
    ]

    useEffect(() => {
        function handleClickOutside(event) {
            if (boxRef.current && !boxRef.current.contains(event.target)) {
                setOpen(false)
            }
        }
        if (open) document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [open])

    return (
        <div className="fixed bottom-6 right-6 z-999 flex flex-col items-end" ref={boxRef}>
            <div className={`
                    transition-all duration-300 ease-in-out transform
                    ${open ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'}
                    mb-4 w-70 sm:w-72 rounded-2xl bg-[#1a1a1a] text-white shadow-2xl border border-white/10 overflow-hidden`}>
                <div className="p-5 bg-white/5 border-b border-white/5 flex justify-between items-center">
                    <h3 className="font-medium text-sm uppercase tracking-wider text-gray-400">Fale conosco</h3>
                    <button type='button' onClick={() => setOpen(false)} className="p-1 hover:bg-white/10 rounded-full transition"><IoClose size={20} /></button>
                </div>

                <div className="p-3 flex flex-col gap-2">
                    {contacts.map((contact, index) => (
                        <Link
                            key={index}
                            href={`https://wa.me/${contact.phone}`}
                            target="_blank"
                            className="group flex items-center justify-between p-3 rounded-xl hover:bg-green-600/10 border border-transparent hover:border-green-600/30 transition-all">
                            <div className="flex flex-col">
                                <span className="font-semibold text-[15px] group-hover:text-green-500 transition-colors">
                                    {contact.name}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {contact.label}
                                </span>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-xs opacity-80 group-hover:opacity-100 transition">
                                WA
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <button type='button' onClick={() => setOpen(!open)} aria-label="Abrir chat" className={`flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300
                    ${open ? 'bg-zinc-800 rotate-90' : 'bg-green-600 hover:scale-110'}text-white`}>
                {open ? <IoClose size={28} /> : <BiSolidMessageRounded size={26} />}
            </button>
        </div>
    )
}