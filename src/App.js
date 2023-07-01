import './App.css';
import ResponsiveAppBar from './ResponsiveAppBar';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, logout } from './slicers/authSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if the token exists in localStorage
    const jwtToken = localStorage.getItem('jwtToken');

    if (jwtToken) {
      // Token exists, dispatch the login action
      dispatch(login());
    } else {
      // Token does not exist, dispatch the logout action
      dispatch(logout());
    }
  }, [dispatch]);

  return (
    <>
      <ResponsiveAppBar />
      <div style={{
       display: "flex",
       padding: "0em 0em",
       height: '100%'
     }}>
        <Outlet/>  
      </div>
      
    </>
  );
}

export default App;
