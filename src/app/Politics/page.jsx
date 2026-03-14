import React from 'react'
import PresentationPolitic from './PresentationPolitic'
import ContentPolitic from './ContentPolitic'

export default function page() {
    return (
        <section className='w-full min-h-screen pt-15'>
            <ContentPolitic />
            <PresentationPolitic />
        </section>
    )
}