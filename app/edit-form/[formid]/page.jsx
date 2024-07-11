'use client'

import React, { useEffect, useState } from 'react'
import { db } from '../../../config'
import { and, eq } from 'drizzle-orm'
import { JsonForms } from '../../../config/schema'
import { useUser } from '@clerk/nextjs'
import { ArrowLeft, Eye, Share2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import FormUi from '../_components/FormUi'
import Controller from '../_components/Controller'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { RWebShare } from 'react-web-share'



const EditForm = ({ params }) => {
  const { user } = useUser();
  const [jsonForm, SaveJsonForm] = useState();
  const router = useRouter();
  const [updateTrigger, setUpdateTrigger] = useState();
  const [record, setRecord] = useState([]);

  {/* Theme Controller */ }
  const [selectedTheme, setSelectedTheme] = useState('light');

  {/* BackGround Selector */ }
  const [selectedBackground, setSelectedBackground] = useState('');

  {/* BackGround Selector */ }
  const [selectedStyle, setSelectedStyle] = useState();


  useEffect(() => {
    user && getFormData();
  }, [user])


  const getFormData = async () => {
    const result = await db.select().from(JsonForms)
      .where(and(eq(JsonForms.id, params?.formid),
        eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)));

    setRecord(result[0])
    SaveJsonForm(JSON.parse(result[0].jsonform));
    setSelectedTheme(result[0].theme)
    setSelectedBackground(result[0].background)
    setSelectedStyle(JSON.parse(result[0].style))
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
    const result = await db.update(JsonForms).set({
      jsonform: jsonForm
    }).where(and(eq(JsonForms.id, record.id),
      eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)))
      .returning({ id: JsonForms.id })

    toast.custom((t) => (
      <div data-theme="luxury"
        className={`${t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >

        <div className="flex p-4 items-center">
          <div className="ml-3 flex-1">
            <p className="text-xl font-mono text-green-500 font-Bold">
              🔥 HURRY Successfully Updated !! 🔥
            </p>
            <p className="mt-1 text-yellow-500">
              Form fields has been updated Successfully !
            </p>
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

  const updateControllerFields = async (value, columnName) => {
    const result = await db.update(JsonForms).set({
      [columnName]: value
    }).where(and(eq(JsonForms.id, record.id),
      eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)))

    console.log(columnName, value)
    toast.custom((t) => (
      <div data-theme="luxury"
        className={`${t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex p-4 items-center">
          <div className="ml-3 flex-1">
            <p className="text-xl font-mono text-green-500 font-bold">
              🔥 HURRY, Successfully Updated !!🔥
            </p>
            <p className="mt-1 text-yellow-500">
              Layout has been Changed !
            </p>
          </div>
        </div>
      </div>
    ))
  }


  return (
    <div className='p-5'>
      <div className='flex justify-between items-center'>
        <h2 className='btn btn-ghost my-2 hover:font-bold' onClick={() => router.back()}>
          <ArrowLeft /> Back
        </h2>
        <div className='flex gap-3 '>
          <Link href={'/aiform/' + record.id} target='_blank'>
            <h2 className='btn btn-outline btn-secondary my-2 hover:font-bold'>
              Live Preview
              <Eye />
            </h2>
          </Link>
          {jsonForm &&
            <RWebShare
              data={{
                text: jsonForm?.formSubheading,
                url: process.env.NEXT_PUBLIC_BASE_URL + 'aiform/' + record.id,
                title: jsonForm.title,
              }}
              onClick={() => console.log("shared successfully!")}
            >
              <h2 className='btn btn-success my-2 hover:font-bold'>
                Share
                <img src='/Share.png' alt='share' width={15} height={15}></img>
              </h2>
            </RWebShare>
          }
        </div>

      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        {/* Controller */}
        <div className='p-5 border rounded-lg shadow-md'>
          <Controller
            selectedTheme={(value) => {
              updateControllerFields(value, 'theme')
              setSelectedTheme(value)
            }}
            selectedBackground={(value) => {
              updateControllerFields(value, 'background')
              setSelectedBackground(value)
            }}
            selectedStyle={(value) => {
              updateControllerFields(value, 'style');
              setSelectedStyle(value)
            }}
          />
        </div>

        {/* Form */}
        <div className='md:col-span-2 border p-5 rounded-lg flex items-center justify-center'
          style={{ backgroundImage: selectedBackground }}
        >
          <FormUi
            jsonForm={jsonForm}
            selectedTheme={selectedTheme}
            onFieldUpdate={onFieldUpdate}
            deleteField={(idx) => deleteField(idx)}
            selectedStyle={selectedStyle}
          />
        </div>
      </div>

    </div>
  )
}

export default EditForm