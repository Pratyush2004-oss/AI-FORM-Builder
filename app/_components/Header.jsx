"use client"

import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
    const { user, isSignedIn } = useUser();
    return (
        <div className='p-3 border shadow-sm'>
            <div className='flex items-center justify-between'>
                <Image src={'/AI-FORM LOGO.png'} alt='logo' width={100} height={100} className='rounded-full ' />
                {isSignedIn ?
                    <div className='flex items-center gap-5'>
                        <Link href={'/dashboard'}>
                            <button className='btn btn-secondary'>DashBoard</button>
                        </Link>
                        <UserButton />
                    </div>
                    :
                    <Link href={'/sign-in'}>
                        <button className='btn btn-ghost'> Get Started </button>
                    </Link>
                }
            </div>
        </div>
    )
}

export default Header