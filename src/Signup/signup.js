import React, { useState } from "react";
import './signup.css';
import { Link } from 'react-router-dom';

const Signup = () => {
    // Utilisation des états pour gérer les entrées de l'utilisateur
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Gestionnaire de soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        // Ici vous pouvez ajouter le code pour envoyer les données au serveur ou faire d'autres actions
        console.log("Full Name:", fullName);
        console.log("Email:", email);
        console.log("Password:", password);
    };

    return (
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
                <p>Already have an account ?<Link to={'/login'}>Login</Link></p>
            </div>
        </div>
    );
};

export default Signup;
