import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  useNavigate
} from 'react-router-dom';
import './login.css';

function Login() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const bringUsers = async () => {
      try {
        const response = await axios.get('persistent-bow-bangle.glitch.me');
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setErrorMessage('사용자 정보를 불러오는 데 실패했습니다.');
        setLoading(false);
      }
    };
    bringUsers();
  }, []);

  const handleLogin = () => {
    setErrorMessage('');
    if (loading) {
      return;
    }
    const user = users.find((u) => u.id === id && u.pw === pw);
    if (user) {
      localStorage.setItem('loggedInId', user.id);
      localStorage.setItem('loggedInPassword', user.pw);
      const save = { id: user.id, pw: user.pw }; // user 객체에서 직접 가져오는 것이 더 확실합니다.
      localStorage.setItem('loggedInUser', JSON.stringify({ id, pw }));
      navigate('/blog');
    } else {
      setErrorMessage('아이디 또는 비밀번호가 일치하지 않거나 존재하지 않습니다.');
    }
  };

  return (
    <div className='login-container'>
      <h1>Log in</h1>
      <input
        type="text"
        placeholder="id"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
      />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button onClick={handleLogin} disabled={loading}>Log in</button>
      {loading && <p>Loading user data...</p>}
      <button onClick={() => {navigate('/signup')}}>Sign up</button>
    </div>
  );
}

export default Login;