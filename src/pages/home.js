import React, { useEffect, useState } from 'react';
import '../App.css';
import { collection, deleteDoc, getDocs, doc } from 'firebase/firestore';
import { auth, db } from '../firebase-config';

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

      <h1 className='pageTitle'>CMS Blog Site</h1>
      <div className='flexBox'>
      {postList.map((post)=>{
        return <div className='post'>
          <div className='postHeader'>
            <div className='title'>
            <div className='deletPost'>
              {isAuth && post.author.id === auth.currentUser.uid && <button onClick={() => {deletePost(post.id)}}>Delete</button>}
            </div>
              <h1>{post.title}</h1>
            </div>
          </div>
          <div className='postContent'>
            <p>{post.postText}</p>
          </div>
          <h3>{post.author.name}</h3>
        </div>;
      
      })}
      </div>
    </div>
  );
}

export default App;