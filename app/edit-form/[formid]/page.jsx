'use client'

import React, { useEffect, useState } from 'react'
import { db } from '../../../config'
import { and, eq } from 'drizzle-orm'
import { JsonForms } from '../../../config/schema'
import { useUser } from '@clerk/nextjs'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import FormUi from '../_components/FormUi'


const EditForm = ({ params }) => {
  const { user } = useUser();
  const [jsonForm, SaveJsonForm] = useState();
  const router = useRouter();

  useEffect(() => {
    user && getFormData();
  }, [user])
  const getFormData = async () => {
    const result = await db.select().from (JsonForms)
      .where(and(eq(JsonForms.id, params?.formid),
        eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)));

    console.log(JSON.parse(result[0].jsonform));
    SaveJsonForm(JSON.parse(result[0].jsonform));
  }
  return (
    <div className='p-5'>
      <h2 className='btn btn-ghost my-2 hover:font-bold' onClick={() => router.back()}>
        <ArrowLeft /> Back
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        {/* Controller */}
        <div className='p-5 border rounded-lg shadow-md'>
          Controller
        </div>

        {/* Form */}
        <div className='md:col-span-2 border p-5 rounded-lg flex items-center justify-center'>
          <FormUi jsonForm = {jsonForm}/>
        </div>
      </div>

    </div>
  )
}

export default EditForm