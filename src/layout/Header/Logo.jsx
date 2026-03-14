import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
    return (
        <div className='w-150'>
            <div className='m-0 h-20 w-20'>
                <Link href='/'>
                    <Image
                        width={300}
                        height={300}
                        src='/logo2.png'
                        alt='logo'
                        className=''
                    />
                </Link>
            </div>
        </div>
    )
}