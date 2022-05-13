import { useState, useEffect } from 'react';
import Axios from 'axios';
import { testClient } from './testClient';
import '../public/Home.css';

function GoogleProfile () {

    const [loginStatus, setLoginStatus] = useState("")

    const validateLogin = () => {
        
    }
    if (testClient === false) {
        testClient = `https://reactroastapi.up.railway.app`
    } 
    
    if(testClient === true){
        testClient = `http://localhost:5000`
    }

    useEffect(() => {
        Axios.get(`${testClient}/googlepost`).then((response) => {
            if(response.data.loggedIn === true){
                setLoginStatus(
                    {
                        username: response.data.username,
                        pfp: response.data['pfp'].profilepicture
                    }
                )
            }
        })
    },[])
    let myArray = ['Users', 'Signup', 'Login', "Profile"]
    return (
        <div>
            <div className="topnav">
                <a className="active" href="/">Home</a>
                {myArray.map((elm, i) => (
                    <a href={elm} key={i}>{elm}</a>
                ))}

            </div>
            <h1>Welcome {loginStatus.username}</h1>
            <p>Hello</p>
            
            <a href='/'><img src={loginStatus.pfp} style={{ borderRadius: "50%"}}/></a>
            {/* <button onClick={validateLogin}>Click</button> */}
            
        </div>
    )
}

export default GoogleProfile;