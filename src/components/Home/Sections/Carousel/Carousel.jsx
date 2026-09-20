"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const desktopImages = [
    {
        id: "carousel-medal-01",
        image: "/carousel/carousel-medal-01.png",
        alt: "Troféus e medalhas para premiações",
    },
    {
        id: "carousel-medal-02",
        image: "/carousel/carousel-medal-02.png",
        alt: "Medalhas personalizadas para eventos",
    },
    {
        id: "carousel-medal-03",
        image: "/carousel/carousel-medal-03.png",
        alt: "Premiações personalizadas",
    },
];

const mobileImages = [
    {
        id: "carousel-mobile-01",
        image: "/mobile1.png",
        alt: "Troféus e medalhas para premiações",
    },
    {
        id: "carousel-mobile-02",
        image: "/mobile2.png",
        alt: "Medalhas personalizadas para eventos",
    },
];

export default function Carousel() {
    return (
        <section className="w-full pt-34">

            <div className="hidden w-full md:block">
                <Swiper
                    modules={[Pagination, Autoplay]}
                    slidesPerView={1}
                    spaceBetween={0}
                    speed={800}
                    loop
                    pagination={{ clickable: true, dynamicBullets: false, }}
                    autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true, }}
                    className="carousel-swiper aspect-1920/700 w-full"
                >
                    {desktopImages.map((item, position) => (
                        <SwiperSlide key={item.id} className="relative h-full w-full">
                            <Image
                                src={item.image}
                                alt={item.alt}
                                fill
                                priority={position === 0}
                                sizes="100vw"
                                quality={100}
                                className="object-cover"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="block w-full md:hidden">
                <Swiper
                    modules={[Pagination, Autoplay]}
                    slidesPerView={1}
                    spaceBetween={0}
                    speed={800}
                    loop
                    pagination={{ clickable: true, }}
                    autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true, }}
                    className="carousel-swiper aspect-9/16 w-full"
                >
                    {mobileImages.map((item, position) => (
                        <SwiperSlide key={item.id} className="relative h-full w-full">
                            <Image
                                src={item.image}
                                alt={item.alt}
                                fill
                                priority={position === 0}
                                sizes="100vw"
                                quality={100}
                                className="object-cover"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>


            <style jsx global>{
                `   
            .carousel-swiper .swiper-pagination {
                bottom: 18px !important;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 6px;
            }

            .carousel-swiper .swiper-pagination-bullet {
                width: 8px;
                height: 8px;
                margin: 0 !important;
                border-radius: 999px;
                background: var(--color-white);
                opacity: 0.65;
            transition:
                width 300ms ease,
                opacity 300ms ease,
                background-color 300ms ease;
            }

        .carousel-swiper .swiper-pagination-bullet-active {
                width: 28px;
                background: var(--color-yellow);
                opacity: 1;
            }`}
            </style>
        </section>
    );
}