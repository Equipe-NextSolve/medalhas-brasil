import React from 'react'
import Image from 'next/image'

export default function Carousel() {
    return (
        <div className="w-full min-h-screen pt-20">
            <div className="w-ful">

                {/* Desktop */}
                <Image
                    src="/slide.png"
                    width={1280}
                    height={600}
                    alt="Slide"
                    className="hidden md:block w-full h-full object-contain"
                />

                {/* Mobile */}
                <Image
                    src="/slide-mobile.png"
                    width={600}
                    height={800}
                    alt="Slide"
                    className="block md:hidden w-full h-full object-contain"
                />

            </div>
        </div>
    )
}