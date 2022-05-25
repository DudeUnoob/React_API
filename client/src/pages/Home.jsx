import React from "react";
import { useEffect, useState } from 'react';
import '../public/Home.css';
import Axios from 'axios';
import { testClient } from "./testClient";


function Home() {
    Axios.defaults.withCredentials = true;
    const [loginStatus, setLoginStatus] = useState("");
    
    if (testClient === false) {
        testClient = `https://reactroastapi.up.railway.app`
    } 
    
    if(testClient === true){
        testClient = `http://localhost:5000`
    }

    let myArray = ['Users', 'Signup', 'Login', "Profile", "Flashcards", "Blogs"]
    const [backendData, setBackendData] = useState({});
    let ugh = myArray.map((elm ,i) => {
        <a href={elm} key={i}>{elm}</a>
    })
    // useEffect(() => {
    //     fetch('/api').then(res => res.json()).then(data => setBackendData(data))
    // }, [])
    useEffect(() => {
        Axios.get(`${testClient}/login`).then((response) => {
            if (response.data.loggedIn === true) {
                setLoginStatus(response.data.user)
            }
        });
    }, []);
    return (
        <>
            <div className="header">
  <h1>My Website</h1>
  <p>Resize the browser window to see the effect.</p>
</div>

<div className="topnav">
{myArray.map((elm, i) => (
                    <a href={elm} key={i} >{elm}</a>
                ))}
</div>

<div className="row">
  <div className="leftcolumn">
    <div className="card">
      <h2>TITLE HEADING</h2>
      <h5>Title description, Dec 7, 2017</h5>
      <div className="fakeimg" style={{height:"200px"}}>Image</div>
      <p>Some text..</p>
      <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
    </div>
    <div className="card">
      <h2>TITLE HEADING</h2>
      <h5>Title description, Sep 2, 2017</h5>
      <div className="fakeimg" style={{height:"200px"}}>Image</div>
      <p>Some text..</p>
      <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
    </div>
  </div>
  <div className="rightcolumn">
    <div className="card">
      <h2>About Me</h2>
      <div className="fakeimg" style={{height:"100px"}}>Image</div>
      <p>Some text about me in culpa qui officia deserunt mollit anim..</p>
    </div>
    <div className="card">
      <h3>Popular Post</h3>
      <div className="fakeimg"><p>Image</p></div>
      <div className="fakeimg"><p>Image</p></div>
      <div className="fakeimg"><p>Image</p></div>
    </div>
    <div className="card">
      <h3>Follow Me</h3>
      <p>Some text..</p>
    </div>
  </div>
</div>

<div className="footer">
  <h2>Footer</h2>
</div>

        </>
    )


}


export default Home;