import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Home from './pages/Home';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<h1>Articles</h1>} />
          <Route path="/qnas" element={<h1>QnA</h1>} />
          <Route path="/login" element={<LogIn />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
    </div>
  );
}

export default App;
