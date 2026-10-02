'use client'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import AdminSidebar from './AdminSidebar'

export default function AdminShell({ children }) {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <div className="min-h-screen bg-gray/30">
            <AdminSidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

            <div className="lg:pl-64">
                <div className="flex items-center gap-3 border-b border-gray/40 bg-white px-4 py-3 lg:hidden">
                    <button onClick={() => setMenuOpen(true)} aria-label="Abrir menu" className="cursor-pointer rounded-md p-1.5 hover:bg-gray/30">
                        <Menu size={20} />
                    </button>
                    <span className="text-sm font-semibold">Painel administrativo</span>
                </div>

                {children}
            </div>
        </div>
    )
}