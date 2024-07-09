'use client'

import React from 'react'
import FormEdit from './FormEdit'

function FormUi({ jsonForm, onFieldUpdate, deleteField, selectedTheme, selectedStyle, editable = true }) {

  return (
    <div className='p-5 rounded-lg md:w-[600px]' data-theme={selectedTheme}
      style={{
        boxShadow: selectedStyle?.key == 'boxshadow' && '5px 5px 0px black',
        border: selectedStyle?.key == 'border' && selectedStyle.value
      }}
    >
      <h2 className='font-bold text-center text-2xl'>{jsonForm?.formTitle}</h2>
      <h2 className='text-sm text-gray-400 text-center'>{jsonForm?.formSubheading || jsonForm?.formSubHeading}</h2>

      {jsonForm?.formFields?.map((field, idx) => (
        <div className='my-3' key={idx}>
          <label className="w-full">
            <div className="label relative">
              <span className="label-text font-mono font-bold">{field.fieldLabel}{(field.required || field.isRequired) && <span className='text-red-500 font-bold'> *</span>}</span>
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
                <select className="select w-full select-bordered">
                  <option disabled selected>{field.placeholder}</option>
                  {field?.options?.map((option, idx) => (
                    <option key={idx} value={option}>{option}</option>
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
                      <div >
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
                      <div>
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
      <button className='btn rounded-full btn-primary'>Submit</button>
    </div>
  )
}

export default FormUi