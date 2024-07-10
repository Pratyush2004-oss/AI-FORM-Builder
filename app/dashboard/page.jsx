"use client"
import React from 'react'
import CreateForm from './_components/CreateForm'
import FormList from './_components/FormList'

const Dashboard = () => {
  return (
    <div>
      <div className='p-10 flex justify-between items-center'>
        <h2 className='text-2xl font-bold'>Dashboard </h2>
        <CreateForm />
      </div>
      <div className='px-10'>
      <FormList/>

      </div>
    </div>
  )
}

export default Dashboard