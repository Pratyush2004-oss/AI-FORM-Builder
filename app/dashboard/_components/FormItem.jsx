'use client'

import { useUser } from '@clerk/nextjs';
import { Edit, Share2, Trash2 } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { db } from '../../../config';
import { JsonForms, userResponse } from '../../../config/schema';
import { and, eq } from 'drizzle-orm';
import { RWebShare } from 'react-web-share';
import toast from 'react-hot-toast';

const FormItem = ({ jsonform, formRecord, refreshData }) => {
    {/* for dialog box */ }
    const [openDialog, setOpenDialog] = useState(false);
    const { user } = useUser();
    {/* Delete Form Functionality */ }
    const onDeleteForm = async (columnName) => {

        await db.update(userResponse).set({
            [columnName] : 0
        }).where(eq(userResponse.formRef,formRecord.id))

        const result = await db.delete(JsonForms)
            .where(and(eq(JsonForms.id, formRecord.id),
                eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)))

        if (result) {
            toast.custom((t) => (
                <div data-theme="luxury"
                    className={`${t.visible ? 'animate-enter' : 'animate-leave'
                        } max-w-md w-full shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                    <div className="flex p-4 items-center">
                        <div className="ml-3 flex-1">
                            <p className="text-xl font-mono text-red-500 font-bold">
                                ❌ Form Deleted Successfully ! ❌
                            </p>
                        </div>
                    </div>
                </div>
            ))
            refreshData();
        }
    }
    return (
        <div className='border w-full p-4 rounded-lg shadow-sm'>
            <h2 className='font-mono font-bold text-xl p-2 flex justify-between'>
                {jsonform.formTitle}

                <Trash2 className='h-7 w-7 cursor-pointer text-red-500' onClick={() => setOpenDialog(true)} />
                <dialog className="modal" open={openDialog}>
                    <div className="modal-box">
                        <h3 className="font-bold font-serif text-lg">Are you absolutely sure?</h3>
                        <p className="py-4 font-sans font-thin">This action connot be undone. This will permanently delete and remove your date fromm our servers.</p>
                        <div className='flex gap-3 justify-end'>
                            <button className='btn btn-outline btn-error' onClick={() => setOpenDialog(false)}>Cancel</button>
                            <button className='btn btn-primary'
                                onClick={() => {
                                    onDeleteForm('formRef')
                                    setOpenDialog(false)
                                }}
                            >Continue</button>
                        </div>
                    </div>
                </dialog>
            </h2>
            <h2 className='text-sm p-1 text-gray-500 line-clamp-2'>
                {jsonform.formSubheading}
            </h2>
            <hr className='py-2' />
            <div className='flex items-center justify-between p-2'>
                <RWebShare
                    data={{
                        text: jsonform?.formSubheading,
                        url: process.env.NEXT_PUBLIC_BASE_URL + 'aiform/' + formRecord.id,
                        title: jsonform.title,
                    }}
                    onClick={() => console.log("shared successfully!")}
                >
                    <button className='flex gap-2 btn btn-sm btn-outline btn-success'><Share2 className='h-5 w-5' /> <span className='hidden lg:block'>Share</span></button>
                </RWebShare>
                <Link href={'/edit-form/' + formRecord.id}>
                    <button className='flex gap-2 btn btn-sm btn-secondary'><Edit className='h-5 w-5' /><span className='hidden lg:block'>Edit</span></button>
                </Link>
            </div>
        </div>
    )
}

export default FormItem