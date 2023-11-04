import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header'; // Import the Header component
import Footer from './Footer'; // Import the Footer component
import './CSS/Login.css'; // Make sure to style appropriately with the theme

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                sessionStorage.setItem('token', data.token);
                navigate('/tasks');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    return (
        <>
            <Header /> {/* Render the Header */}
            <div className="login-bg"> {/* Use the login-bg class */}
                <form className="login-form" onSubmit={handleSubmit}> {/* Use the login-form class */}
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
            <Footer /> {/* Render the Footer */}
        </>
    );
}

export default Login;
