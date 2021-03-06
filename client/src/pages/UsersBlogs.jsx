import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { testClient } from './testClient';

function UsersBlogs() {
    Axios.defaults.withCredentials = true;
    const [blogData, setBlogData] = useState([]);
    if (testClient === false) {
        testClient = `https://reactroastapi.up.railway.app`
    }

    if (testClient === true) {
        testClient = `http://localhost:5000`
    }
    const { user } = useParams()

    useEffect(() => {
        Axios.post(`${testClient}/usersblog`, {
            username: user
        }).then((response) =>
            setBlogData(response.data)
        )
    }, [])
    
    let listOfBlogs = blogData.map((elm, i) => {
        return (
        <div className="card" style={{width: "50%", marginLeft: "15px", hover:"green"}} onClick={() => window.open(`/users/${user}/${elm.title}`, "_self")} key={i}>
        <div className="container">
            <h4><b>{elm.title}</b></h4><i>Created: {elm.time}</i>
            
        </div>
    </div>
        )
    })
    return (
        <>
        <div style={{marginLeft:"15px"}}>
            <h1>{user[0].toUpperCase()}{user.slice(1, user.length)}'s Blogs</h1>
            {listOfBlogs}
        </div>
        
        </>
    )
}

export default UsersBlogs;