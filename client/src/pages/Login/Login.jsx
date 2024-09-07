import React from 'react';
import { Link } from 'react-router-dom';
import './Login.scss';
import '../../components/CredentialsForm';
import CredentialsForm from '../../components/CredentialsForm';

const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <div className='Login'>
      <h2>Login</h2>
      <CredentialsForm authType='Login' handleOnSubmit={handleLogin} />
      <Link className='mt-5' to='/register'>
        Don't have an account? Sign up here
      </Link>
    </div>
  );
};

export default Login;
