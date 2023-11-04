import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header'; 
import Footer from './Footer'; 
import './CSS/Register.css'; 

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // New state for success message
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage('Registered successfully'); // Set success message
                setTimeout(() => {
                    setSuccessMessage(''); // Clear success message after 3 seconds
                    navigate('/');
                }, 3000);
            } else {
                alert(data.message || "Registration failed!");
            }
        } catch (error) {
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <>
            <Header />
            <div className="register-bg">
                <div className="register-container">
                    {successMessage && <p>{successMessage}</p>} {/* Conditionally render success message */}
                    <form onSubmit={handleSubmit} className="register-form">
                        <input 
                            type="text" 
                            placeholder="Username" 
                            className="register-input"
                            value={username} 
                            onChange={e => setUsername(e.target.value)} 
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            className="register-input"
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                        />
                        <input 
                            type="password" 
                            placeholder="Confirm Password" 
                            className="register-input"
                            value={confirmPassword} 
                            onChange={e => setConfirmPassword(e.target.value)} 
                        />
                        <button type="submit" className="register-button">Register</button>
                    </form>
                    <Link to="/login" className="login-btn">
                        Already have an account? Login
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Register;
