import React, { useState } from 'react';
import './CredentialsForm.scss';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const CredentialsForm = ({ authType, handleOnSubmit }) => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwdVisible, setPwdVisible] = useState(false);

  const togglePwdVisible = () => {
    setPwdVisible(!pwdVisible);
  };

  return (
    <form className='CredentialsForm' onSubmit={handleOnSubmit} method='post'>
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
      <button type='submit' className='btn btn-primary text-capitalize mt-5'>
        {authType}
      </button>
    </form>
  );
};

export default CredentialsForm;
