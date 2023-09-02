import React, { useEffect, useState } from 'react';
import '../App.css';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase-config';

function App({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const postCollectionRef = collection(db, "posts");
  const createPost = async () => {
    await addDoc(postCollectionRef,   {title, postText, author: {name: auth.currentUser.displayName, id: auth.currentUser.uid}});
    window.location.pathname = "/";
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
        <h1>Create Post</h1>

        <div className='input'>
          <label>Title: </label>
          <input placeholder='title..' onChange={
            (event) => {setTitle(event.target.value);
            }}
            />
        </div>

        <div className='input'>
          <label>Post: </label>
          <textarea placeholder='content..' onChange={
            (event) => {setPostText(event.target.value);
            }} 
            />
        </div>
        <button onClick={createPost}>Submit</button>
      </div>
    </div>
  );
}

export default App;