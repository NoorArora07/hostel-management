"use client"

import React from 'react'
import { AuroraBackground } from "../ui/aurora-background.tsx"
import { Button } from "@/Components/ui/button"
import { Card, CardContent } from "@/Components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { CalendarDays, MessageSquare, UtensilsCrossed, LogOut } from 'lucide-react'

const FAQs = [
  {
    question: "How can I reset my password?",
    answer: "You can reset your password by clicking on the 'Forgot Password' link on the login page and following the instructions."
  },
  {
    question: "Is there a restriction on the number of complaints?",
    answer: "Yes, you can make maximum of 3 complaints per week."
  },
  {
    question: "Will I get a rebate for mess leaves?",
    answer: "Yes, you will get a rebate for mess leaves of Rs. 300 provided the leave is for more than 2 days."
  }
]

const Homepage = () => {
  return (
    <div className=" mt-20 min-h-screen overflow-hidden">
      <AuroraBackground>
        <main className="container mx-auto px-4 py-8">
          <section className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
              Welcome!
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Your one-stop solution for managing hostel activities.
            </p>
          </section>

          <Card className="bg-white/10 backdrop-blur-lg border-none text-white">
            <CardContent className="p-6">
              <Tabs defaultValue="leaves" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-white/20">
                  <TabsTrigger value="leaves" className='text-slate-300'>Leaves</TabsTrigger>
                  <TabsTrigger value="mess" className='text-slate-300'>Mess</TabsTrigger>
                  <TabsTrigger value="complaints" className='text-slate-300'>Complaints</TabsTrigger>
                  <TabsTrigger value="room" className='text-slate-300'>Activities</TabsTrigger>
                </TabsList>
                <TabsContent value="leaves" className="mt-4">
                  <div className="flex items-center space-x-4">
                    <CalendarDays className="w-12 h-12" />
                    <div>
                      <h3 className="text-lg font-semibold">Leave Management</h3>
                      <p>Apply for leaves and track your leave history. Get notified when the warden accepts your request!</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="mess" className="mt-4">
                  <div className="flex items-center space-x-4">
                    <UtensilsCrossed className="w-12 h-12" />
                    <div>
                      <h3 className="text-lg font-semibold">Mess Schedule</h3>
                      <p>View mess menu and get updates on all major events. Pay mess fee in seconds!</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="complaints" className="mt-4">
                  <div className="flex items-center space-x-4">
                    <MessageSquare className="w-12 h-12" />
                    <div>
                      <h3 className="text-lg font-semibold">Complaint System</h3>
                      <p>Register and track the status of your complaints. Every voice matters here!</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="room" className="mt-4">
                  <div className="flex items-center space-x-4">
                    <LogOut className="w-12 h-12" />
                    <div>
                      <h3 className="text-lg font-semibold">Room Allocation</h3>
                      <p>Choose your hostel room in real time and select your roommates!</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <section className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FAQs.map((faq, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-lg border-none text-white">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                    <p>{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </main>
      </AuroraBackground>
    </div>
  )
}

export default Homepage