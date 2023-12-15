import React from 'react'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CreatePost, ErrorPage, Home, Navbar, Register, } from './pages';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostToast from './components/PostToast';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer position='top-center' />
      <PostToast />
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
