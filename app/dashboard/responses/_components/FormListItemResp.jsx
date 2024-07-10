import { Share } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { db } from '../../../../config'
import { userResponse } from '../../../../config/schema'
import { eq } from 'drizzle-orm'
import * as XLSX from 'xlsx'

function FormListItemResp({ jsonForm, formRecord }) {

    const [responseNumber, setResponseNumber] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getResponseNumber();
    }, [formRecord])

    const getResponseNumber = async () => {
        const result = await db.select().from(userResponse)
            .where(eq(userResponse.formRef, formRecord.id))
        setResponseNumber(result.length)
    }

    const exportData = async () => {
        let jsonData = [];
        setLoading(true);
        const result = await db.select().from(userResponse)
            .where(eq(userResponse.formRef, formRecord.id))
        if (result) {
            result.forEach((item) => {
                const jsonItem = JSON.parse(item.jsonResponse)
                jsonData.push(jsonItem);
            })
            setLoading(false);
        }
        exportToExcel(jsonData)
    }

    {/* Convert JSON to EXCEL and then download */ }
    const exportToExcel = (jsonData) => {
        const worksheet = XLSX.utils.json_to_sheet(jsonData);
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, worksheet, "Sheet1");

        XLSX.writeFile(workBook, jsonForm?.formTitle + ".xlsx")
    }


    return (
        <div className='border w-full p-4 rounded-lg shadow-sm my-5'>
            <h2 className='font-mono font-bold text-xl p-2 flex justify-between'>
                {jsonForm.formTitle}
            </h2>
            <h2 className='text-sm p-1 text-gray-500 line-clamp-2'>
                {jsonForm.formSubheading}
            </h2>
            <hr className='py-2' />
            <div className='flex items-center justify-between p-2'>
                {responseNumber &&
                    <h2 className='text-sm'><strong>{responseNumber}</strong> Responses</h2>
                }
                <button
                    disabled={loading}
                    onClick={() => exportData()}
                    className='btn btn-info btn-outline btn-sm hover:scale-110'>
                    {loading ?

                        <span className='loading loading-infinity text-info'></span>
                        :
                        <div className='flex items-center gap-2'>
                            <Share className='w-4 h-4 ' />
                            <span className='hidden lg:block'>Export</span>
                        </div>
                    }
                </button>
            </div>
        </div>
    )
}

export default FormListItemResp