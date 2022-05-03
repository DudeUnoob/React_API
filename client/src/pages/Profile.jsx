import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";

function Profile() {
    const [loginStatus, setLoginStatus] = useState("");

    Axios.defaults.withCredentials = true;
    useEffect(() => {
        Axios.get("http://localhost:5000/login").then((response) => {
            if (response.data.loggedIn == true) {
                setLoginStatus(response.data.user)
            }
        });
    }, []);
    
    function checkLogin() {
        Axios.get("http://localhost:5000/login").then((response) => {
            if (response == null) {

            }
        })
        if (loginStatus) {
                
            

            return (<a href="http://localhost:5000/logout">Logout</a>)
        }
        if (!loginStatus) {
            let redirect = <a href="/login">Login to Continue</a>
            return redirect
        }
    }
    let myArray = ['Users', 'Signup', 'Login', "Profile"]
    return (
        <>
            <div>
            <div className="topnav">
                <a class="active" href="/">Home</a>
                {myArray.map(elm => (
                    <a href={elm}>{elm}</a>
                ))}

            </div>
                {checkLogin()}
            </div>

        </>
    )

}

export default Profile;