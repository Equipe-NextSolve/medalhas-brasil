import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
    return (
        <Link href='/'>
            <div className='h-20 w-20'>
                <Image
                    width={300}
                    height={300}
                    src='/logo2.png'
                    alt='logo'
                    className='w-full h-full object-contain'
                />
            </div>
        </Link>
    )
}