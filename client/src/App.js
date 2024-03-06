import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import {BrowserRouter,Route} from 'react-router-dom';

// import components
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import SignUp from './components/screens/SignUp';
import SignIn from './components/screens/SignIn';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
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
    </BrowserRouter>
  );
}

export default App;
