import React from 'react';
import { Link } from 'react-router-dom';
import './Register.scss';

const Register = () => {
  const handleSignUp = (e) => {
    e.preventDefault();
  };

  return (
    <div className='Register'>
      <h2>Register</h2>
      <form className='login-form' onSubmit={handleSignUp} method='post'>
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
        {/* Username */}
        <div className='mt-3'>
          <label className='form-label' htmlFor='username'>
            Username
          </label>
          <input
            className='form-control'
            type='text'
            name='username'
            id='username'
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
      <Link className='mt-5' to='/login'>
        Already have an account? Log in here
      </Link>
    </div>
  );
};

export default Register;
