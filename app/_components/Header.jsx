"use client"

import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const Header = () => {
    const {user,isSignedIn} = useUser();
    return (
        <div className='p-3 border shadow-sm'>
            <div className='flex items-center justify-between'>
                <Image src={'/AI-FORM LOGO.png'} alt='logo' width={100} height={100} className='rounded-full '/>
                {isSignedIn ? 
                    <div className='flex items-center gap-5'>
                    <Button variant="outline">DashBoard</Button>
                    <UserButton/>
                    </div>
                    :
                    <Button> Get Started </Button>
                }
                </div>
        </div>
    )
}

export default Header