"use client"

import { SignedIn } from '@clerk/nextjs'
import React from 'react'
import Sidenav from './_components/Sidenav'
import BottomNav from './_components/BottomNav'

const DashboardLayout = ({ children }) => {
    return (
        <SignedIn>
            <div className='hidden md:block md:w-64 fixed'>
                <Sidenav />
            </div>
            <div className=' md:ml-64 pb-28 relative'>
                {children}
            </div>
            <div className='md:hidden w-full fixed bottom-0 left-0'>
                <BottomNav />
            </div>
        </SignedIn>
    )
}

export default DashboardLayout