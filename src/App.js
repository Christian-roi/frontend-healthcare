import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Home from './pages/Home';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Navbar from './components/Navbar';
import Articles from './pages/Articles';
import QnAs from './pages/QnAs';

function App() {

  const { user: currentUser } = useSelector((state) => state.auth);
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article" element={<h1>Articles</h1>} />
          <Route path="/qnas" element={<QnAs />} />
          <Route path="/login" element={<LogIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/articles' element={<Articles />} />
        </Routes>
    </div>
  );
}

export default App;
