import { Edit, Trash2 } from 'lucide-react'
import React, { useState, useEffect } from 'react'

function FormEdit({ defaultValue, onUpdate, deleteField }) {

    const [label, setLabel] = useState(defaultValue?.fieldLabel);
    const [placeholder, setPlaceholder] = useState(defaultValue?.placeholder);

    {/* for dialog box */ }
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {

    }, [defaultValue])

    return (
        <div className='flex m-2 gap-3'>

            {/* For Editing the Field */}
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="h-4 w-4 text-gray-500"><Edit /></div>
                <div tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-64 p-2 shadow">
                    <h3 className="font-bold text-lg font-mono">Edit Feilds</h3>
                    <label className='text-xs font-mono my-2'>Form label</label>
                    <input
                        className="input input-bordered h-8 w-full"
                        type='text'
                        defaultValue={defaultValue.fieldLabel}
                        onChange={(e) => setLabel(e.target.value)}
                    />
                    <label className='text-xs font-mono my-2'>PlaceHolder</label>
                    <input
                        className="input input-bordered h-8 w-full"
                        type='text'
                        defaultValue={defaultValue.placeholder}
                        onChange={(e) => setPlaceholder(e.target.value)}
                    />
                    <button className='btn-sm btn my-2 btn-primary'
                        onClick={() => onUpdate({
                            label: label,
                            placeholder: placeholder
                        })}
                    >Update</button>
                </div>
            </div>


            {/* For Delete of the field */}
            <button className='h-4 w-4 text-red-500' onClick={() => setOpenDialog(true)}>
                <Trash2 />
            </button>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <dialog className="modal" open={openDialog}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are you absolutely sure?</h3>
                    <p className="py-4">This action connot be undone. This will permanently delete and remove your date fromm our servers.</p>
                    <div className='flex gap-3 justify-end'>
                        <button className='btn btn-outline btn-ghost' onClick={() => setOpenDialog(false)}>Cancel</button>
                        <button className='btn btn-primary'
                        onClick={()=>deleteField() & setOpenDialog(false)}
                        >Continue</button>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default FormEdit