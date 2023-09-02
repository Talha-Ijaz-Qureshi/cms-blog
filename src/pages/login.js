import '../App.css';
import { auth, provider } from '../firebase-config';
import { signInWithPopup } from 'firebase/auth';

function App({ setIsAuth }) {
  

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) =>{
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      window.location.pathname = "/cms-blog"
    });
  };
  return (
    <div className='loginpg'>
    <p>Sign in</p>
    <button className='login-with-google-btn' onClick={signInWithGoogle}>
      Sign in with Google
    </button>
    </div>
  );
}

export default App;