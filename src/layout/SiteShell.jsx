'use client'
import { usePathname } from 'next/navigation'
import Header from '@/layout/Header/Header'
import Footer from '@/layout/Footer/Footer'

export default function SiteShell({ children }) {
    const pathname = usePathname()
    if (pathname?.startsWith('/admin')) return children
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}