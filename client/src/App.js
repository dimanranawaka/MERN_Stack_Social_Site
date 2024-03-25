import React, { useEffect, createContext, useReducer, useContext } from 'react';
import Navbar from './components/Navbar';
import './App.css';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';


// import components
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import SignUp from './components/screens/SignUp';
import SignIn from './components/screens/SignIn';
import CreatePost from './components/screens/CreatePost';
import { reducer, initialState } from './reducers/userReducer';

export const UserContext = createContext();

const Routing = () => {

  const history = useHistory();

  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {

      dispatch({ type: "USER", payload: user });

      history.push('/');

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
      <Route path="/Profile">
        <Profile />
      </Route>
      <Route path="/SignUp">
        <SignUp />
      </Route>
      <Route path="/Create">
        <CreatePost />
      </Route>

    </Switch>

  )

}


function App() {
  // 
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />

        <Routing />

      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
