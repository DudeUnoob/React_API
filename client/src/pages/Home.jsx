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

    let myArray = ['Users', 'Signup', 'Login', "Profile"]
    const [backendData, setBackendData] = useState({});
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
            <div className="topnav">
                <a className="active" href="/">Home</a>
                {myArray.map((elm, i) => (
                    <a href={elm} key={i}>{elm}</a>
                ))}

            </div>


            <div className="context">
                <h1 style={{ marginLeft: 15 }}>Welcome to the Home Page!</h1>
                {/* <p> {backendData.message}</p> */}
                <p ><i>Refresh for a random message</i></p>
                <p><b>Hey, {loginStatus}!</b></p>
            </div>


            <div className="area" >

            </div >

        </>
    )


}


export default Home;