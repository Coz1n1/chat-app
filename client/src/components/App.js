import React from 'react';
import Login from './Login';
import Logged from './Logged';
import Home from './Home'
import Register from './Register'
import Error from './Error';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Navbar';

function App() {
  return (
    <>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logged" element={<Logged />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;


