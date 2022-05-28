import React from "react";
import { useState, useEffect } from 'react';
import Axios from "axios";
import { testClient } from "./testClient";
import '../public/Home.css';
let myArray = ['Users', 'Signup', 'Login', "Profile", "Flashcards", "Blogs"]

if (testClient === false) {
    testClient = `https://reactroastapi.up.railway.app`
}

if (testClient === true) {
    testClient = `http://localhost:5000`
}
Axios.defaults.withCredentials = true;
function Flashcards() {

    const [flashcard, setFlashcard] = useState([]);
    const [getFlashcard, setGetFlashcard] = useState("");
    const [answer, setAnswer] = useState([]);
    const [username, setUsername] = useState("");
    useEffect(() => {
        Axios.get(`${testClient}/login`).then((response) => {
            if (response.data.loggedIn === false) {
                console.log(response)
                document.getElementById("submitButton").style.visibility = "hidden";
                document.getElementById("checkLogin").style.visibility = "visible";
                document.getElementById("flashcard").style.visibility = "hidden";
                document.getElementById("answer").style.visibility = "hidden";
                document.getElementById("table").style.visibility = "hidden";
                

            } else if (response.data.loggedIn === true) {
                let final = response.data.user
                setUsername(final)

            }
        })
    }, [])

    useEffect(() => {
        Axios.post(`${testClient}/getflashcard`, {
            username: username,
        }).then((response) => {
            //let final = response.data[0]['cards'].flashcard
            setFlashcard(response.data[0]['cards'].flashcard)
            setAnswer(response.data[0]['cards'].answer)

            //console.log(response.data[0]['cards'].flashcard)
            //console.log(final)
            //console.log(getFlashcard)

        })
    }, [username])




    function test() {

        let flashcard = document.getElementById("flashcard").value;
        let answer = document.getElementById("answer").value;

        if (flashcard === "" || answer === "") {
            document.getElementById("validation").style.visibility = "visible";

        } else {
            document.getElementById("validation").style.visibility = "hidden";


            console.log("Flashcard: " + flashcard)
            console.log("Answer: " + answer)

            // Axios.post(`${testClient}/flashcard`, {
            //     flashcard: flashcard,
            //     answer: answer
            // }).then((response) => console.log(response))
            //  document.getElementById("completed").style.visibility = "visible"
            Axios.post(`${testClient}/flashcard`, {
                username: username,
                flashcard: flashcard,
                answer: answer
            }).then((response) => console.log(response)).then((error) => console.log(error))

            setTimeout(function() {
                window.location.reload();
            }, 200)
        }
    }
    const testFlashcard = () => {

        // let ok = document.getElementById("ok").innerHTML = getFlashcard.map((elm) => <li>{elm}</li>)
        // console.log(ok)
        // return ok
        // var filteredCities = ['San Farancisco', 'San Diego', 'New York', 'New Orleans'];
        // var listItems = getFlashcard.map(function (city) {
        //     return '<td>' + city + '</td>';
        // })

        // let answeredItems = answer.map((function (ans) {
        //     return '<td>' + ans + '</td>';
        // }))

        //document.getElementById('with-join').innerHTML = listItems;
        //document.getElementById('with-answer').innerHTML = answeredItems
        //answeredItems.join('');
        
        
    }

    
        
    
    
    let arrayFlashcards = flashcard
    let arrayAnswers = answer
    console.log(arrayFlashcards)
    let listItems = arrayFlashcards.map((city, i) => <td style={{padding: "10px"}} id="flashy"  key={i}>{city}</td>)
    let answeredItems = arrayAnswers.map((ans, i) => <td   style={{padding: "10px"}}  id="ansy" key={i}>{ans}</td>)

    let dude =['hey', 'bae']
    let testing = dude.map((card, i) => {
       <p>{card}</p>

    })
    //console.log(listItems)
    //console.log(answeredItems)
    function ugh () {
        let ah = document.getElementById("searchTxt").value;

        Axios.post(`${testClient}/deleteflashcard`,{
            username: username,
            flashcard: ah
        }).then((response) => console.log(response))
    }
    return (
        
        <div id="Flasher">
            <div className="topnav">
                <a className="active" href="/">Home</a>
                {myArray.map((elm,i) => (
                    <a href={elm} key={i}>{elm}</a>
                ))}

            </div>
            <h1 style={{marginLeft: "15px"}}>Flashcards</h1>


            <input style={{marginLeft: "15px"}} type={"text"} id="flashcard" placeholder="New Flashcard" required></input>
            <br />
            <input style={{marginLeft: "15px"}} type={"text"} id="answer" placeholder="answer to flashcard" required></input>
            <button style={{marginLeft: "15px"}} type={"submit"} onClick={test} id="submitButton">Submit</button>
            <p id="validation" style={{ visibility: "hidden", marginLeft: "15px" }}>Write something</p>
            <p style={{ visibility: "hidden", marginLeft: "15px" }} id="completed">Saved</p>
            <a href="/login" style={{ visibility: "hidden", marginLeft: "15px" }} id="checkLogin">Login to make Flashcards</a>
            
                
            {/* <button onClick={testFlashcard}>Show Flashcards</button> */}

            <div style={{  overflowX: "auto" }}>
            
            <table style={{ marginLeft: "15px" }} id="table">

                <tbody>


                    <tr style={{padding: "10px"}}>
                        <th style={{padding: "10px" }}>Flashcards</th>
                        {listItems}
                    </tr>
                    <tr style={{padding: "10px" }}>
                        <th style={{padding: "10px"}}>Answers</th>
                        {answeredItems}
                        
                    </tr>
                    

                </tbody>
            </table>
            </div>
            
        </div>
       
    )


}

export default Flashcards