import  GoogleLogin  from 'react-google-login';
import { getAuth,signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import initializeAuthentication from '../Firebase/firebaseinit';
import { useState } from 'react';
let test = '188949576388-vfamlaosjri203jcjo7m0qd8klvkm549.apps.googleusercontent.com'


initializeAuthentication();

const provider = new GoogleAuthProvider();



function Google() {
    const [user, setUser] = useState({});
    const handleGoogleSignIn = () => {
        const auth = getAuth();
    
        signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            setUser(user);
        }).catch(error => {
            console.log(error.message)
        })
    }

    {/* <GoogleLogin 
            clientId={test} 
            buttonText="Log in with Google" 
            onSuccess={handleLogin} 
            onFailure={handleFailure} 
            cookiePolicy={'single_host_origin'}>

            </GoogleLogin> */}
    return (
        
            <div>
                <button onClick={handleGoogleSignIn} style={{ marginLeft: "15px"}}>Google Sign in</button> <br />
                {
                    user.email && (<div>
                        <h2 style={{ marginLeft: "15px"}}>Welcome {user.displayName}</h2>
                        
                        <img src={user.photoURL} style={{borderRadius: "50%", marginLeft: "15px"}} alt=""/>
                    </div>)
                }
               
            </div>
           
  
       
    )
}

export default Google;