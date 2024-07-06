"use client"

import { SignedIn } from '@clerk/nextjs'
import React from 'react'
import Sidenav from './_components/Sidenav'
import BottomNav from './_components/BottomNav'

const DashboardLayout = ({ children }) => {
    return (
        <SignedIn>
            <div>
                <div className='hidden md:block md:w-64 fixed'>
                    <Sidenav />
                </div>
                <div className=' md:ml-64'>
                    {children}
                </div>
                <div className='md:hidden mb-0'>
                <BottomNav/>
                </div>
            </div>
        </SignedIn>
    )
}

export default DashboardLayout