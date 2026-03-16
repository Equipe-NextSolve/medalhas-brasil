import React from 'react'
import InitialAbout from './InitialAbout'
import MedalAbout from './MedalAbout'
import Messenger from '@/utils/Messenger'
import LoadingScreen from '@/utils/Loanding'

export default function About() {
    return (
        <LoadingScreen>
            <section className='w-full min-h-screen pt-10 -mb-20'>
                <InitialAbout />
                <MedalAbout />
                <Messenger />
            </section>
        </LoadingScreen>
    )
}