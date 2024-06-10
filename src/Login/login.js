import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchUserInfo } from "../features/user/userSlice";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
          const response = await axios.post('http://localhost:4000/auth/login', {
            email: email,
            password: password
          });

          const token = response.data.token;
          localStorage.setItem('token', token);
    
          dispatch(fetchUserInfo());
          setErrorMessage('');
          navigate('/');
        } catch (error) {
          console.error('Error during login:', error.response.data.message);
          setErrorMessage(error.response.data.message);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="all-page">
                <div className="square">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
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
                        {errorMessage}
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