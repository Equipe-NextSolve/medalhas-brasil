import React from 'react'
import PresentationPolitic from './PresentationPolitic'
import ContentPolitic from './ContentPolitic'
import Messenger from '@/utils/Messenger'

export default function page() {
    return (
        <section className='w-full min-h-screen pt-15'>
            <ContentPolitic />
            <PresentationPolitic />
            <Messenger />
        </section>
    )
}