"use client";
import React from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export default function Navigation() {
    const dtLinks = [
        { label: 'Home', href: '/' },
        { label: 'Eventos', href: '#events' },
        { label: 'Sobre nós', href: '#about' },
        { label: 'Catálogo', href: '#catalago' },
        {
            label: 'Páginas',
            href: '#',
            drop: [
                { label: 'Sobre nossa Empresa', href: '/About' },
                { label: 'Politica de Privacidade', href: '/Politics' },
                { label: 'Orçamento', href: '/budget' },
            ]
        },
    ];

    return (
        <nav className='flex items-center'>
            <ul className='flex items-center gap-6 md:gap-8'>
                {dtLinks.map((link, index) => (
                    <li key={index} className="relative group py-2">
                        {link.drop ? (
                            <div className="flex items-center gap-1 cursor-pointer text-black font-semibold hover:text-yellow transition-colors duration-200">
                                <span>{link.label}</span>
                                <ChevronDown size={16} className="transition-transform duration-300 group-hover:rotate-180" />

                                <div className="absolute top-full left-0 mt-2 w-52 bg-white border border-gray/20 shadow-xl rounded-xl opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-60">
                                    <div className="py-2 flex flex-col">
                                        {link.drop.map((sub, i) => (
                                            <Link key={i} href={sub.href} className="px-4 py-2 text-sm text-darkGray hover:bg-gray/10 hover:text-blue transition-colors">
                                                {sub.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link href={link.href} className='relative text-black font-semibold hover:text-yellow transition-colors duration-200'>
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow transition-all duration-300 group-hover:w-full" />
                            </Link>
                        )}
                    </li>
                ))}
            </ul>

            <Link href='/budget' className="ml-8 bg-black text-white px-6 py-2.5 rounded-full font-medium hover:bg-blue hover:shadow-lg transition-all duration-300 active:scale-95">
                Orçamentos
            </Link>
        </nav>
    );
}