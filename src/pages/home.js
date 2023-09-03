import React, { useEffect, useState } from 'react';
import '../App.css';
import { collection, deleteDoc, getDocs, doc } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import logo from '../images/logo192.png';

function App({ isAuth }) {
  const [postList, setPostList] = useState([]);
  const postCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postCollectionRef);
      setPostList(data.docs.map((doc)=> ({...doc.data(), id: doc.id})))
    };
    getPosts()
  }
  );

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id)
    await deleteDoc(postDoc)
  }
  return (
    <div className='homepg'>
      <div className='homeTitle'>
        <h1 className='pageTitle'>REACT Publishing</h1>
        <svg className='botSvg' width="100%" height="100%" viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" ><circle cx="0" cy="0" r="2" fill="currentColor"></circle><g stroke="currentColor" stroke-width="1" fill="none"><ellipse rx="10" ry="4.5"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse></g></svg>        
        <svg className='topSvg' width="100%" height="100%" viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" ><circle cx="0" cy="0" r="2" fill="currentColor"></circle><g stroke="currentColor" stroke-width="1" fill="none"><ellipse rx="10" ry="4.5"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse></g></svg>        
        </div>
        <h2>
          Recent Blogs
        </h2>
      <div className='flexBox'>
      {postList.map((post)=>{
        return <div className='post'>
          <div className='postHeader'>
            <div className='title'>
            <div className='deletPost'>
              {isAuth && post.author.id === auth.currentUser.uid && <button onClick={() => {deletePost(post.id)}}>Delete Post</button>}
            </div>
              <h1>{post.title}</h1>
            </div>
          </div>
          <div className='postContent'>
            <p>{post.postText}</p>
          </div>
          <h3>@ {post.author.name}</h3>
        </div>;
      
      })}
      </div>
    </div>
  );
}

export default App;