import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../App.css";
import "../public/Home.css";
import { testClient } from "./testClient";


export default function Registration() {
  
  console.log(testClient)
    if (testClient === false) {
        testClient = `https://reactroastapi.up.railway.app`
    } 
    
    if(testClient === true){
        testClient = `http://localhost:5000`
    }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");
  const [googleStatus, setGoogleStatus] = useState("");
  //const [failChecking, setFailCheck] = useState("");

  Axios.defaults.withCredentials = true;

  
  // const config = {
  //   headers:{
      
  //     'Access-Control-Allow-Origin':'*'
      
  //   }
  // }
  const login = () => {
    Axios.post(`${testClient}/login`, {
      username: username,
      password: password,
    }
    ).then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.user);
        
      } else {
        setLoginStatus("false");
        
      }
      
    });
  };

  // useEffect(() => {
  //   Axios.post(`${testClient}/login`).then((response) => {
  //     if(response.data.message === "No user found with these credentials"){
  //       setFailCheck("No user found with these credentials")
  //     }
  //   });
  // }, [])
 
  useEffect(() => {
    Axios.get(`${testClient}/googlepost`).then((response) => {
      if(response.data.uid){
        setGoogleStatus(response.data.username)
      }
    })
  })
useEffect(() => {
    Axios.get(`${testClient}/login`).then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.user)
      }
    });
  }, []);
  
  

  function checkLogin () {
    Axios.get(`${testClient}/login`).then((response) => {
      if(response === null){
        
      }
    })
    if(googleStatus){
      let logout = <a href={`/google`}>Google logout</a>
      document.getElementById('loginCheck').style.visibility = 'hidden'

      return window.location.href = '/google'
    }
    
    if(loginStatus){
      let logout = <a href={`${testClient}/logout`}>Logout</a>
      document.getElementById('loginCheck').style.visibility = 'hidden'

       return logout
    }
    if(!loginStatus){
      let nothing = <div></div>
      return nothing
    }
    
  }

  // function test () {
  //   if(failChecking){
  //     let final = <p>No user found with these credentials</p>

  //     return final
  //   }

  // }

  
  let myArray = ['Users', 'Signup', 'Login', "Profile", "Flashcards", "Blogs"]
    
  return (
    <>
    <div className="topnav">
                <a className="active" href="/">Home</a>
                {myArray.map((elm, i) => (
                    <a href={elm} key={i}>{elm}</a>
                ))}

            </div>
    <div className="App">
      

      <div className="login" id="loginCheck">
      
        <h1>Login</h1>
        <a href="/google">Sign in with Google</a>
        <br />
        <input
          type="text"
          placeholder="Username..."
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password..."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button onClick={login}> Login </button>
        
      </div>
      <h1>{checkLogin()}</h1>
      
      
    </div>
    </>
  );
}