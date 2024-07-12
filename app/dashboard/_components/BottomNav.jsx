import { LibraryBig, LineChart, MessagesSquare, Shield } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { db } from '../../../config';
import { JsonForms } from '../../../config/schema';
import { desc, eq } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';

function BottomNav() {
    const MenuList = [
        {
            id: 1,
            name: 'My Forms',
            icon: LibraryBig,
            path: '/dashboard'
        },
        {
            id: 2,
            name: 'Responses',
            icon: MessagesSquare,
            path: '/dashboard/responses'
        },
        {
            id: 3,
            name: 'Analytics',
            icon: LineChart,
            path: '/dashboard/analytics'
        },
        {
            id: 4,
            name: 'Upgrade',
            icon: Shield,
            path: '/dashboard/upgrade'
        },
    ]

    const { user } = useUser();
    const [formList, setFormList] = useState();
    const path = usePathname();
    useEffect(() => {
        user && getFormList();
    }, [user])

    const getFormList = async () => {
        const result = await db.select().from(JsonForms)
            .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(JsonForms.id));
        setFormList(result)
    }

    return (
        <div>
            <div className='border shadow-md sticky bottom-0 left-0 w-full bg-white'>
                <div className='px-6 border py-2'>
                    <div className='w-full'>
                        <h2 className='text-xl font-extrabold font-mono'>Progress</h2>
                        {formList &&
                            <div>
                                <progress className="progress w-full h-3 progress-secondary" value={(formList.length) / 10 * 100} max="100"></progress>
                                <h2 className='text-sm mt-2 text-gray-600'><strong>{formList.length} </strong>out of <strong>15 </strong>fiie Created.. </h2>
                            </div>
                        }
                    </div>
                </div>
                <div className='p-3 flex items-center justify-evenly'>
                    {MenuList.map((menu, idx) => (
                        <Link href={menu.path} key={idx} className={`flex flex-col items-center p-4 text-gray-500 hover:bg-primary hover:text-white rounded-lg cursor-pointer
                            ${path === menu.path && 'bg-primary text-white'}
                            `}>
                            <menu.icon />
                            <span className='hidden md:block'>{menu.name}</span>
                        </Link>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}

export default BottomNav