'use client'
import React from 'react'
import PricingPlan from '../../_Data/PricingPlan'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'

function Upgrade() {
    const {user} = useUser();
    return (
        <div className='p-10'>
            <h2 className='text-2xl font-bold'>Pricing </h2>
            <div className="max-w-screen-xl h-max m-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 sm:items-stretch xl:grid-cols-3 md:gap-8">
                    {PricingPlan.map((plan, idx) => (
                        <div
                            key={idx}
                            className="rounded-2xl border border-indigo-600 p-6 shadow-sm ring-1 ring-indigo-600 sm:order-last sm:px-8 lg:p-12"
                        >
                            <div className="text-center">
                                <h2 className="text-xl font-mono font-bold text-gray-900">
                                    {plan.name}
                                    <span className="sr-only">Plan</span>
                                </h2>

                                <p className="mt-2 sm:mt-4">
                                    <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">₹ {plan.price} </strong>

                                    <span className="text-sm font-medium text-gray-700">{plan.duration}</span>
                                </p>
                            </div>

                            <ul className="mt-6 space-y-2">
                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-5 text-indigo-700"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>

                                    <span className="text-gray-700"> Unlimited Forms </span>
                                </li>

                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-5 text-indigo-700"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>

                                    <span className="text-gray-700"> Help center access </span>
                                </li>

                                <li className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-5 text-indigo-700"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>

                                    <span className="text-gray-700"> Phone support </span>
                                </li>
                            </ul>

                            <Link
                                href={plan.link + '?prefilled_email=' + user?.primaryEmailAddress?.emailAddress}
                                target='_blank'
                                className="mt-8 block rounded-full border border-indigo-600 bg-indigo-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-indigo-700 hover:ring-1 hover:ring-indigo-700 focus:outline-none focus:ring active:text-indigo-500"
                            >
                                Get Started
                            </Link>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default Upgrade