import React from 'react'
import About from '../../components/About/About'
import MedalAbout from '../../components/About/MedalAbout'
import Messenger from '@/utils/Messenger'

export default function page() {
    return (
        <div className='w-full min-h-screen pt-10 -mb-20'>
            <About />
            <MedalAbout />
            <Messenger />
        </div>
    )
}
