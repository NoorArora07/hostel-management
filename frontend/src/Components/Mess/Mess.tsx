'use client'
import React from "react";
import { PencilSquareIcon, BanknotesIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/20/solid';
import { Button } from "@/Components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import messPic from '@/Photos/mess-pic.jpg';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    name: 'Get Your Mess Details',
    description:
      'Including a calendar to keep track of your mess schedule and mess menu, plan your meals accordingly :)',
    icon: PencilSquareIcon,
    actions: [
      { text: 'View Updates', path: '/mess-schedule-view' },
      { text: 'View Menu', path: '/mess-menu' },
    ],
  },
  {
    name: 'Pay Your Mess Fee',
    description: "Can't keep a track of your mess fee? We got you covered. Pay your mess fee online",
    icon: BanknotesIcon,
    actions: [
      { text: 'View Fee Structure', path: '/view-mess-fee' },
      { text: 'Pay Now', path: '/pay-mess-fee' },
    ],
  },
  {
    name: 'Update Mess Leave Days',
    description: 'Going out for a vacation? Update your leave days and we will take care of the rest.',
    icon: ClipboardDocumentCheckIcon,
    actions: [
      { text: 'View Leaves', path: '/mess-leave-view' },
      { text: 'Update Leaves', path: '/mess-leave-form' },
    ],
  },
]

export default function Mess() {
  const navigate = useNavigate();
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-20px font-semibold text-indigo-600 font-sans">Dormify Mess</h2>
              <p className="mt-5 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                Manage Your Mess
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon aria-hidden="true" className="absolute left-1 top-1 size-5 text-indigo-600" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                    <dd className="mt-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white 
                            font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                            Options
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {feature.actions.map((action, index) => (
                            <DropdownMenuItem key={index} onSelect={() => handleNavigation(action.path)}>
                              {action.text}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            src={messPic} 
            alt="Mess"
            width={2432}
            height={1442}
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
    </div>
  )
}

