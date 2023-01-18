import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Home from './pages/Home';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
// import Navbar from './components/Navbar';
import Articles from './pages/Articles';
import QnAs from './pages/QnAs';
import DetailArticle from './pages/DetailArticle';
import CreateArticle from './pages/CreateArticle';
import Profile from './pages/Profile';
import DetailQnA from './pages/DetailQnA';

function App() {

  const { user: currentUser } = useSelector((state) => state.auth);
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/create-article' element={<CreateArticle />}/>
          <Route path="/articles" element={<Articles />} />
          <Route path="/detail-article/:id" element={<DetailArticle />} />
          <Route path="/qnas" element={<QnAs />} />
          <Route path='/qnas/:id' element={<DetailQnA />} />
          <Route path="/login" element={<LogIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
    </div>
  );
}

export default App;
