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
          <h1>REACT.BLOGGING</h1>
        </div>
        <div className='links'>
        <Link to="/cms-blog">Home</Link>
        {!isAuth ? (
          <Link to="/login">Login</Link>
         ) : (
          <>
        <Link to="/author">Publish</Link>  <Link onClick={signUserOut}>Log Out</Link>
        
        </>
        )}
        </div>
      </nav>
      <Routes>
        <Route path='/cms-blog' element={<Home isAuth={isAuth} />} />
        <Route path='/author' element={<Author isAuth={isAuth}/>} />
        <Route path='/login' element={<Login setIsAuth={setIsAuth} />} />

      </Routes>
      <footer>
      <svg width="100%" height="100%" viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" ><circle cx="0" cy="0" r="2" fill="currentColor"></circle><g stroke="currentColor" stroke-width="1" fill="none"><ellipse rx="10" ry="4.5"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse></g></svg>        
      <h1></h1>
      </footer>
    </Router>
  );
}
 
export default App;
