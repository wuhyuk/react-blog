import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  useNavigate
} from 'react-router-dom';
import './post.css';

function Post() {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const navigate = useNavigate();

    const fetchPosts = async () => {
        const response = await axios.get('persistent-bow-bangle.glitch.me/posts');
        setPosts(response.data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // 게시글 추가
    const handleAddPost = async () => {
        if (!title || !content || !author) {
        alert('모든 필드를 입력하세요.');
        return;
        }

    const newPost = { title, content, author };

    await axios.post('persistent-bow-bangle.glitch.me', newPost);
    setTitle('');
    setContent('');
    setAuthor('');
    fetchPosts();
    navigate('/blog');
    };

    return (
        <div className='post-container'>
            <h1>Secret Blog</h1>
            <div className='post-header'>
                <h2>블로그 글 작성</h2>
                <button onClick={() => navigate('/blog')}>취소</button>
            </div>
            <section>
                <input
                    placeholder="제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <textarea
                    placeholder="내용"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <br />
                <input
                    placeholder="작성자"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
            </section>
            <br />
            <button onClick={handleAddPost}>작성</button>
        </div>
  );
}

export default Post;
