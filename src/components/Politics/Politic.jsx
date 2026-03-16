import React from 'react'
import ContentPolitic from './ContentPolitic'
import PresentationPolitic from './PresentationPolitic'
import Messenger from '@/utils/Messenger'
import LoadingScreen from '@/utils/Loanding'

export default function Politic() {
    return (
        <LoadingScreen>
            <section className='w-full min-h-screen pt-15 -mb-20'>
                <ContentPolitic />
                <PresentationPolitic />
                <Messenger />
            </section>
        </LoadingScreen>
    )
}