'use client'

import React, { useEffect, useState } from 'react'
import { db } from '../../../config'
import { and, eq } from 'drizzle-orm'
import { JsonForms } from '../../../config/schema'
import { useUser } from '@clerk/nextjs'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import FormUi from '../_components/FormUi'
import toast from 'react-hot-toast'



const EditForm = ({ params }) => {
  const { user } = useUser();
  const [jsonForm, SaveJsonForm] = useState();
  const router = useRouter();
  const [updateTrigger, setUpdateTrigger] = useState();
  const [record, setRecord] = useState([]);

  useEffect(() => {
    user && getFormData();
  }, [user])
  const getFormData = async () => {
    const result = await db.select().from(JsonForms)
      .where(and(eq(JsonForms.id, params?.formid),
        eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)));

    setRecord(result[0])
    SaveJsonForm(JSON.parse(result[0].jsonform));
  }
  {/* Function to Update the Fields.... */ }
  useEffect(() => {
    if (updateTrigger) {
      SaveJsonForm(jsonForm);
      updateJsonForminDB();
    }
  }, [updateTrigger])
  const onFieldUpdate = (value, idx) => {
    jsonForm.formFields[idx].fieldLabel = value.label;
    jsonForm.formFields[idx].placeholder = value.placeholder;
    setUpdateTrigger(Date.now())
  }

  const updateJsonForminDB = async () => {
    const result = await db.update(JsonForms)
      .set({
        jsonform: jsonForm
      }).where(and(eq(JsonForms.id, record.id),
        eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)))

    toast.custom((t) => (
      <div
        className={`${t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="ml-3 flex-1">
              <p className="text-lg font-mono text-green-700 font-Bold">
                HURRY !!
              </p>
              <p className="mt-1 text-gray-500">
                Successfully Updated !!
              </p>
            </div>
          </div>
        </div>
      </div>
    ))
  }

  const deleteField = (indextoRemove) => {
    const result = jsonForm.formFields.filter((item, idx) => idx != indextoRemove)
    jsonForm.formFields = result;
    setUpdateTrigger(Date.now())

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
        <div className='md:col-span-2 border p-5 rounded-lg flex items-center bg-slate-100 justify-center'>
          <FormUi
            jsonForm={jsonForm}
            onFieldUpdate={onFieldUpdate}
            deleteField={(idx) => deleteField(idx)}
          />
        </div>
      </div>

    </div>
  )
}

export default EditForm