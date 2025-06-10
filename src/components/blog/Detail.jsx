import React, { useEffect, useState } from 'react';
import { 
  useParams,
  useNavigate
} from 'react-router-dom';
import axios from 'axios';
import './detail.css';

function Detail() {
  const { id } = useParams(); // URL의 :id를 가져옴
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(`https://persistent-bow-bangle.glitch.me/posts/${id}`);
      setPost(response.data);
    };

    fetchPost();
  }, [id]);

  if (!post) return <div>로딩 중...</div>;

  return (
    <div className='detail-container'>
      <h1>Secret Blog</h1>
      <h2>{post.title}</h2>
      <p><strong>작성자:</strong> {post.author}</p>
      <p><strong>내용</strong></p>
      <p>{post.content}</p>
      <button onClick={() => {navigate('/blog')}}>돌아가기</button>
    </div>
  );
}

export default Detail;
