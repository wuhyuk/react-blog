import React, {useState} from 'react';
import axios from 'axios';
import { 
  useNavigate
} from 'react-router-dom';
import './signup.css';

function SignUp() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [name, setName] = useState('');
  
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!id || !pw || !name) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

  try {
      
      const response = await axios.get('persistent-bow-bangle.glitch.me/users');
      const isDuplicate = response.data.some(user => user.id === id);
      if (isDuplicate) {
        alert('이미 존재하는 아이디입니다.');
        return;
      }
      
      const userData = { id, pw, name };
      await axios.post('persistent-bow-bangle.glitch.me/users', userData);
      navigate('/');
    } catch (error) {
      alert('회원가입에 실패했습니다.');
    }
  };

  return (
    <div className='signup-container'>
      <h1>회원가입</h1>
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
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign up</button>
      <button onClick={() => {navigate('/login')}}>Log in</button>
    </div>
  );
}

export default SignUp;
