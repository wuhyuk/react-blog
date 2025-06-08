import React from 'react';
import Home from './pages/Home';
import Login from './components/login/Login';
import SignUp from './components/login/SignUp';
import Blog from './components/blog/Blog';
import Search from './components/blog/Search';
import List from './components/blog/List';
import Post from './components/blog/Post';
import Detail from './components/blog/Detail';
import './App.css';

import { 
  HashRouter, 
  Routes, 
  Route 
} from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/search" element={<Search />} />
        <Route path="/list" element={<List />} />
        <Route path="/post" element={<Post />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </HashRouter>
  );
}

export default App;