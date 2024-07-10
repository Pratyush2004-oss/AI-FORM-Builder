import { LibraryBig, LineChart, MessagesSquare, Shield } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CreateForm from './CreateForm';
import Link from 'next/link';
import { db } from '../../../config';
import { JsonForms } from '../../../config/schema';
import { desc, eq } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';

function Sidenav() {
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
        user && getFormList()
    }, [user])


    const getFormList = async () => {
        const result = await db.select().from(JsonForms)
            .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(JsonForms.id));
        setFormList(result)
    }

    return (
        <div>
            <div className='h-screen border shadow-md'>
                <div
                    className='p-5'>
                    {MenuList.map((menu, idx) => (
                        <Link
                            href={menu.path}
                            key={idx} className={`flex items-center gap-3 p-4 mb-3 text-gray-500 hover:bg-primary hover:text-white rounded-lg cursor-pointer
                        ${path === menu.path && 'bg-primary text-white'}
                        `}>
                            <menu.icon />
                            {menu.name}
                        </Link>
                    ))
                    }
                </div>
                {/*Progress hidden in small screen */}
                <div className='fixed bottom-6 p-6 w-64'>
                    <CreateForm />
                    {formList &&
                        <div className='w-52 my-5'>
                            <progress className="progress h-4 progress-secondary" value={(formList.length) / 10 * 100} max="100"></progress>
                            <h2 className='text-sm mt-2 text-gray-600'><strong>{formList.length} </strong>out of <strong>10 </strong>fiie Created.. </h2>
                            <h2 className='text-xs mt-3 text-gray-600'>Upgrade your plan for unlimited AI form Builder </h2>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Sidenav