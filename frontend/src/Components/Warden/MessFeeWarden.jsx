'use client';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkWarden, postToBackend } from "@/store/fetchdata";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { baseUrl } from "@/urls";
import pic from '../../Photos/wardendash6.jpg'

export default function MessFeeForm() {
    const navigate = useNavigate();
    const months = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];

    const [formData, setFormData] = useState({
        month: "", 
        year: "",
        amount: "",
    });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verifyAccess = async () => {
            try {
                const message = await checkWarden();
                if (message === "access denied!") {
                    navigate('/AccessDenied');
                }
            } catch (error) {
                console.error("Access verification error:", error);
                navigate('/AccessDenied');
            } finally {
                setIsLoading(false);
            }
        };

        verifyAccess();
    }, [navigate]);

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
            navigate('/WardenDash')
        } catch (error) {
            console.error("Error updating:", error);
            alert("An error occurred while updating the details.");
        }
    };
    
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-900 to-black">
                <div className="w-16 h-16 border-4 border-purple-500 border-dashed rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div
            className="mt-20 min-h-screen bg-gradient-to-r from-purple-900 to-black text-white"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${pic})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
            }}
            >
            <div className="relative z-10 flex items-center justify-center min-h-screen mt-2">
                <div className="max-w-4xl bg-white p-6 shadow-lg rounded-md">
                    <h1 className="text-2xl font-bold mb-6 text-black text-center">Update Mess Fee Details</h1>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Month Field */}
                        <div className="col-span-2">
                            <label htmlFor="month" className="block text-sm font-medium text-gray-700">
                                Enter the month
                            </label>
                            <div className="mt-1">
                                <select
                                    id="month"
                                    name="month"
                                    value={formData.month}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-base text-gray-900"
                                    required
                                >
                                    <option value="" disabled>Select a month</option>
                                    {months.map((month) => (
                                        <option key={month} value={month}>{month}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Year Field */}
                        <div className="col-span-2">
                            <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                                Year
                            </label>
                            <div className="mt-1">
                                <input
                                    id="year"
                                    name="year"
                                    type="number"
                                    value={formData.year}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-base text-gray-900"
                                    placeholder="Enter the year"
                                    required
                                />
                            </div>
                        </div>

                        {/* Amount Field */}
                        <div className="col-span-2">
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                                Total Fee for the Month
                            </label>
                            <div className="mt-1">
                                <input
                                    id="amount"
                                    name="amount"
                                    type="number"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-base text-gray-900"
                                    placeholder="Enter amount"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="col-span-2">
                            <button
                                type="submit"
                                className="w-full bg-violet-500 hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-md shadow-md"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
