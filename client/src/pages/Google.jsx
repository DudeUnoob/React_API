
import { getAuth,signInWithPopup, GoogleAuthProvider, EmailAuthCredential, signOut } from "firebase/auth";
import initializeAuthentication from '../Firebase/firebaseinit';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import '../public/Home.css';
import {testClient} from './testClient';
let test = '188949576388-vfamlaosjri203jcjo7m0qd8klvkm549.apps.googleusercontent.com'


Axios.defaults.withCredentials = true;
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
    const [vis, setVisibility] = useState("");
    const [randy, setRand] = useState()
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
    let rand;
    function googleSignOut(){
        localStorage.clear()
        Axios.post(`${testClient}/getgoogle`, {
            email: null,
            profilepicture: null,
            uid: null
        }).then((response) => console.log(response))
        document.getElementById("successfullLogout").innerHTML = "Successfully Logged out"
    }

    
    useEffect(() => {
        Axios.get(`${testClient}/login`).then((response) => {
            if(response.data.loggedIn === true){
                setVisibility("hidden")
            }
            if(response.data.loggedIn === false){
                setVisibility("visible")
            }
        })
    },[])
    useEffect(() => {
        Axios.get(`${testClient}/googlepost`).then((response) => {
            if(response.data.loggedIn === true){
                // setRand(<p>Hello</p>)
                // document.getElementById("googleButton").style.visibility = "hidden"
            }
        })
    },[])
    
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
            <a href='/login' style={{marginLeft: "15px", visibility: vis }}>Login with existing account</a>
            <br />
                <button onClick={handleGoogleSignIn} style={{ marginLeft: "15px", visibility: vis }} id="googleButton"><i className="fa fa-google fa-fw"></i>Sign in with Google</button> <br />
                {
                    user.email && (<div>
                        <h2 style={{ marginLeft: "15px"}}>Welcome {user.displayName}</h2>
                        
                        <img src={user.photoURL} style={{borderRadius: "50%", marginLeft: "15px"}} alt=""/>
                    </div>)
                }
               {randy}
               <div>
                   <button style={{marginLeft: "15px" }} type='button' onClick={googleSignOut} id="signingout">Signout</button>
                   <p style={{marginLeft: "15px"}} id="successfullLogout"></p>
               </div>
            </div>
           
  
       
    )
};

export default Google;