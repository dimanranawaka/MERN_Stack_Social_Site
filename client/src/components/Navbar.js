import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';

// Define a functional component called Navbar
const Navbar = () => {
    // Use the useContext Hook to access the UserContext. This gives us access to the state and dispatch function from the UserContext.
    const { state, dispatch } = useContext(UserContext);

    // Define a function called renderList
    const renderList = () => {
        // Check if there is a state (i.e., if the user is logged in)
        if (state) {
            // If there is a state (user is logged in), return an array of list items with links to the Profile and Create Post pages
            return [
                <li><Link to="/Profile">Profile</Link></li>,
                <li><Link to="/Create">Create Post</Link></li>
            ]
        } else {
            // If there is no state (user is not logged in), return an array of list items with links to the SignIn and SignUp pages
            return [
                <li><Link to="/SignIn">SignIn</Link></li>,
                <li><Link to="/SignUp">SignUp</Link></li>
            ]
        }
    }

    return (
        <nav>
            <div className="nav-wrapper white">
                <Link to={state ? "/" : "signIn"} className="brand-logo">Dexter</Link>
                <ul id="nav-mobile" className="right">

                    {renderList()}

                </ul>
            </div>
        </nav>
    );
};

export default Navbar;