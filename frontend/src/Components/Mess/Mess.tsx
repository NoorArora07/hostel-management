'use client'
import React from "react";
import { PencilSquareIcon, BanknotesIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/20/solid';
import { Button } from "@/Components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import messPic from '@/Photos/mess-pic.jpg';
import { useNavigate } from 'react-router-dom';
import { AuroraBackground } from "../ui/aurora-background";

const features = [
  {
    name: 'Get Your Mess Details',
    description: 'Track your mess schedule and menu with ease!',
    icon: PencilSquareIcon,
    actions: [
      { text: 'View Updates', path: '/mess-schedule-view' },
      { text: 'View Menu', path: '/mess-menu' },
    ],
  },
  {
    name: 'Pay Your Mess Fee',
    description: 'Manage and pay your mess fee online effortlessly :)',
    icon: BanknotesIcon,
    actions: [
      { text: 'View Fee Details', path: '/view-mess-fee' },
      { text: 'Pay Now', path: '/mess-fee-payment' },
    ],
  },
  {
    name: 'Update Mess Leave Days',
    description: 'Update leave days for your time away <3',
    icon: ClipboardDocumentCheckIcon,
    actions: [
      { text: 'View Leaves', path: '/mess-leave-view' },
      { text: 'Update Leaves', path: '/mess-leave-form' },
    ],
  },
];

export default function Mess() {
  const navigate = useNavigate();
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="relative min-h-screen">
        {/* Aurora Background */}
        <AuroraBackground className="fixed top-0 left-0 right-0 z-[-1] h-full" />

        <div className="h-24"></div>
        
        <div className="overflow-auto py-16 sm:py-20 bg-white/20 backdrop-blur-lg rounded-xl shadow-lg mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto flex flex-col lg:flex-row gap-8">
            
            {/* Image on the Left */}
            <div className="lg:w-1/2">
              <img
                src={messPic} 
                alt="Mess"
                className="w-full rounded-xl shadow-xl ring-1 ring-gray-400/10"
              />
            </div>

            {/* Option Cards on the Right */}
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-center text-white mb-8">Manage Your Mess</h2>
              <div className="grid grid-cols-1 gap-6">
                {features.map((feature) => (
                  <div key={feature.name} className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between">
                    <div className="flex items-center w-full">
                      <feature.icon className="w-10 h-10 text-violet-800 mr-4" />
                      <div className="w-full">
                        <h3 className="text-2xl font-semibold text-gray-900">{feature.name}</h3>
                        <p className="mt-2 text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                    {/* Dropdown Button on the Same Row */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="bg-violet-500 hover:bg-violet-700 text-white 
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
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
    </div>
  );
}
