import { useState, useEffect } from 'react';
import React from "react";
import '../public/Blogs.css';
import Axios from 'axios';
import { testClient } from './testClient';

if (testClient === false) {
    testClient = `https://reactroastapi.up.railway.app`
}

if (testClient === true) {
    testClient = `http://localhost:5000`
}



function Blogs() {
    const [username, setUsername] = useState("")
    const [titler, setTitler] = useState([]);
    const [descrip, setDescrip] = useState([]);
    const [overall, setOverall] = useState([]);
    const [count, setCount] = useState("");
    const [arrayIndex, setArrayIndex] = useState([]);
    const [iValue, setiValue] = useState([]);
    Axios.defaults.withCredentials = true;
    useEffect(() => {
        Axios.get(`${testClient}/login`).then((response) => {
            if (response.data.loggedIn === false) {
                document.getElementById("banner").innerHTML = '<a href="/login">Login to access blogs!</a>'

            } else {
                setUsername(response.data.user)
                console.log(response)
                setCount("one")
            }
        })

    }, [])
    function text() {
        let text = document.getElementById("blogText").value;
        let title = document.getElementById("title").value;
        Axios.post(`${testClient}/blog`, {
            username: username,
            description: text,
            title: title
        }).then((response) => {
            console.log(response.data[0].title)

        })
    }

    //console.log([titler])


    useEffect(() => {
        Axios.post(`${testClient}/getblog`, {
            username: username
        }).then((response) => {


            setOverall(response.data)

            setTitler(response.data)
            setDescrip(response.data)
            console.log(response.data)
        })
    }, [count])
    let obj = {
        "title": [
            "Hey this is my firstBlog",
            "Hey"
        ],
        "description": [
            "nah",
            "fasdjflajfj"
        ]
    }


    let arr = []
    let finalArr = []
    const onSubmit = async () => {



    }
    //let ugh = titler.map((elm, i) => <section key={i}>{elm}</section>)
    //let ah = descrip.map((elm, i) => <section key={i}>{elm}</section>)
    // let i = 0
    // let ok = overall.map(async(elm) => {

    //     for(i; i < elm.title.length ; i++){

    //         let final = elm.title[i] + elm.description[i]
    //        console.log(final)

    //     }
    // })
    const handleSubmit = async(e) =>  {
      //  console.log(e)
    }

    let listItems = overall.map((city, i) => {
        return (
        <div className="card" key={i} style={{margin: "15px"}} onClick={() => handleSubmit(city.title)} >
          
          <div className="container" >
            <p key={i} ><b>{city.title}</b></p>
            <p>{city.description}</p>
            <button type='button' onClick={() => edit(city.title, i)}  >
            Edit
            </button>
            <form id={i} style={{visibility: "visible"}}>
            {/* <input type={"text"}   placeholder="Title Edit"></input>
            <textarea type={"text"}  placeholder="Description Edit" ></textarea> */}
            </form>
          </div>
        </div>
        )
        
    })
    
    function edit (title, i) {
        
        console.log(i)
        document.getElementById(i).innerHTML = '<input type={"text"}   placeholder="Title Edit"></input><textarea type={"text"}  placeholder="Description Edit" style="width:500px; height:200px"></textarea>'
        
        
        
        
        console.log()
        
    }

    //console.log(titler)
    

    
    //let ok = overall.map((city, i) => console.log(city.title))
   
    


    return (
        <>
            <nav className="navbar">


            </nav>

            <div className='banner' id="banner">


                <div className="blog">
                    <h1>Hey {username}!</h1>
                    <textarea type="text" className="title" id="title" placeholder="Blog title..."></textarea>
                    <textarea type="text" className="article" id="blogText" placeholder="Start writing here..."></textarea>
                    <button type='submit' onClick={text}>Save</button>
                    <button type='submit' onClick={onSubmit}>ah</button>
                    
                <h1>Blogs</h1>
                {listItems}
                    

                </div>


                


                
            </div>


        </>
    )
}


export default Blogs;