import React from 'react'
import About from './About'
import MedalAbout from './MedalAbout'

export default function page() {
    return (
        <div className='w-full min-h-screen pt-10'>
            <About />
            <MedalAbout />
        </div>
    )
}
