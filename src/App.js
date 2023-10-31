
import './App.css';
import {signup, login, logout, useAuth} from "./firebase";
import { useRef, useState } from 'react';
import Profile from './Profile';

import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/firestore'

function App() {

  const [loading, setLoading]  = useState(false);
  const currentUser = useAuth();

  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSignup(){
    setLoading(true);
    try{
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch{
      alert("Account already created");
    }
    setLoading(false);
    

  }

  async function handleLogin(){
    setLoading(true);
    try{
      await login(emailRef.current.value, passwordRef.current.value);
    } catch{
      alert("Account already created");
    }
    setLoading(false);
    

  }

  async function handleLogout(){
    setLoading(true);
    try{
      await logout();

    }catch{
      alert("Logout Failed");

    }
    setLoading(false);
    

  }
  
  document.body.style.backgroundColor="#484b6a";
  return (
    <div id="main">
      
      <div id="login_name">Currently logged in as: { currentUser?.email } </div>

      {!currentUser &&
        <>
          <div id="username">
        <p id="username_text">Enter Username</p>
        <input id="user_input" ref={emailRef} placeholder="Email"/>
        
      </div>

      <div id="password">
        <p id="password_text">Enter Username</p>
        <input id="password_input" ref={passwordRef} type="password" placeholder="Password"/>
        
      </div>

      <button id="signup_btn" disabled={loading} onClick={handleSignup}>Sign up</button>
      <button id="signin_btn" disabled={loading} onClick={handleLogin}>Log In</button>
        
        </>
      
      }


      
      

      {currentUser && <><Profile></Profile><button id="signout_btn" disabled={loading || !currentUser} onClick={handleLogout}>Log out</button></>}
    </div>
  );
}

export default App;
