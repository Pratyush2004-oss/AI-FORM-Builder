import { LibraryBig, LineChart, MessagesSquare, Shield } from 'lucide-react'
import React from 'react'

function Sidenav() {
    const MenuList = [
        {
            id: 1,
            name: 'My Forms',
            icon: LibraryBig,
            path: '/'
        },
        {
            id: 2,
            name: 'Responses',
            icon: MessagesSquare,
            path: '/'
        },
        {
            id: 3,
            name: 'Analytics',
            icon: LineChart,
            path: '/'
        },
        {
            id: 4,
            name: 'Upgrade',
            icon: Shield,
            path: '/'
        },
    ]
    return (
        <div>
            <div className='h-screen border shadow-md'>
                <div className='p-5'>
                    {MenuList.map((menu, idx) => (
                        <h2 key={idx} className='flex items-center gap-3 p-4 hover:bg-primary hover:text-white rounded-lg'>
                            <menu.icon />
                            {menu.name}
                        </h2>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Sidenav