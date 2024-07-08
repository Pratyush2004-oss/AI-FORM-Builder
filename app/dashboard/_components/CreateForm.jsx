import { X } from 'lucide-react'
import React, { useState } from 'react'
import { AIChatSession } from '../../../config/AImodal'
import { useUser } from '@clerk/nextjs'
import { db } from '../../../config/index'
import { JsonForms } from '../../../config/schema'
import moment from 'moment'
import { useRouter } from 'next/navigation'

const PROMPT = ' , On the basis of description please give form in json format with form title, form subheading with form having form field, form name, placeholder name, and form label, fieldtype and field required in JSON format'
const CreateForm = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useUser();
    const route = useRouter();

    const onCreateForm = async () => {
        setLoading(true);
        const result = await AIChatSession.sendMessage("Description: " + userInput + PROMPT);
        console.log(result.response.text());
        if (result.response.text()) {
            const resp = await db.insert(JsonForms)
                .values({
                    jsonform: result.response.text(),
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    createdAt: moment().format('DD/MM//yyyy')
                }).returning({ id: JsonForms.id });
            console.log("New Form ID : ", resp[0].id)
            if (resp[0].id) {
                route.push('/edit-form/' + resp[0].id);
            }
            setLoading(false);
        }
    }
    return (
        <div>
            <button className="btn w-full btn-secondary" onClick={() => setOpenDialog(true)}> <h5>+ Create Form</h5></button>
            <dialog className="modal" open={openDialog}>
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setOpenDialog(false)}><X /></button>
                    </form>
                    <h3 className="font-bold text-xl">Create new Form!</h3>
                    <textarea
                        className='w-full rounded-lg p-3 my-2 text-sm outline outline-2 outline-gray-500'
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder='Write Description of Your Form' />
                    <div className='flex gap-3 mt-2 justify-end'>
                        <button
                            disabled={loading || userInput === ''}
                            className='btn btn-secondary' onClick={(onCreateForm)}>
                            {loading ? <span className='loading loading-dots loading-sm'></span> : <sapn>Create</sapn>}
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default CreateForm