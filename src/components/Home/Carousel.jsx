"use client"
import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function Carousel() {

    const imgdesktop = [
        { id: 1, image: '/slide-descktop-01.png', alt: 'Slide 1' },
        { id: 2, image: '/slide-descktop-02.png', alt: 'Slide 2' },
        { id: 3, image: '/slide-descktop-03.png', alt: 'Slide 3' },
    ]

    const imgmobile = [
        { id: 1, image: '/slide-mobile-01.png', alt: 'Slide 1' },
        { id: 2, image: '/slide-mobile-02.png', alt: 'Slide 2' },
        { id: 3, image: '/slide-mobile-03.png', alt: 'Slide 3' },
    ]

    return (
        <section className="w-full min-h-[700] pt-10">

            <div className="hidden md:block w-full h-[800px]">
                <Swiper
                    modules={[Pagination, Autoplay]}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000 }}
                    loop
                    className="w-full h-full"
                >
                    {imgdesktop.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className="relative w-full h-[800px]">
                                <Image
                                    src={item.image}
                                    fill
                                    alt={item.alt}
                                    className="object-container"
                                    priority
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* MOBILE */}
            <div className="block md:hidden">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4000 }}
                    loop
                >
                    {imgmobile.map((item) => (
                        <SwiperSlide key={item.id}>
                            <Image
                                src={item.image}
                                width={600}
                                height={800}
                                alt={item.alt}
                                className="w-full h-auto object-cover"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

        </section>
    )
}