import React, { useState } from "react";
import "./SignUp.css";

const SignUp = () => {
    const [branch, setBranch] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [parentNumber, setParentNumber] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("Branch:", branch);
        console.log("Phone Number:", phoneNumber);
        console.log("Parent's Phone Number:", parentNumber);
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="sid">SID:</label>
                    <input
                        type="text"
                        id="sid"
                        value={SID}
                        onChange={(e) => setSID(e.target.value)}
                        placeholder="Enter your SID"
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="branch">Branch:</label>
                    <input
                        type="text"
                        id="branch"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        placeholder="Enter your branch"
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Enter your phone number"
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="parentNumber">Parent's Number:</label>
                    <input
                        type="text"
                        id="parentNumber"
                        value={parentNumber}
                        onChange={(e) => setParentNumber(e.target.value)}
                        placeholder="Enter your parent's phone number"
                        required
                    />
                </div>

                <button type="submit" className="SignUp-button">SignUp</button>
            </form>
        </div>
    );
};

export default SignUp;
