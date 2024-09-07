import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import './Auth.scss';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Auth = ({ authType }) => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwdVisible, setPwdVisible] = useState(false);

  const togglePwdVisible = () => {
    setPwdVisible(!pwdVisible);
  };

  const handleAuth = (e) => {
    e.preventDefault();

    if (authType === 'login') {
      //
    } else {
      //
    }
  };

  const handleAuthChange = (e) => {
    setEmail('');
    setPwd('');
    setPwdVisible(false);
  };

  return (
    <div className='Auth'>
      <h2>{authType === 'login' ? 'Login' : 'Register'}</h2>
      <form className='auth-form' onSubmit={handleAuth} method='post'>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
        </div>
        <div className='mt-3'>
          <label className='form-label' htmlFor='pwd'>
            Password
          </label>
          <div className='input-group'>
            <input
              className='form-control'
              type={pwdVisible ? 'text' : 'password'}
              name='pwd'
              id='pwd'
              placeholder='Password'
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
            <span className='input-group-text'>
              {pwdVisible ? (
                <FaEye role='button' onClick={togglePwdVisible} />
              ) : (
                <FaEyeSlash role='button' onClick={togglePwdVisible} />
              )}
            </span>
          </div>
        </div>
        {/* <label htmlFor='pwdconfirm'>Confirm Password</label>
        <input type='text' name='pwdconfirm' id='pwdconfirm' /> */}
        <button type='submit' className='btn btn-primary mt-5'>
          {_.capitalize(authType)}
        </button>
      </form>
      {authType === 'login' ? (
        <Link className='mt-5' to='/register' onClick={handleAuthChange}>
          Don't have an account? Sign up here
        </Link>
      ) : (
        <Link className='mt-5' to='/login' onClick={handleAuthChange}>
          Already have an account? Log in here
        </Link>
      )}
    </div>
  );
};

export default Auth;
