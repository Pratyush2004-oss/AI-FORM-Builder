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
        console.log(result);
    }
    return (
        <div className='flex items-center justify-center p-10'
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
                enableSignin={record.enableSignIn}
            />
            }
            <Link href={process.env.NEXT_PUBLIC_BASE_URL}
                className='fixed flex items-center gap-4 px-3 py-1 text-white bg-black rounded-full cursor-pointer bottom-3 right-3'>
                <img src='/AI-Form Logo.png' className='rounded-full' width={50} height={50} />
                Build Your Own AI Form
            </Link>
        </div>
    )
}

export default LiveAIForm