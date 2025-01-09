'use client'
import React, { useState } from 'react';
import { postToBackend } from '@/store/fetchdata'; // Ensure this function is correctly implemented
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { AuroraBackground } from "../ui/aurora-background";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";

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
        const parsedValue = name === 'roomNumber' ? (value === '' ? '' : Number(value)) : value;

        setFormData((prevData) => ({
            ...prevData,
            [name]: parsedValue,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.title.trim() || !formData.description.trim()) {
            alert('Title and Grievance are required.');
            return;
        }

        try {
            const response = await postToBackend('http://127.0.0.1:5090/api/complaint/add', formData);
            alert(`${response.data.message}`);
        } catch (error) {
            console.error('Error submitting complaint:', error);
            alert('An error occurred while submitting your complaint.');
        }
    };

    return (
        <div className="relative min-h-screen bg-gray-50">
            <AuroraBackground className="absolute inset-0 pointer-events-none z-0" />

            <div className="relative min-h-screen flex flex-col items-center justify-center p-4 z-10">
                <Card className="w-full max-w-xl bg-white shadow-lg rounded-lg mt-8">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center text-black">
                            Submit Your Complaint
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="roomNumber" className="block text-sm font-medium text-gray-700">
                                    Room Number (optional)
                                </label>
                                <Input
                                    type="number"
                                    id="roomNumber"
                                    name="roomNumber"
                                    value={formData.roomNumber}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    maxLength={maxTitleLength}
                                    required
                                />
                                <p className="text-sm text-gray-600 mt-1">
                                    Write your title using a maximum of 30 characters.
                                </p>
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    Complaint <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={5}
                                    maxLength={maxDescriptionLength}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                    required
                                />
                                <p className="text-sm text-gray-600 mt-1">
                                    Write your complaint using a maximum of 500 characters.
                                </p>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-violet-500 hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-md shadow-lg"
                            >
                                Submit
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
