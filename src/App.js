import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<h1>Articles</h1>} />
          <Route path="/qnas" element={<h1>QnA</h1>} />
          <Route path="/login" element={<h1>Login</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
