"use client"
import React from 'react'
import CreateForm from './_components/CreateForm'

const Dashboard = () => {
  return (
    <div className='p-10 flex justify-between items-center'>
        <h2 className='text-2xl font-bold flex items-center justify-between'>Dashboard
        </h2>
        <CreateForm/>
    </div>
  )
}

export default Dashboard