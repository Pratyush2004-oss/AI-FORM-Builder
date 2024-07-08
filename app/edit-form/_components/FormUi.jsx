'use client'

import React from 'react'
import FormEdit from './FormEdit'

function FormUi({ jsonForm, onFieldUpdate, deleteField, selectedTheme }) {

  return (
    <div className='p-5 rounded-lg md:w-[600px]' data-theme={selectedTheme}
    >
      <h2 className='font-bold text-center text-2xl'>{jsonForm?.formTitle}</h2>
      <h2 className='text-sm text-gray-400 text-center'>{jsonForm?.formSubheading || jsonForm?.formSubHeading}</h2>

      {jsonForm?.formFields?.map((field, idx) => (
        <div className='my-3' key={idx}>
          <label className="w-full">
            <div className="label relative">
              <span className="label-text font-mono font-bold">{field.fieldLabel}{(field.required || field.isRequired) && <span className='text-red-500 font-bold'> *</span>}</span>
              <div>
                <FormEdit
                  defaultValue={field}
                  onUpdate={(value) => onFieldUpdate(value, idx)}
                  deleteField={() => deleteField(idx)}
                />
              </div>
            </div>
            {(field.fieldType == 'select') ?
              <div className='my-3'>
                <select className="select w-full select-bordered">
                  <option className='' disabled selected>{field.placeholder}</option>
                  {field?.options?.map((option, idx) => (
                    <option key={idx} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              :
              (field.fieldType == 'file') ?
                <div className='my-3'>
                  <input
                    name={field.fieldName}
                    required={field.required}
                    type={field.fieldType}
                    placeholder={field.placeholder}
                    className="file-input file-input-bordered w-full" />
                </div>
                :
                (field.fieldType == 'textarea') ?
                  <div className='my-3'>
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
                    <div className='my-3'>
                      {field?.options.map((option, idx) => (
                        <label key={idx} className="label cursor-pointer justify-start">
                          <input
                            name={option}
                            type='radio'
                            value={option}
                            className="radio" />
                          <span className="label-text ml-3">{option}</span>
                        </label>
                      ))}
                    </div>
                    :
                    (field.fieldType == 'checkbox') ?
                      <div className='my-3'>
                        {field?.options ? field?.options.map((option, idx) => (
                          <label key={idx} className="label cursor-pointer justify-start ">
                            <input
                              name={option}
                              type='checkbox'
                              value={option}
                              className="checkbox checkbox-sm" />
                            <span className="label-text ml-3">{option}</span>
                          </label>
                        )) :
                          <input
                            name={field.fieldName}
                            type='checkbox'
                            value={field.fieldName}
                            className="checkbox checkbox-sm" />
                        }
                      </div>
                      :
                      <div classname='my-3'>
                        <input
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
    </div>
  )
}

export default FormUi