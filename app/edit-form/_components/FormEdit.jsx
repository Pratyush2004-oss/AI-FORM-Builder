import { Edit, Trash2 } from 'lucide-react'
import React, { useState,useEffect } from 'react'

function FormEdit({ defaultValue }) {

    const [label, setLabel] = useState();
    const [placeholder, setPlaceholder] = useState();

    useEffect(()=>{

    },[defaultValue])

    return (
        <div className='flex gap-3'>

            {/* For Editing the Field */}
            <button className="h-4 w-4 text-gray-500" onClick={() => document.getElementById('my_modal_3').showModal()}><Edit /></button>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Edit Feilds</h3>
                    <div>
                        <label className='text-xs'>Form label</label>
                        <input
                            className="input input-bordered w-full"
                            type='text'
                            defaultValue={defaultValue.fieldLabel}
                            onChange={(e) => setLabel(e.target.value)}
                        />
                    </div>
                    <p className="py-4">Press ESC key or click on ✕ button to close</p>
                </div>
            </dialog>

            {/* For Delete of the field */}
            <button className='h-4 w-4 text-red-500'>
                <Trash2 />
            </button>
        </div>
    )
}

export default FormEdit