import React, {useContext, useEffect} from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { UserContext } from '../App';


import Home from '../components/screens/Home';
import Profile from '../components/screens/Profile';
import SignUp from '../components/screens/SignUp';
import SignIn from '../components/screens/SignIn';
import CreatePost from '../components/screens/CreatePost';
import UserProfile from '../components/screens/UserProfile';
import SubscribesUserPosts from '../components/screens/SubscribesUserPosts';

const Routing = () => {
    const history = useHistory();
    const { state, dispatch } = useContext(UserContext);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            dispatch({ type: "USER", payload: user });
        } else {
            history.push('/SignIn');
        }
    }, []);

    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/SignIn">
                <SignIn />
            </Route>
            <Route exact path="/Profile">
                <Profile />
            </Route>
            <Route path="/SignUp">
                <SignUp />
            </Route>
            <Route path="/Create">
                <CreatePost />
            </Route>
            <Route path="/profile/:userid">
                <UserProfile />
            </Route>
            <Route path="/myfollowerspost">
                <SubscribesUserPosts />
            </Route>
        </Switch>
    );
};

export default Routing;