'use client'

import React, { useRef, useState } from 'react'
import FormEdit from './FormEdit'
import { db } from '../../../config';
import { userResponse } from '../../../config/schema';
import moment from 'moment';
import toast from 'react-hot-toast';
import { usePathname } from 'next/navigation';

function FormUi({ jsonForm, onFieldUpdate, deleteField, selectedTheme, selectedStyle, editable = true, formID }) {

  {/* PathNAme Impport */}
  const path = usePathname();

  const [formData, setFormData] = useState();
  let formRef = useRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleCheckboxChange = (fieldName, OptionName, value) => {
    const list = formData?.[fieldName] ? formData?.[fieldName] : [];
    if (value === 'true') {
      list.push({
        label: OptionName,
        value: value
      })
    }
    setFormData({
      ...formData,
      [fieldName]: list
    })
  }

  const onFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)

    const result = await db.insert(userResponse)
      .values({
        jsonResponse: formData,
        createdAt: moment().format('DD/MM/yyyy'),
        formRef: formID
      })

    if (result) {
      formRef.reset();
      toast.custom((t) => (
        <div data-theme="forest"
          className={`${t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-md w-full shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex p-4 items-center">
            <div className="ml-3 flex-1">
              <p className="text-xl font-mono text-green-500 font-bold">
                ✅Response Submitted Successfully !
              </p>
            </div>
          </div>
        </div>
      ))
    }
    else{
      toast.error('Internal Server Error')
    }
  }


  return (
    <form
      ref={(e) => formRef = e}
      className='p-5 rounded-lg md:w-[600px]' data-theme={selectedTheme}
      onSubmit={!path.includes('edit-form') ? onFormSubmit : (e)=>e.preventDefault()}
      style={{
        boxShadow: selectedStyle?.key == 'boxshadow' && '5px 5px 0px black',
        border: selectedStyle?.key == 'border' && selectedStyle.value
      }}
    >
      <h2 className='font-bold text-center text-2xl'>{jsonForm?.formTitle}</h2>
      <h2 className='text-sm text-gray-400 text-center'>{jsonForm?.formSubheading}</h2>

      {jsonForm?.formFields?.map((field, idx) => (
        <div className='my-3' key={idx}>
          <label className="w-full">
            <div className="label relative">
              <span className="label-text font-mono font-bold">{field.fieldLabel}{(field.required) && <span className='text-red-500 font-bold'> *</span>}</span>
              <div>
                {editable &&
                  <FormEdit
                    defaultValue={field}
                    onUpdate={(value) => onFieldUpdate(value, idx)}
                    deleteField={() => deleteField(idx)}
                  />
                }
              </div>
            </div>
            {(field.fieldType == 'select') ?
              <div >
                <select
                  onChange={(v) => handleSelectChange(field.fieldName, v.target.value)}
                  required={field.fieldType}
                  className="select w-full select-bordered">
                  <option disabled selected>{field.placeholder}</option>
                  {field?.options?.map((option, idx) => (
                    <option
                      key={idx}
                      value={option | option.value}>{option | option.label}</option>
                  ))}
                </select>
              </div>
              :
              (field.fieldType == 'file') ?
                <div >
                  <input
                    name={field.fieldName}
                    required={field.required}
                    type={field.fieldType}
                    placeholder={field.placeholder}
                    className="file-input file-input-bordered w-full" />
                </div>
                :
                (field.fieldType == 'textarea') ?
                  <div >
                    <textarea
                      name={field.fieldName}
                      required={field.required}
                      type={field.fieldType}
                      placeholder={field.placeholder}
                      autoComplete='off'
                      className="textarea textarea-bordered w-full" />
                  </div>
                  :
                  (field.fieldType == 'radio') ?
                    <div>
                      {field?.options && field.options.map((option, idx) => (
                        <label
                          key={idx} className="label cursor-pointer justify-start">
                          <input
                            required={field.required}
                            onClick={(v) => handleSelectChange(field.fieldName, v.target.value)}
                            name={field.fieldName}
                            type='radio'
                            value={option.value}
                            className="radio" />
                          <span className="label-text ml-3">{option.label}</span>
                        </label>
                      ))}
                    </div>
                    :
                    (field.fieldType == 'checkbox') ?
                      <div >
                        {field?.options ? field.options.map((option, idx) => (
                          <label
                            key={idx} className="label cursor-pointer justify-start ">
                            <input
                              required={field.required}
                              onChange={(v) => handleCheckboxChange(field?.fieldLabel, option?.label, v.target.value)}
                              name={field?.fieldLabel}
                              type='checkbox'
                              value='true'
                              className="checkbox checkbox-sm" />
                            <span className="label-text ml-3">{option?.label}</span>
                          </label>
                        )) :
                          <div className='flex gap-3'>
                            <input
                              required={field.required}
                              name={field.fieldName}
                              type='checkbox'
                              value='true'
                              className="checkbox checkbox-sm" />
                            <label>{field.fieldLabel}</label>
                          </div>
                        }
                      </div>
                      :
                      <div>
                        <input
                          onChange={(e) => handleInputChange(e)}
                          name={field.fieldName}
                          required={field.required}
                          type={field.fieldType}
                          placeholder={field.placeholder}
                          autoComplete='off'
                          className="input input-bordered w-full" />
                      </div>
            }
          </label>
        </div>
      ))}
      <button
        type='submit'
        className='btn rounded-full btn-primary'>Submit</button>
    </form>
  )
}

export default FormUi