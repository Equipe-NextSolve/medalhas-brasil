import React from 'react'
import Image from 'next/image'

export default function Carousel() {
    return (
        <div className="flex items-center justify-center w-full h-[600px] pt-60">
            <div className="w-full">
                <Image
                    src="/slide.png"
                    width={1280}
                    height={600}
                    alt="Slide"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    )
}