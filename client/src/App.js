import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import Home from './pages/Home/Home';
import Login from './pages/Login';
import Auth from './pages/Auth';
import Register from './pages/Register';

function App() {
  return (
    <div className='App'>
      <Routes>
        {/* <Route path='/login' element={<Login />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} /> */}
        <Route path='/' element={<Home />}>
          <Route path='login' element={<Auth authType='login' />} />
          <Route path='register' element={<Auth authType='sign up' />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
