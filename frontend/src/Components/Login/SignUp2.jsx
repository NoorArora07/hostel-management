import React, { useState } from "react";
import axios from "axios";
import "./SignUp2.css";
import { useNavigate } from "react-router-dom";
import { postToBackend } from "../../store/fetchdata";

const SignUp2 = () => {
    const [formData, setFormData] = useState({
        branch: '',
        phoneNumber: '',
        parentsNumber: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        let response;
        try {
            response = await postToBackend('http://127.0.0.1:5090/api/auth/signup2', formData);
            // alert(response.data.message);
            navigate("/Homepage");
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Signup failed';
            // console.error("Error:", errorMessage);
            alert(errorMessage);
        }

        // Logging form data for debugging
        console.log("Branch:", formData.branch);
        console.log("Phone Number:", formData.phoneNumber);
        console.log("Parent's Phone Number:", formData.parentsNumber);
    };
    
    return (
        <div className="SignUp-container">
            <form className="SignUp-form" onSubmit={handleSubmit}>
                <h2 className="SignUp-title">Sign UP!</h2>

                <div className="input-group">
                    <label htmlFor="branch">Branch:</label>
                    <input
                        type="text"
                        id="branch"
                        name="branch"
                        value={formData.branch}
                        onChange={handleChange}
                        placeholder="Enter your branch"
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="parentsNumber">Parent's Number:</label>
                    <input
                        type="text"
                        id="parentsNumber"
                        name="parentsNumber"
                        value={formData.parentsNumber}
                        onChange={handleChange}
                        placeholder="Enter your parent's phone number"
                        required
                    />
                </div>

                <button type="submit" className="SignUp-button">SignUp</button>
            </form>
        </div>
    );
};

export default SignUp2;