import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../images/Patrick.jpg';
import './CSS/HomePage.css'; 
import Header from './Header'; // Assuming the Header component is in the same directory
import Footer from './Footer'; // Assuming the Footer component is in the same directory

function HomePage() {
    return (
        <>
            <Header />
            <div className="homepage-bg" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <Link to="/register" className="link-style register-link">
                    Register
                </Link>
                <Link to="/login" className="link-style login-link">
                    Login
                </Link>
            </div>
            <Footer />
        </>
    );
}

export default HomePage;
