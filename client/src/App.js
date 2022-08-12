import React from 'react'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CreatePost, ErrorPage, Home, Navbar, Register } from './pages'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='create-post' element={<CreatePost />} />
        <Route path='register' element={<Register />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
