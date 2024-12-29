'use client'
import React, { useState } from 'react';
import { postToBackend } from '@/store/fetchdata'; // Ensure this function is correctly implemented
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

export default function ComplaintsForm() {
    const [formData, setFormData] = useState({
        roomNumber: '',
        title: '',
        description: ''
    });

    const maxTitleLength = 30;
    const maxDescriptionLength = 500;

    const handleChange = (event) => {
        const { name, value } = event.target;

        // Handle roomNumber as a number
        const parsedValue = name === 'roomNumber' ? (value === '' ? '' : Number(value)) : value;

        setFormData((prevData) => ({
            ...prevData,
            [name]: parsedValue,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Basic validation
        if (!formData.title.trim() || !formData.description.trim()) {
            alert('Title and Grievance are required.');
            return;
        }

        try {
            const response = await postToBackend('http://127.0.0.1:5090/api/complaint/add', formData);
            if (response.ok) {
                alert('Complaint submitted successfully.');
            } else {
                alert('Failed to submit complaint. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting complaint:', error);
            alert('An error occurred while submitting your complaint.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="p-5 mb-10 space-y-12 mt-32 bg-white placeholder-slate-100 rounded-xl border-green-600 border-2">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base/7 font-bold text-gray-900">Submit Your Grievance Below:</h2>
                    <p className="mt-1 text-sm/6 text-gray-600">
                        This information will be displayed to the warden along with your details.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="roomNumber" className="block text-sm/6 font-medium text-gray-900">
                                Enter your room number below: (not required)
                            </label>
                            <div className="mt-2">
                                <input
                                    id="roomNumber"
                                    name="roomNumber"
                                    type="number"
                                    value={formData.roomNumber}
                                    onChange={handleChange}
                                    placeholder="eg. 170"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-2">
                                <input
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    maxLength={maxTitleLength}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    placeholder="Write a concise title"
                                    required
                                />
                            </div>
                            <p className="mt-3 text-sm/6 text-gray-600">Write your title using (maximum of) 30 characters.</p>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">
                                Grievance <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={5}
                                    maxLength={maxDescriptionLength}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    placeholder="Describe your grievance in detail"
                                    required
                                />
                            </div>
                            <p className="mt-3 text-sm/6 text-gray-600">Write your complaint using (maximum of) 500 characters.</p>
                        </div>

                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}
