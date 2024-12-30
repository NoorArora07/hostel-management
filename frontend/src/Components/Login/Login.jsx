import { useState } from "react";
import axios from 'axios';
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate(); // Initialize useNavigate
    const { storeTokeninLS } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5090/api/auth/login', formData);
            storeTokeninLS(response.data.token);
            console.log(response.data)
            if (response.data.role === 'warden') {
                navigate("/WardenDash");
            } else {
                navigate("/Homepage");
            }
        } catch (error) {
            console.error(error.response?.data || 'Login failed');
            alert('Login failed');
        }
    };

    return (
        <div className="login-container">
            <div className="form-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h2 className="login-title">Login</h2>
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
                    <button type="submit" className="login-button">Login</button>
                </form>
                <div className="signup-link-container">
                    <p>
                        Don't have an account?{" "}
                        <a href="./SignUp" className="signup-link">Sign Up</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
