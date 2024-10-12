'use client'

import React, { useRef, useState } from 'react'
import FormEdit from './FormEdit'
import { db } from '../../../config';
import { userResponse } from '../../../config/schema';
import moment from 'moment';
import toast from 'react-hot-toast';
import { usePathname } from 'next/navigation';
import { SignInButton, useUser } from '@clerk/nextjs';

function FormUi({ jsonForm, onFieldUpdate, deleteField, selectedTheme, selectedStyle, editable = true, formID = 0, enableSignin }) {

  {/* PathNAme Impport */ }
  const path = usePathname();

  {/* Checking for the user to signin */ }
  const { user, isSignedIn } = useUser();

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
    if (value) {
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
          <div className="flex items-center p-4">
            <div className="flex-1 ml-3">
              <p className="font-mono text-xl font-bold text-green-500">
                ✅Response Submitted Successfully !
              </p>
            </div>
          </div>
        </div>
      ))
    }
    else {
      toast.error('Internal Server Error')
    }
  }


  return (
    <div>
      <form
        ref={(e) => formRef = e}
        className='p-5 rounded-lg lg:w-[600px]' data-theme={selectedTheme}
        onSubmit={!path.includes('edit-form') ? onFormSubmit : (e) => e.preventDefault()}
        style={{
          boxShadow: selectedStyle?.key == 'boxshadow' && '5px 5px 0px black',
          border: selectedStyle?.key == 'border' && selectedStyle.value
        }}
      >
        <h2 className='text-lg font-bold text-center lg:text-2xl'>{jsonForm && (jsonForm?.formTitle).toUpperCase()}</h2>
        <h2 className='text-sm text-center text-gray-400'>{jsonForm?.formSubheading}</h2>

        {jsonForm?.formFields?.map((field, idx) => (
          <div className='my-3' key={idx}>
            <label className="w-full">
              <div className="relative label">
                <span className="font-mono font-bold label-text">{field.fieldLabel}{(field.required) && <span className='font-bold text-red-500'> *</span>}</span>
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
                    className="w-full select select-bordered">
                    <option disabled selected>{field.placeholder}</option>
                    {field?.options?.map((option, idx) => (
                      <option
                        key={idx}
                        value={option.value ? option.value : option}>
                        {option.label ? option.label : option}
                      </option>
                    ))}
                  </select>
                </div>
                :
                (field.fieldType == 'file') ?
                  <div >
                    <input
                      name={field.fieldName}
                      onChange={(e) => handleInputChange(e)}
                      required={field.required}
                      type={field.fieldType}
                      placeholder={field.placeholder}
                      className="w-full file-input file-input-bordered" />
                  </div>
                  :
                  (field.fieldType == 'textarea') ?
                    <div >
                      <textarea
                        name={field.fieldName}
                        onChange={(e) => handleInputChange(e)}
                        required={field.required}
                        type={field.fieldType}
                        placeholder={field.placeholder}
                        autoComplete='off'
                        className="w-full textarea textarea-bordered" />
                    </div>
                    :
                    (field.fieldType == 'radio') ?
                      <div>
                        {field?.options && field.options.map((option, idx) => (
                          <label
                            key={idx} className="justify-start cursor-pointer label">
                            <input
                              required={field.required}
                              onClick={(v) => handleSelectChange(field.fieldName, v.target.value)}
                              name={field.fieldName}
                              type='radio'
                              value={option.value ? option.value : option}
                              className="radio" />
                            <span className="ml-3 label-text">{option.label ? option.label : option}</span>
                          </label>
                        ))}
                      </div>
                      :
                      (field.fieldType == 'checkbox') ?
                        <div >
                          {field?.options ? field.options.map((option, idx) => (
                            <label
                              key={idx} className="justify-start cursor-pointer label ">
                              <input
                                required={field.required}
                                onChange={(v) => handleCheckboxChange(field?.fieldLabel, option?.label ? option.label : option, v.target.checked)}
                                name={field?.fieldLabel}
                                type='checkbox'
                                value='{field.value}'
                                className="checkbox checkbox-sm" />
                              <span className="ml-3 label-text">{option.label ? option.label : option}</span>
                            </label>
                          )) :
                            <div className='flex gap-3'>
                              <input
                                required={field.required}
                                name={field.fieldName}
                                type='checkbox'
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
                            className="w-full input input-bordered" />
                        </div>
              }
            </label>
          </div>
        ))}
        {!enableSignin ?
          <button
            type='submit'
            className='rounded-full btn btn-primary'>
            Submit
          </button>
          :
          isSignedIn ?
            <button
              type='submit'
              className='rounded-full btn btn-primary'>
              Submit
            </button>
            :
            <SignInButton
              mode='modal'
              className='rounded-full btn btn-primary'>
              Sign In before submit</SignInButton>
        }
      </form>
    </div >
  )
}

export default FormUi