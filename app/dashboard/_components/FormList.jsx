'use client'

import React, { useEffect, useState } from 'react'
import { db } from '../../../config'
import { JsonForms } from '../../../config/schema'
import { desc, eq } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'
import FormItem from './FormItem'

const FormList = () => {
    const { user } = useUser();
    const [formList, setFormList] = useState([]);

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
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
            {formList.map((form, idx) => (
                <FormItem
                    key={idx}
                    formRecord={form}
                    jsonform={JSON.parse(form.jsonform)}
                    refreshData={getFormList}
                />
            ))}
        </div>
    )
}

export default FormList