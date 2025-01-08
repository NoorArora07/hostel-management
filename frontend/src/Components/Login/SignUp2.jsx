import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postToBackend } from "../../store/fetchdata";
import signup1 from "../../Photos/signup1.jpg";

const SignUp2 = () => {
    const [formData, setFormData] = useState({
        branch: "",
        phoneNumber: "",
        parentsNumber: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await postToBackend("http://127.0.0.1:5090/api/auth/signup2", formData);
            navigate("/Homepage");
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Signup failed";
            alert(errorMessage);
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

                        {/* Branch Input */}
                        <div className="mb-4">
                            <label htmlFor="branch" className="block text-sm text-gray-600 mb-2">
                                Branch:
                            </label>
                            <input
                                type="text"
                                id="branch"
                                name="branch"
                                value={formData.branch}
                                onChange={handleChange}
                                placeholder="Enter your branch"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:bg-violet-100 focus:ring-violet-500 focus:border-violet-500 text-sm"
                            />
                        </div>

                        {/* Phone Number Input */}
                        <div className="mb-4">
                            <label htmlFor="phoneNumber" className="block text-sm text-gray-600 mb-2">
                                Phone Number:
                            </label>
                            <input
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder="Enter your phone number"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:bg-violet-100 focus:ring-violet-500 focus:border-violet-500 text-sm"
                            />
                        </div>

                        {/* Parent's Phone Number Input */}
                        <div className="mb-4">
                            <label htmlFor="parentsNumber" className="block text-sm text-gray-600 mb-2">
                                Parent's Phone Number:
                            </label>
                            <input
                                type="text"
                                id="parentsNumber"
                                name="parentsNumber"
                                value={formData.parentsNumber}
                                onChange={handleChange}
                                placeholder="Enter your parent's phone number"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:bg-violet-100 focus:ring-violet-500 focus:border-violet-500 text-sm"
                            />
                        </div>

                        {/* Sign Up Button */}
                        <button
                            type="submit"
                            className="w-full py-2 bg-violet-500 text-white rounded-md hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-400"
                        >
                            Complete Sign Up
                        </button>
                    </form>
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

export default SignUp2;
