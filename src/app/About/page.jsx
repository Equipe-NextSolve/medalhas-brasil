import React from 'react'
import About from './About'
import MedalAbout from './MedalAbout'
import Messenger from '@/utils/Messenger'

export default function page() {
    return (
        <div className='w-full min-h-screen pt-10'>
            <About />
            <MedalAbout />
            <Messenger />
        </div>
    )
}
