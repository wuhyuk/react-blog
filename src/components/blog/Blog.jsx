// Blog.jsx
import React, {useState, useEffect} from 'react';
import Search from './Search';
import List from './List';
import axios from 'axios';
import { 
  useNavigate
} from 'react-router-dom';
import './blog.css';

function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [logInName, setLogInName] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser?.id && storedUser?.pw) {
      const fetchUserName = async () => {
        try {
          const response = await axios.get('persistent-bow-bangle.glitch.me/users');
          const users = response.data;

          const logInUser = users.find(
            (user) => user.id === storedUser.id && user.pw === storedUser.pw
          );

          if (logInUser) {
            setLogInName(logInUser.name);
          } else {
            navigate('/login');
          }
        } catch (error) {
          navigate('/login');
        } finally {
          setLoading(false);
        }
      };
      fetchUserName();
    } else {
      navigate('/login');
      setLoading(false);
    }
  }, [navigate]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  // 로딩 중일 때는 로딩 메시지 표시
  if (loading) {
    return <div>Loading user name...</div>;
  }

  return (
    <div className='blog-container'>
      <h1>Secret Blog</h1>
      <div className='blog-header'>
        <span>{logInName}님</span>
        <button onClick={handleLogout}>Log out</button>
      </div>
      <div className='blog-header'>
        <button onClick={() => navigate('/post')}>글 작성</button>
      </div>
      <Search onSearch={handleSearch} />
      <List searchTerm={searchTerm} />
    </div>
  );
}

export default Blog;