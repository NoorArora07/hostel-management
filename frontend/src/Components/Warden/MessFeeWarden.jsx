"use client";
import React, { useState } from "react";
import { postToBackend } from "@/store/fetchdata";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { baseUrl } from "@/urls";

export default function MessFeeForm() {
    const months = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];

    const [formData, setFormData] = useState({
        month: "", 
        year: "",
        amount: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const { month, year, amount } = formData;
    
        if (month === "" || year === "" || amount === "") {
            alert("All fields are required.");
            return;
        }
    
        const numericYear = Number(year);
        const numericAmount = Number(amount);
    
        if (isNaN(numericYear) || isNaN(numericAmount)) {
            alert("Year and amount must be valid numbers.");
            return;
        }
        
        console.log('Form Data:', { month, year, amount });

        const data = {
            month,
            year: numericYear,
            amount: numericAmount,
        };

        try {
            const response = await postToBackend(`${baseUrl}/api/warden_details/add`, data);
            console.log("Response:", response);
            
        } catch (error) {
            console.error("Error updating:", error);
            alert("An error occurred while updating the details.");
            console.log("post to backend not happening");
        }
    };
    

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <div className="p-5 mb-14 space-y-12 mt-52 bg-white placeholder-slate-100 rounded-xl border-green-600 border-2">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base/7 font-bold text-gray-900">Update Mess Fee Details:</h2>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="month" className="block text-sm/6 font-medium text-gray-900">
                                Enter the month:
                            </label>
                            <div className="mt-2">
                                <select
                                    id="month"
                                    name="month"
                                    value={formData.month}
                                    onChange={handleChange}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    required
                                >
                                    <option value="" disabled>Select a month</option>
                                    {months.map((month) => (
                                        <option key={month} value={month}>{month}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="year" className="block text-sm/6 font-medium text-gray-900">
                                Year <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-2">
                                <input
                                    id="year"
                                    name="year"
                                    type="number"
                                    value={formData.year}
                                    onChange={handleChange}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    placeholder="Enter the year"
                                    required
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="amount" className="block text-sm/6 font-medium text-gray-900">
                                Total Fee for the Month <span className="text-green-700">*</span>
                            </label>
                            <div className="mt-2">
                                <input
                                    id="amount"
                                    name="amount"
                                    type="number"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    placeholder="Enter amount"
                                    required
                                />
                            </div>
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
        </div>
    );
}
