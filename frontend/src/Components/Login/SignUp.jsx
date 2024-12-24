import { useState } from "react";
import "./SignUp.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        sid: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate(); // Initialize useNavigate
    const {storeTokeninLS} = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5090/api/auth/signup', formData);
            // alert(response.data.message);
            // navigate("/signup2");
            storeTokeninLS(response.data.token);
            navigate("/Homepage");
        } catch (error) {
            console.error(error.response?.data || 'Signup failed');
            alert('Signup failed');
        }

        console.log("Name:", formData.name);
        console.log("Email:", formData.email);
        console.log("Password:", formData.password);
        console.log("SID:", formData.sid);
    };

    return (
        <div className="SignUp-container">
            <form className="SignUp-form" onSubmit={handleSubmit}>
                <h2 className="SignUp-title">Sign UP!</h2>

                <div className="input-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="sid">SID:</label>
                    <input
                        type="text"
                        id="sid"
                        name="sid"
                        value={formData.sid}
                        onChange={handleChange}
                        placeholder="Enter your SID"
                        required
                    />
                </div>

                <button type="submit" className="SignUp-button">SignUp</button>
            </form>
        </div>
    );
};

export default SignUp;
