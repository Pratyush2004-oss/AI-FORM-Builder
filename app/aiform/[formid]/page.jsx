'use client'
import React, { useEffect, useState } from 'react'
import { db } from '../../../config'
import { JsonForms } from '../../../config/schema'
import { eq } from 'drizzle-orm'
import FormUi from '../../edit-form/_components/FormUi'
import Link from 'next/link'

const LiveAIForm = ({ params }) => {
    const [record, setRecord] = useState();
    const [jsonForm, setJsonForm] = useState([])

    useEffect(() => {
        params && getFormData()

    }, [])

    const getFormData = async () => {
        const result = await db.select().from(JsonForms)
            .where((eq(JsonForms.id, Number(params?.formid))))
        setRecord(result[0])
        setJsonForm(JSON.parse(result[0].jsonform))
    }
    return (
        <div className='flex p-10 justify-center items-center'
            style={{
                backgroundImage: record?.background
            }}
        >
            {record && <FormUi
                jsonForm={jsonForm}
                onFieldUpdate={() => console.log()}
                deleteField={() => console.log()}
                selectedStyle={JSON.parse(record.style)}
                selectedTheme={record.theme}
                editable={false}
                formID={record.id}
            />
            }
            <Link href={process.env.NEXT_PUBLIC_BASE_URL}
            className='flex gap-4 items-center bg-black px-3 text-white rounded-full py-1 fixed bottom-5 left-5 cursor-pointer'>
            <img src='/AI-Form Logo.png' className= 'rounded-full' width={80} height={80}/>
            Build Your Own AI Form
            </Link>
        </div>
    )
}

export default LiveAIForm