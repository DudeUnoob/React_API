import React from "react";
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { testClient } from "./testClient";

if (testClient === false) {
    testClient = `https://reactroastapi.up.railway.app`
} 

if(testClient === true){
    testClient = `http://localhost:5000`
}
function Users() {
    Axios.defaults.withCredentials = true;
    const[backendData, setBackendData] = useState([]);
    useEffect(() => {
        Axios.get(`${testClient}/user`).then((response) => {
            setBackendData(response.data)
        })
    }, [])
    let myArray = ['Users', 'Signup', 'Login', "Profile", "Flashcards", "Blogs"]
    let users = backendData.map((element, i) => <li key={i}>{element}</li>)
    return(
        
        <div>
            <div className="topnav">
                <a className="active" href="/">Home</a>
                {myArray.map((elm,i) => (
                    <a href={elm} key={i}>{elm}</a>
                ))}

            </div>
            
            <h1>Users</h1>
            
            <ul>
                {users}
            </ul>
           
        </div>
    )
}

export default Users;
