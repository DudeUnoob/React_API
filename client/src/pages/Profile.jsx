import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import ReactDOM from 'react-dom';
import '../public/Home.css';
import { testClient } from "./testClient";



function Profile() {
  
  if (testClient === false) {
    testClient = `https://reactroastapi.up.railway.app`
} 

if(testClient === true){
    testClient = `http://localhost:5000`
}
    const [loginStatus, setLoginStatus] = useState("");
    const [baseImage, setBaseImage] = useState("");
    const [profilePictureStatus, setUpdatedProfilePicture] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    
    Axios.defaults.withCredentials = true;
    useEffect(() => {
        Axios.get(`${testClient}/login`).then((response) => {
            if (response.data.loggedIn === true) {
                setLoginStatus(response.data.user)
            }
        });
    }, []);
    const config = {
        headers:{
          
          'Access-Control-Allow-Origin':'${testClient}'
          
        }
      }
    useEffect(() => {
        Axios.post(`${testClient}/getprofilepicture`, {
              username: loginStatus
          }).then((response) => {
            setProfilePicture(response.data.profilepicture)
          })
          //console.log(profilePicture)
    })
    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setBaseImage(base64);
      };
    
      const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
    
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
    
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };
    //   const getProfilePicture = () => {
    //       Axios.post('${testClient}/getprofilepicture', {
    //           username: loginStatus
    //       }).then((response) => {
    //           setProfilePicture(response.data.profilepicture)
    //           console.log(response.data.profilepicture)

    //       })
    //   }
      let finalImage = profilePicture   
      const submitPfp = () => {
          Axios.post(`${testClient}/profilepicture`, {
              image: baseImage,
              user: loginStatus
          }).then((response) => {
              if(response.data.message === "Updated profile picture!"){
                  setUpdatedProfilePicture("completed")
              }})
      }

      function updatedProfilePicture(){
          console.log(profilePictureStatus)
          if(profilePictureStatus){
              document.getElementById("img").style.visibility='hidden';
               
              return (
                  <p>Updated Profile picture</p>
              )
          }
          

      }
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
    //     Axios.post('${testClient}/profilepicture')
    // }
   
  
       
    function checkLogin() {
        Axios.get(`${testClient}/login`).then((response) => {
            if (response == null) {

            }
        })
        if (loginStatus) {
                
            return (
                <div className="App">
                    <h1>Choose a Profile Picture</h1>
                    <input
                    type="file"
                    onChange={(e) => {
                      uploadImage(e);
                    }}
                    
                    accept="image/*"
                  />
                  <br></br>
                  <img id="img" src={baseImage} height="50px" width={"50px"} />
                  
                  <button type="submit" id="testingbutton" onClick={submitPfp}>Submit</button>
                  
                  <div>{updatedProfilePicture()}</div>
                   {/* <button onClick={getProfilePicture}>Ok</button> */}
                   
                   <img id="pfp" src={profilePicture} onClick={() => window.open('/',"_self")}></img>
                  
                </div>
                
              );

            
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