import React from 'react'
import Link from 'next/link'

export default function Navigation() {
    const dtLinks = [
        { label: 'Home', href: '/' },
        { label: 'Quem Somos', href: '/About' },
        { label: 'Política', href: '/Politics' },
    ]

    return (
        <nav className='w-650px flex justify-end items-center'>
            <div className='flex justify-content items-center gap-5'>
                <ul className='flex justify-content items-center gap-4 md:gap-8'>
                    {dtLinks.map((link, index) => (
                        <li key={index}>
                            <Link href={link.href} className='
                            text-black 
                            transition-all duration-300
                            hover:text-1xl
                            hover:text-yellow 
                            font-700'>{link.label}</Link>
                        </li>
                    ))}
                </ul>
                <Link href='/budget' className="bg-black text-white p-2 rounded-md hover:bg-gray-800 transition">Orçamentos</Link>
            </div>
        </nav>
    )
}