import React from 'react'
import Image from 'next/image'

export default function Logo() {
    return (
        <div className='w-150'>
            <div className='m-0 h-20 w-20'>
                <Image
                    width={200}
                    height={200}
                    src='/logo.png'
                    alt='logo'
                    className=''
                />
            </div>
        </div>
    )
}