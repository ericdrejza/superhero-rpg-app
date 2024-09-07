import React from 'react';
import { Link } from 'react-router-dom';
import './Login.scss';

const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <div className='Login'>
      <h2>Login</h2>
      <form className='login-form' onSubmit={handleLogin} method='post'>
        {/* Email */}
        <div className='mt-3'>
          <label className='form-label' htmlFor='email'>
            Email
          </label>
          <input
            className='form-control'
            type='email'
            name='email'
            id='email'
            placeholder='example@example.com'
          />
        </div>
        <div className='mt-3'>
          <label className='form-label' htmlFor='pwd'>
            Password
          </label>
          <input className='form-control' type='text' name='pwd' id='pwd' />
        </div>
        {/* <label htmlFor='pwdconfirm'>Confirm Password</label>
        <input type='text' name='pwdconfirm' id='pwdconfirm' /> */}
        <button type='submit' className='btn btn-primary mt-5'>
          Login
        </button>
      </form>
      <Link className='mt-5' to='/register'>
        Don't have an account? Sign up here
      </Link>
    </div>
  );
};

export default Login;
