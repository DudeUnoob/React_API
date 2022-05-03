import React from "react";
import { useEffect, useState } from 'react';


function Users() {
    const[backendData, setBackendData] = useState([]);
    useEffect(() => {
        fetch('/user').then(res => res.json()).then(data => setBackendData(data))
    }, [])
    let myArray = ['Users', 'Signup', 'Login', "Profile"]
    let users = backendData.map((element, i) => <li key={i}>{element}</li>)
    return(
        
        <div>
            <div className="topnav">
                <a class="active" href="/">Home</a>
                {myArray.map(elm => (
                    <a href={elm}>{elm}</a>
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
