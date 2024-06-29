import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../App';


const Navbar = () => {

    const { state, dispatch } = useContext(UserContext);



    const history = useHistory();

    // Define a function called renderList
    const renderList = () => {

        if (state) {

            return [
                <li><Link to="/Profile">Profile</Link></li>,
                <li><Link to="/Create">Create Post</Link></li>,
                <li><Link to="/myfollowerspost">My following Posts</Link></li>,
                <li>

                    <button className="btn #c62828 red darken-3" onClick={() => (
                        // Clear the user data from local storage
                        localStorage.clear(),
                        // Dispatch the action to clear the user data from the state
                        dispatch({ type: "CLEAR" }),

                        // Redirect the user to the SignIn page
                        history.push('/SignIn')
                    )}>
                        Log Out
                    </button>

                </li>
            ]
        } else {

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