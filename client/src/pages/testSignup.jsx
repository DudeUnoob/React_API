import React from "react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../public/Home.css';
import { testClient } from "./testClient";
import Axios from 'axios';
Axios.defaults.withCredentials = true;

const config = {
    headers:{
      
      'Access-Control-Allow-Origin':'*'
      
    }
  }
  
  if (testClient === false) {
    testClient = `https://reactroastapi.up.railway.app`
} 

if(testClient === true){
    testClient = `http://localhost:5000`
}
class Signup extends React.Component {
    
    constructor(props){
        super(props)

        this.state = {
            username: '',
            password:''
           
        }
    }

    changeHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    }
    
    submitHandler = e => {
        e.preventDefault()
        console.log(this.state)
        axios.post(`${testClient}/user`, this.state)
            .then(response => {
                console.log(response)
                window.open(`${testClient}/successful_signup`, "_blank")
            })
            .catch(error => {
                console.log(error)
            })
    }
    validatePassword () {
        let officialPassword = document.getElementById('password');
        let confirm_password = document.getElementById('confirm_password');
        if (officialPassword.value != confirm_password.value) {
            confirm_password.setCustomValidity("Passwords Don't Match");
          } else {
            confirm_password.setCustomValidity('');
          }
        }
    render(){
        const { username, password } = this.state;
        let myArray = ['Users', 'Signup', 'Login', "Profile", "Flashcards", "Blogs"]
        return(
            <>
            
            <div className="topnav">
                <a class="active" href="/">Home</a>
                {myArray.map(elm => (
                    <a href={elm}>{elm}</a>
                ))}

            </div>
            <div class="area" >
        
                
                    
                
            
            <h1 style={{color: "white"}}>Signup</h1>
            <div class="context"></div>
            
            <div>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <input type="text" name="username" id="username" value={username} onChange={this.changeHandler} placeholder="Username" required/>
                    </div>
                    <div>
                        <input type="password" name="password"  id="password" value={password} onChange={this.changeHandler} placeholder="Password" required/>
                    </div>
                    <div>
                        <input type={"password"} name="confirm_password" id="confirm_password" placeholder="Confirm Password" required/>
                    </div>
                    <button type="submit" onClick={this.validatePassword}>Submit</button>
                </form>
            </div>
            <div>
                <a href="/google" style={{color: "white"}}>Signup with Google</a>
            </div>
            </div >
            </>
        )
    }
}


export default Signup;