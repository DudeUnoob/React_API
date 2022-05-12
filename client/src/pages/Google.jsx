import  GoogleLogin  from 'react-google-login';
import { getAuth,signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import initializeAuthentication from '../Firebase/firebaseinit';
import { useState } from 'react';
import Axios from 'axios';
import '../public/Home.css';
import {testClient} from './testClient';
let test = '188949576388-vfamlaosjri203jcjo7m0qd8klvkm549.apps.googleusercontent.com'



initializeAuthentication();

const provider = new GoogleAuthProvider();

if (testClient === false) {
    testClient = `https://reactroastapi.up.railway.app`
} 

if(testClient === true){
    testClient = `http://localhost:5000`
}

function Google() {
    const [setLoginStatus, loginStatus] = useState("");
    const [user, setUser] = useState({});
    const handleGoogleSignIn = () => {
        const auth = getAuth();
    
        signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            setUser(user);
           localStorage.setItem("email", user.email)
           localStorage.setItem("profilePicture", user.photoURL)
           localStorage.setItem("uid", user.uid)


           Axios.post(`${testClient}/getgoogle`, {
               email: localStorage.getItem("email"),
               profilepicture: localStorage.getItem("profilePicture"),
               uid: localStorage.getItem("uid")
           }).then((response) => { console.log(response.data.loggedIn)});
        }).catch(error => {
            console.log(error.message)
        });
    }
    let myArray = ['Users', 'Signup', 'Login', "Profile"]

    {/* <GoogleLogin 
            clientId={test} 
            buttonText="Log in with Google" 
            onSuccess={handleLogin} 
            onFailure={handleFailure} 
            cookiePolicy={'single_host_origin'}>

            </GoogleLogin> */}
    return (
        
            <div>
                <div className="topnav">
                <a className="active" href="/">Home</a>
                {myArray.map((elm, i) => (
                    <a href={elm} key={i}>{elm}</a>
                ))}

            </div>
                <button onClick={handleGoogleSignIn} style={{ marginLeft: "15px"}}>Google Sign in</button> <br />
                {
                    user.email && (<div>
                        <h2 style={{ marginLeft: "15px"}}>Welcome {user.displayName}</h2>
                        
                        <img src={user.photoURL} style={{borderRadius: "50%", marginLeft: "15px"}} alt=""/>
                    </div>)
                }
               
            </div>
           
  
       
    )
};

export default Google;