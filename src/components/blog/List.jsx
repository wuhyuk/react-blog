import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './list.css';

function List({searchTerm}) {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get('http://localhost:3001/posts');
      setPosts(response.data);
    };

    fetchPosts();
  }, []);

    const filteredPosts = searchTerm ? posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : posts;

  return (
    <div className='list-container'>
      <h2>게시글 목록</h2>
      <ul>
        {filteredPosts.map(post => (
          <li 
            key={post.id} 
            onClick={() => navigate(`/detail/${post.id}`)}
            style={{ cursor: 'pointer' }}
          >
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
