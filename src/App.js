import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home'
import Author from './pages/author'
import Login from './pages/login'
import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  useEffect(() => {
    const storedIsAuth = localStorage.getItem("isAuth");
    if (storedIsAuth === "true") {
      setIsAuth(true);
    }
  });
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login"
    }
    )
  }
  return (
    <Router>
      <nav>
        <div>
        </div>
        <Link to="/cms-blog">Home</Link>
        {!isAuth ? (
          <Link to="/login">Login</Link>
         ) : (
          <>
        <Link to="/author">Create</Link>  <Link onClick={signUserOut}>Log Out</Link>
        
        </>
        )}
      </nav>
      <Routes>
        <Route path='/cms-blog' element={<Home isAuth={isAuth} />} />
        <Route path='/author' element={<Author isAuth={isAuth}/>} />
        <Route path='/login' element={<Login setIsAuth={setIsAuth} />} />

      </Routes>
    </Router>
  );
}
 
export default App;
