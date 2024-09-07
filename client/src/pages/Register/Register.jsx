import React from 'react';
import { Link } from 'react-router-dom';
import './Register.scss';
import '../../components/CredentialsForm';
import CredentialsForm from '../../components/CredentialsForm';

const Register = () => {
  const handleRegister = (e) => {
    e.preventDefault();
  };

  return (
    <div className='Register'>
      <h2>Register</h2>
      <CredentialsForm authType='Sign up' handleOnSubmit={handleRegister} />
      <Link className='mt-5' to='/login'>
        Already have an account? Log in here
      </Link>
    </div>
  );
};

export default Register;
