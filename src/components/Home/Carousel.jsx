"use client"
import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

export default function Carousel() {

    const imgdesktop = [
        { id: 1, image: '/banner11.png', alt: 'Slide 1' },
        { id: 2, image: '/banner1.png', alt: 'Slide 2' },
    ]

    const imgmobile = [
        { id: 1, image: '/mobile1.png', alt: 'Slide 1' },
        { id: 2, image: '/mobile2.png', alt: 'Slide 2' },
    ]

    return (

        <section className="w-full pt-24">

            <div className="hidden md:block w-full" style={{ aspectRatio: '1920/650' }}>
                <Swiper
                    modules={[Pagination, Autoplay]}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    loop
                    className="w-full h-full"
                >
                    {imgdesktop.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className="relative w-full h-full">
                                <Image
                                    src={item.image}
                                    fill
                                    alt={item.alt}
                                    className="object-cover"
                                    priority
                                    sizes="100vw"
                                    quality={100}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="block md:hidden w-full" style={{ aspectRatio: '9/16' }}>
                <Swiper
                    modules={[Pagination, Autoplay]}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    loop
                    className="w-full h-full"
                >
                    {imgmobile.map((item) => (
                        <SwiperSlide key={item.id} className="relative w-full h-full">
                            <Image
                                src={item.image}
                                fill
                                alt={item.alt}
                                className="object-cover"
                                priority
                                sizes="100vw"
                                quality={100}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

        </section>
    )
}