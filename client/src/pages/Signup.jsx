import React from "react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../public/Home.css';
const config = {
    headers:{
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
      'Access-Control-Allow-Origin':'*'
      
    }
  }
let testClient = `https://reactroastapi.up.railway.app`
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
        axios.post(`${testClient}/user`, this.state, config)
            .then(response => {
                console.log(response)
                window.open(`${testClient}/successful_signup`, "_blank")
            })
            .catch(error => {
                console.log(error)
            })
    }
    render(){
        const { username, password } = this.state;
        let myArray = ['Users', 'Signup', 'Login', "Profile"]
        return(
            <>
            
            <div className="topnav">
                <a class="active" href="/">Home</a>
                {myArray.map(elm => (
                    <a href={elm}>{elm}</a>
                ))}

            </div>
            <div class="area" >
        
                
                    
                
            
            <h1 style={{color: "white"}}>Signup!</h1>
            <div class="context"></div>
            
            <div>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <input type="text" name="username" value={username} onChange={this.changeHandler} required/>
                    </div>
                    <div>
                        <input type="password" name="password" value={password} onChange={this.changeHandler} required/>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
            </div >
            </>
        )
    }
}


export default Signup;