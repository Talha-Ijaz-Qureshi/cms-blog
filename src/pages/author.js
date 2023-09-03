import React, { useEffect, useState } from 'react';
import '../App.css';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase-config';

function App({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const postCollectionRef = collection(db, "posts");
  const createPost = async () => {
    await addDoc(postCollectionRef,   {title, postText, author: {name: auth.currentUser.displayName, id: auth.currentUser.uid},});
    window.location.pathname = "/cms-blog";
  };

  useEffect(() => {
    if (!isAuth) {
      window.location.pathname = "/login";
    }
  }
 );


  return (
    <div className='authorpg'>
      <div className='editor'>
        <div className='homeTitle'>
          <h1 className='pageTitle'>Create a Blog</h1>
          <svg className='botSvg' width="100%" height="100%" viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" ><circle cx="0" cy="0" r="2" fill="currentColor"></circle><g stroke="currentColor" stroke-width="1" fill="none"><ellipse rx="10" ry="4.5"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse></g></svg>        
          <svg className='topSvg' width="100%" height="100%" viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" ><circle cx="0" cy="0" r="2" fill="currentColor"></circle><g stroke="currentColor" stroke-width="1" fill="none"><ellipse rx="10" ry="4.5"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse></g></svg>        
          </div>
        <div className='nerd'>
          <h2>Blog Title</h2>
        <div className='input'>
          <input placeholder='Enter your blog title...' onChange={
            (event) => {setTitle(event.target.value);
            }}
            />
        </div>
        <h2>Blog Content</h2>

        <div className='input'>
          <textarea placeholder='content..' onChange={
            (event) => {setPostText(event.target.value);
            }} 
            />
        </div>
        <button className='commit' onClick={createPost}>|||</button>
        </div>
      </div>
    </div>
  );
}

export default App;