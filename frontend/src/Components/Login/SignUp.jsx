import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { initializeSocket, updateSocketToken, getSocket } from "../../store/socket";
import signup1 from "../../Photos/signup1.jpg";
import { baseUrl } from "@/urls";

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: "",
        sid: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();
    const { storeTokeninLS } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${baseUrl}/api/auth/signup`,
                formData
            );

            const token = response.data.token;
            storeTokeninLS(token); // Store the token in local storage

            // Initialize or update the socket
            if (!getSocket()) {
                initializeSocket(token); // Initialize the socket for the first time
            } else {
                updateSocketToken(token); // Update the token if socket already exists
            }

            navigate("/signup2"); // Navigate to the next signup step
        } catch (error) {
            console.error(error.response?.data || "Signup failed");
            alert("Signup failed");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-violet-200">
            {/* Form and Image Container */}
            <div className="flex bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
                {/* Form Section */}
                <div
                    className="flex flex-col justify-center p-8 w-1/2"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.85)" }}
                >
                    <form className="space-y-6 w-full" onSubmit={handleSubmit}>
                        <h2 className="text-2xl font-semibold text-gray-800 text-center">
                            Sign Up
                        </h2>

                        {/* Name Input */}
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm text-gray-600 mb-2">
                                Name:
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:bg-violet-100 focus:ring-violet-500 focus:border-violet-500 text-sm"
                            />
                        </div>

                        {/* Email Input */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm text-gray-600 mb-2">
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:bg-violet-100 focus:ring-violet-500 focus:border-violet-500 text-sm"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm text-gray-600 mb-2">
                                Password:
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:bg-violet-100 focus:ring-violet-500 focus:border-violet-500 text-sm"
                            />
                        </div>

                        {/* SID Input */}
                        <div className="mb-4">
                            <label htmlFor="sid" className="block text-sm text-gray-600 mb-2">
                                SID:
                            </label>
                            <input
                                type="text"
                                id="sid"
                                name="sid"
                                value={formData.sid}
                                onChange={handleChange}
                                placeholder="Enter your SID"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:bg-violet-100 focus:ring-violet-500 focus:border-violet-500 text-sm"
                            />
                        </div>

                        {/* Sign Up Button */}
                        <button
                            type="submit"
                            className="w-full py-2 bg-violet-500 text-white rounded-md hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-400"
                        >
                            Move to Part-II of Form
                        </button>
                    </form>

                    {/* Login Link Below the Form */}
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <a
                                href="/"
                                className="text-violet-600 font-medium hover:underline"
                            >
                                Login Here
                            </a>
                        </p>
                    </div>
                </div>

                {/* Image Section */}
                <div className="w-1/2">
                    <img
                        src={signup1}
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default SignUp;
