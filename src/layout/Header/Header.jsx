import React from 'react'
import Logo from './Logo'
import Navigation from './Navigation'

export default function Header() {
    return (
        <header className="fixed top-0 w-full h-20 bg-white z-50 shadow-md">
            <div className="max-w-7xl mx-auto flex items-center justify-between h-full px-6">
                <Logo />
                <Navigation />
            </div>
        </header>
    )
}