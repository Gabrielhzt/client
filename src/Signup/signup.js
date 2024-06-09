import React, { useState } from "react";
import './signup.css';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "../components/navbar/navbar";
import axios from "axios";

const Signup = () => {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
          const response = await axios.post('http://localhost:4000/auth/register', {
            full_name: fullName,
            email: email,
            password: password
          });
    
          navigate('/login')
          console.log(response.data.message);
        } catch (error) {
          console.error('Error during registration:', error);
        }
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
                    <p>Already have an account ? <Link to={'/login'}>Login</Link></p>
                </div>
            </div>
            <footer>
                <h2>VoltBike</h2>
                <p>© 2024 VoltBike - Designed with passion by Gabriel Hazout. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Signup;
