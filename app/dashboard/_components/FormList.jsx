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
        <div className={` ${formList.length > 0 ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5' : ''}`}>
            {formList.length > 0 ?
                formList.map((form, idx) => (
                    <FormItem
                        key={idx}
                        formRecord={form}
                        jsonform={JSON.parse(form.jsonform)}
                        refreshData={getFormList}
                    />
                ))
                :
                <h2 className='w-full text-center text-3xl text-warning'>No Form Created, Create a new one by clicking the <strong className='text-red-700'> + Create Form</strong> button</h2>
            } 
        </div>
    )
}

export default FormList