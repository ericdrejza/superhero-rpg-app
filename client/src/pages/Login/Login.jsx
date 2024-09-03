import React from 'react';
import './Login.scss';

const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <div className='Login'>
      <h2>Login</h2>
      <form className='authForm' onSubmit={handleLogin} method='post'>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          name='email'
          id='email'
          placeholder='example@example.com'
        />
        <label htmlFor='username'>Username</label>
        <input type='text' name='username' id='username' />
        <label htmlFor='pwd'>Password</label>
        <input type='text' name='pwd' id='pwd' />
        <label htmlFor='pwdconfirm'>Confirm Password</label>
        <input type='text' name='pwdconfirm' id='pwdconfirm' />
        <button type='submit' className='btn'>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
