import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

const Home = () => {
  const title = 'SUPERSONA';

  return (
    <div className='Home'>
      {/* <ol>
        <li>
          <h1 className='title t1'>{title}</h1>
        </li>
        <li>
          <h1 className='title t2'>{title}</h1>
        </li>
        <li>
          <h1 className='title t3'>{title}</h1>
        </li>
        <li>
          <h1 className='title t4'>{title}</h1>
        </li>
        <li> */}
      <h1 className='title t5'>{title}</h1>
      {/* </li>
        <li>
          <h1 className='title t6'>{title}</h1>
        </li>
        <li>
          <h1 className='title t7'>{title}</h1>
        </li>
        <li>
          <h1 className='title t8'>{title}</h1>
        </li>
      </ol> */}
      <div className='auth-group d-flex flex-column justify-content-evenly'>
        <Link className='btn btn-primary' to='/register'>
          Sign Up
        </Link>
        <Link className='btn btn-outline-dark' to='/login'>
          Login
        </Link>
      </div>
      {/* <Link className='continue-link btn btn-outline-dark' to='/character'>
      Continue Without Saving
    </Link> */}
    </div>
  );
};

export default Home;
