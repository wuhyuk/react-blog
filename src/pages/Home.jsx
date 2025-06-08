import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

function Home() {

  const navigate = useNavigate();

  return (
    <div className='home-container'>
      <h1>Secret Blog</h1>
      <button onClick={() => {navigate('/login')}}>Log in</button>
      <br />
      <button onClick={() => {navigate('/signup')}}>Sign up</button>
    </div>
  );
}

export default Home;