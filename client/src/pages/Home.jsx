import React from "react";
import { useEffect, useState } from 'react';
import '../public/Home.css';


function Home() {



    let myArray = ['Users', 'Signup', 'Login', "Profile"]
    const [backendData, setBackendData] = useState({});
    useEffect(() => {
        fetch('/api').then(res => res.json()).then(data => setBackendData(data))
    }, [])
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
            <p> {backendData.message}</p>
            <p ><i>Refresh for a random message</i></p>
            </div>


            <div className="area" >

            </div >
            
        </>
    )


}


export default Home;