import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { initializeSocket, updateSocketToken, getSocket } from "../../store/socket"; // Import socket functions
import loginside from '../../Photos/loginside.jpg';

const Login = () => {
    const [formData, setFormData] = useState({
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
            const response = await axios.post("http://127.0.0.1:5090/api/auth/login", formData);

            const token = response.data.token;
            storeTokeninLS(token); // Store token in local storage
            console.log(response.data);

            // Initialize or update the socket
            if (!getSocket()) {
                initializeSocket(token); // Initialize the socket for the first time
            } else {
                updateSocketToken(token); // Update the token if socket already exists
            }

            // Navigate based on user role
            if (response.data.role === "warden") {
                navigate("/WardenDash");
            } else {
                navigate("/Homepage");
            }
        } catch (error) {
            console.error(error.response?.data || "Login failed");
            alert("Login failed");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-violet-200">
            <div className="bg-white shadow-md rounded-lg flex max-w-4xl w-full">
                <div className="w-1/2 hidden lg:block shadow-lg shadow-purple-300">
                    <img
                        src={loginside}
                        alt="Login illustration"
                        className="h-full w-full object-cover rounded-l-lg"
                    />
                </div>

                <div className="w-full lg:w-1/2 p-8 flex flex-col items-center justify-center space-y-6 shadow-lg shadow-purple-300">
                    <form className="space-y-6 w-full max-w-md" onSubmit={handleSubmit}>
                        <h2 className="text-2xl font-semibold text-gray-800 text-center">Login</h2>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:bg-violet-100 focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:bg-violet-100 focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-violet-500 text-white py-2 px-4 rounded-md hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2"
                        >
                            Login
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{" "}
                            <a href="./SignUp" className="text-violet-600 font-medium hover:underline">
                                Sign Up
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
