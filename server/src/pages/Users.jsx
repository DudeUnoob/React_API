import React from "react";
import { useEffect, useState } from 'react';


function Users() {
    const[backendData, setBackendData] = useState([]);
    useEffect(() => {
        fetch('/user').then(res => res.json()).then(data => setBackendData(data))
    }, [])
    
    let users = backendData.map((element, i) => <li key={i}>{element}</li>)
    return(
        <div>
            
            <h1>Users</h1>
            
            <ul>
                {users}
            </ul>
           
        </div>
    )
}

export default Users;
