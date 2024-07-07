'use client'

import React from 'react'

const FormUi = ({ jsonForm }) => {
  return (
    <div className='border p-5 rounded-lg'>
      <h2 className='font-bold text-center text-2xl'>{jsonForm?.formTitle}</h2>
      <h2 className='text-sm text-gray-400 text-center'>{jsonForm?.formSubheading || jsonForm?.formSubHeading}</h2>

      {jsonForm?.formFields?.map((field, idx) => (
        <div>
          <div className='my-3' key={idx}>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-mono font-bold">{field?.fieldLabel}{field.required ? <span className='text-red-500 font-bold'> *</span> : <span></span>}</span>
              </div>
              {(field?.fieldType === 'select') ?
                <div>
                  <select className="select w-full select-bordered">
                    <option className='' disabled selected>{field.placeholder}</option>
                    {field?.options?.map((option, idx) => (
                      <option key={idx} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                :
                (field?.fieldType === 'file') ?
                  <div>
                    <input
                      name={field?.fieldName}
                      required={field?.required}
                      type={field.fieldType}
                      placeholder={field?.placeholder}
                      className="file-input file-input-bordered w-full max-w-xs" />
                  </div>
                  :
                  (field?.fieldType === 'textarea') ?
                    <div>
                      <textarea
                        name={field?.fieldName}
                        required={field?.required}
                        autoComplete='off'
                        type={field.fieldType}
                        placeholder={field?.placeholder}
                        className="textarea textarea-bordered w-full" />
                    </div>
                    :
                    (field?.fieldType === 'radio') ?
                      <div>
                        {field?.options?.map((option, idx) => (
                          <label key={idx} className="label cursor-pointer">
                            <input
                              name={option?.label}
                              type='radio'
                              value= {option.value}
                              className="radio" />
                            <span className="label-text ml-3">{option}</span>
                          </label>
                        ))}
                      </div>
                      :
                    (field?.fieldType === 'checkbox') ?
                      <div>
                        {field?.options ? field?.options?.map((option, idx) => (
                          <label key={idx} className="label cursor-pointer flex justify-start ">
                            <input
                              name={option}
                              type='checkbox'
                              value= {option}
                              className="checkbox checkbox-sm" />
                            <span className="label-text ml-3">{option}</span>
                          </label>
                        )) :
                        <label className="label cursor-pointer flex justify-start ">
                          <input
                            name={field?.fieldName}
                            type='checkbox'
                            value= {field?.fieldName}
                            className="checkbox checkbox-sm" />
                          <span className="label-text ml-3">{field?.fieldLabel}</span>
                        </label>
                      }
                      </div>
                      :
                      <div>
                        <input
                          name={field?.fieldName}
                          required={field?.required}
                          autoComplete='off'
                          type={field.fieldType}
                          placeholder={field?.placeholder}
                          className="input input-bordered w-full max-w-xs" />
                      </div>
              }
            </label>
          </div>
        </div>
      ))}
    </div>
  )
}

export default FormUi