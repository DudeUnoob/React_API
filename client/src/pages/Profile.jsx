import React, { Fragment } from "react";
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

    
    // let state = {
    //     selectedFile: null  
    // }
    // function fileSelectedHandler(event){
    //     //console.log(event.target.files[0]);
    //     useEffect({
    //         selectedFile: event.target.files[0]
    //     })
    // }

    // function fileUploadHandler(){
    //     const fd = new FormData();
    //     fd.append('image', this.state.selectedFile, this.state.selectedFile.name)
    //     Axios.post('http://localhost:5000/profilepicture')
    // }
    function checkLogin() {
        Axios.get("http://localhost:5000/login").then((response) => {
            if (response == null) {

            }
        })
        if (loginStatus) {
                
           return (
               <div>
                   <h1>Hello {loginStatus}!</h1>
               </div>
           )

            
        }
        if (!loginStatus) {
            let redirect = <a href="/login">Login</a>
            return redirect
        }
    }
    let myArray = ['Users', 'Signup', 'Login', "Profile"]
    return (
        <>
            <div>
            <div className="topnav">
                <a className="active" href="/">Home</a>
                {myArray.map((elm, i) => (
                    <a href={elm} key={i}>{elm}</a>
                ))}

            </div>
                {checkLogin()}
            </div>

        </>
    )

}

export default Profile;