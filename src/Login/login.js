import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar/navbar";

const Login = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Full Name:", fullName);
        console.log("Email:", email);
        console.log("Password:", password);
    };
    return (
        <div>
            <Navbar />
            <div className="all-page">
                <div className="square">
                    <h1>Sign up</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Full name</label>
                            <br />
                            <input 
                                type="text" 
                                value={fullName} 
                                onChange={(e) => setFullName(e.target.value)} 
                            />
                        </div>
                        <br />
                        <div>
                            <label>Email</label>
                            <br />
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                        </div>
                        <br />
                        <div>
                            <label>Password</label>
                            <br />
                            <input 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </div>
                        <br />
                        <button type="submit" className="submit">Sign Up</button>
                    </form>
                    <p>New here ? <Link to={'/signup'}>Create an account</Link></p>
                </div>
            </div>
            <footer>
                <h2>VoltBike</h2>
                <p>© 2024 VoltBike - Designed with passion by Gabriel Hazout. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default Login;