'use client'

import React, { use, useEffect, useState } from 'react'
import { db } from '../../../config'
import { JsonForms } from '../../../config/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import FormListItemResp from './_components/FormListItemResp'

const Responses = () => {
    const { user } = useUser();
    const [formList, setFormList] = useState([]);

    useEffect(() => {
        user && getFormList();
    }, [user])
    const getFormList = async () => {
        const result = await db.select().from(JsonForms)
            .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(JsonForms.id))
        setFormList(result)
    }
    return (
        <div className='pb-24 md:pb-0'>
            <div className='p-10 flex justify-between items-center'>
                <h2 className='text-2xl font-bold'>Responses </h2>
            </div>

            <div className='px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                {formList.map((form, idx) => (
                    <FormListItemResp
                        formRecord={form}
                        jsonForm={JSON.parse(form.jsonform)}
                    />

                ))}
            </div>
        </div>
    )
}

export default Responses