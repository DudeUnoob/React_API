import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { testClient } from './testClient';

if (testClient === false) {
    testClient = `https://reactroastapi.up.railway.app`
}

if (testClient === true) {
    testClient = `http://localhost:5000`
}

function BlogRender() {
    Axios.defaults.withCredentials = true;
    const [blogData, setBlogData] = useState([]);
    const { title } = useParams()
    const { user } = useParams()

    useEffect(() => {
        Axios.post(`${testClient}/userblogdescription`, {
            username: user,
            title: title
        }).then((response) => { 
            console.log(response.data) 
            setBlogData(response.data)
            
        }
        )
    }, [])
    let final = blogData.map((elm, i) => {
       return ( <div className="card" style={{width: "50%"}} key={i}>
        <div className="container">
            <h4><b>{elm}</b></h4>
            
        </div>
    </div>)
    })
    return (
        <div style={{marginLeft:"15px"}}>
           
            <h1>{title}</h1>
            {final}

        </div>
    )
}

export default BlogRender;