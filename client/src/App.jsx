import React, {  createContext, useReducer,  } from 'react';
import Navbar from './components/Navbar';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routing from './routes/routesSection';


import { reducer, initialState } from './reducers/userReducer';


export const UserContext = createContext();



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
