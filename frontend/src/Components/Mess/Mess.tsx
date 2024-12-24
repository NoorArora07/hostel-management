// "use client";
import React from "react";

// import { Calendar } from "@/Components/ui/calendar";
// import { Button } from "@/Components/ui/button";

// export default function Mess() {
//   return (
//     <>
//     <div className="p-8 space-y-12">
//       {/* Section 1: Calendar */}
//       <section className="space-y-4">
//         <h2 className="text-xl font-semibold">Mess Schedule</h2>
//         <div className="border p-4 rounded-md shadow">
//           <Calendar 
//             mode="single" 
//             onSelect={(date) => console.log("Selected Date:", date)} 
//           />
//         </div>
//       </section>

//       {/* Section 2: Status of Mess Fee */}
//       <section className="space-y-4">
//         <h2 className="text-xl font-semibold">Mess Fee</h2>
//         <div className="flex items-center justify-between border p-4 rounded-md shadow">
//           <span className="text-lg">Status of Mess Fee:</span>
//           <span className="text-lg font-medium text-green-600">Paid</span>
//           <Button variant="outline">View Details</Button>
//         </div>
//       </section>

//       {/* Section 3: Submit Leave Days */}
//       <section className="space-y-4">
//         <h2 className="text-xl font-semibold">Submit Leave Days</h2>
//         <div className="border p-4 rounded-md shadow">
//           <p className="mb-4">Specify the days you will be on leave from the mess:</p>
//           <Button onClick={() => console.log("Leave days submitted!")}>Submit Leave Days</Button>
//         </div>
//       </section>
//     </div>
//     </>
//   );
// }

'use client'

import { PencilSquareIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid';
import { Button } from "@/Components/ui/button";
import calender from "@/Photos/calender.jpg";

const features = [
  {
    name: 'Get Your Mess Schedule',
    description:
      'Including a calendar to keep track of your mess schedule and plan your meals accordingly.',
    icon: PencilSquareIcon,
    buttonText: 'View Schedule',
  },
  {
    name: 'Pay Your Mess Fee',
    description: "Can't keep a track of your mess fee? We got you covered. Pay your mess fee online",
    icon: LockClosedIcon,
    buttonText: 'Pay Now',
  },
  {
    name: 'Update Mess Leave Days',
    description: 'Going out for a vacation? Update your leave days and we will take care of the rest.',
    icon: ServerIcon,
    buttonText: 'Update Leave',
  },
]

export default function Example() {
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
                    <dd>
                    <Button 
                      className="mt-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white 
                      font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                      {feature.buttonText}
                    </Button>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            alt="Product screenshot"
            src={calender}
            width={2432}
            height={1442}
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
    </div>
  )
}