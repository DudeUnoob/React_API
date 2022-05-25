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

let myArray = ['Users', 'Signup', 'Login', "Profile", "Flashcards", "Blogs"]

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
    const handleSubmit = async (e) => {
        //  console.log(e)
    }

    let listItems = overall.map((city, i) => {
        return (
            <div className="card" key={i} style={{ margin: "15px", maxWidth: "75%", borderRadius: "15px" }} onClick={() => handleSubmit(city.title)} >

                <div className="container" >
                    <p key={i} ><b>{city.title}</b></p>
                    <p>{city.description}</p>
                    <button type='button' style={{
                        backgroundColor: "#588163",
                        border: "none",
                        color: "white",
                        marginLeft: "5px",
                        padding: "10px 10px",
                        textAlign: "center",
                        borderRadius: "10px",
                        textDecoration: "none",
                        display: "inline-block",
                        marginTop: "12px",
                        fontSize: "15px"
                    }} onClick={() => edit(city.title, i)}  >
                        Edit
                    </button>
                    <button style={{
                        backgroundColor: "#c53a48",
                        border: "none",
                        color: "white",
                        marginLeft: "5px",
                        padding: "10px 10px",
                        textAlign: "center",
                        borderRadius: "10px",
                        textDecoration: "none",
                        display: "inline-block",
                        marginTop: "12px",
                        fontSize: "15px"
                    }}type='button' name="confirmDelete"  onClick={() => confirmDelete(city.title, i)}>Delete</button>
                    <form id={i} style={{ visibility: "hidden" }}>
                        <input type={"text"} name="titleEdit" placeholder="Title Edit"></input>
                        <input type={"text"} name="descriptionEdit" placeholder="Description Edit" ></input>
                        <button type='button' style={{
                            backgroundColor: "#3cb371",
                            border: "none",
                            color: "white",
                            marginLeft: "5px",
                            padding: "10px 10px",
                            textAlign: "center",
                            borderRadius: "10px",
                            textDecoration: "none",
                            display: "inline-block",
                            fontSize: "15px"
                        }} onClick={() => testButton(city.title, i)}>Save</button>

                    </form>
                </div>
            </div>
        )

    })
    const confirmDelete = (title, i) => {
        let text;
       
        if(window.confirm("Are you sure you want to delete this blog?")){
            console.log("Deleted")
            console.log(title)
            Axios.post(`${testClient}/deleteblog`, {
                username: username,
                title: title
            }).then((response) => console.log(response))

            window.location.reload()
        }
        else {
            console.log("Canceled Deletion")
        }
    }

    function testButton(title, i) {
        let titleEdit = document.querySelector("input[name='titleEdit']").value
        let descriptionEdit = document.querySelector("input[name='descriptionEdit']").value;
        if (descriptionEdit === "") {
            Axios.post(`${testClient}/editblog`, {
                title: titleEdit,
                ogtitle: title,
                username: username
            }).then((response) => console.log(response))
            window.location.reload()
            console.log('sent only the title edit')
        }
        if (titleEdit === "") {
            Axios.post(`${testClient}/editblog`, {
                description: descriptionEdit,
                ogtitle: title,
                username: username
            }).then((response) => console.log(response))
            window.location.reload()
            console.log('sent only the description edit')
        }
        if (titleEdit !== "" && descriptionEdit !== "") {
            Axios.post(`${testClient}/editblog`, {
                description: descriptionEdit,
                title: titleEdit,
                ogtitle: title,
                username: username
            }).then((response) => console.log(response))
            window.location.reload()
            console.log('sent both edits!')
        }
        // console.log(titleEdit)
        // console.log(descriptionEdit)

    }

    function edit(title, i) {
        document.getElementById(i).style.visibility = "visible";

    }

    //console.log(titler)



    //let ok = overall.map((city, i) => console.log(city.title))




    return (
        <>
            
            {/* <nav className="navbar">


            </nav> */}

            <div className='banner' id="banner">


            <div className="blog">
                <h1>Hey {username}!</h1>
                <textarea type="text" className="title" id="title" placeholder="Blog title..." maxLength={"60"}></textarea>
                <textarea type="text" className="article" id="blogText" placeholder="Start writing here..." maxLength={"20000"}></textarea>


                <h1>Blogs</h1>
                {listItems}







            </div>

            </div>


        </>
    )
}


export default Blogs;