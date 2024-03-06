import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <div className="nav-wrapper white"> 
                <Link to="/" className="brand-logo">Instagram</Link>
                <ul id="nav-mobile" className="right">
                    <li><Link to="/SignIn">SignIn</Link></li>
                    <li><Link to="/SignUp">SignUp</Link></li>
                    <li><Link to="/Profile">Profile</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;