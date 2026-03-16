import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { products } from '@/data/products'
export default function CardsProduts() {

    const featuredProducts = products.slice(0, 6)
    return (
        <section className="w-full bg-gray-100 py-16">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-14">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Confira Alguns de Nossos Produtos</h1>
                    <div className="w-40 h-[3px] bg-gray-300 mx-auto mt-4 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    
                    {featuredProducts.map((product) => (
                        <div
                            key={product.id}
                            
                            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer"
                        >
                            <div className="relative w-full h-[320px] overflow-hidden">
                                <Image
                                    src={product.image}
                                    alt={product.alt}
                                    fill
                                    className="object-cover group-hover:scale-105 transition duration-500" />

                            </div>
                            <p className='text-center p-3 font-semibold text-gray-800'>{product.name}</p>
                            {/* <p className='text-center px-3 pb-2 text-green-700 font-bold'>{product.price}</p> */}
                            <div className="p-5 flex justify-center">
                                <Link href={`/products/${product.id}`} className="bg-green-700 hover:bg-green-800 text-white font-medium px-6 py-2 rounded-lg transition duration-300">
                                    Acessar Produto
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}