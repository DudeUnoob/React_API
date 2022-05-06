import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../App.css";
import "../public/Home.css";

export default function Registration() {
  
  let testClient = `https://reactroastapi.up.railway.app`

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

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

 

useEffect(() => {
    Axios.get(`${testClient}/login`).then((response) => {
      if (response.data.loggedIn == true) {
        setLoginStatus(response.data.user)
      }
    });
  }, []);
  
  function checkLogin () {
    Axios.get(`${testClient}/login`).then((response) => {
      if(response == null){
        
      }
    })
    if(loginStatus){
      let logout = <a href={`${testClient}/logout`}>Logout</a>
       return logout
    }
    if(!loginStatus){
      let nothing = <div></div>
      return nothing
    }
  }
  let myArray = ['Users', 'Signup', 'Login', "Profile"]
    
  return (
    <>
    <div className="topnav">
                <a className="active" href="/">Home</a>
                {myArray.map((elm, i) => (
                    <a href={elm} key={i}>{elm}</a>
                ))}

            </div>
    <div className="App">
      

      <div className="login">
        <h1>Login</h1>
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