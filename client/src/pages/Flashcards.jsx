import React from "react";
import { useState, useEffect } from 'react';
import Axios from "axios";
import { testClient } from "./testClient";

if (testClient === false) {
    testClient = `https://reactroastapi.up.railway.app`
} 

if(testClient === true){
    testClient = `http://localhost:5000`
}
Axios.defaults.withCredentials = true;
function Flashcards () {
    
    const [flashcard, setFlashcard] = useState("");
    const [answer, setAnswer] = useState("");
    const [username, setUsername] = useState("");
    useEffect(() => {
        Axios.get(`${testClient}/login`).then((response) => {
            if(response.data.loggedIn == false){
                console.log(response)
                document.getElementById("submit").style.visibility = "hidden";
                document.getElementById("checkLogin").style.visibility = "visible";
                
            } else{
                setUsername(response.data.user)
                
            }
        })
    },[])

    function test(){
        
        let flashcard = document.getElementById("flashcard").value;
        let answer = document.getElementById("answer").value;

        if(flashcard == "" || answer == ""){
            document.getElementById("validation").style.visibility = "visible";
            
        } else {
             document.getElementById("validation").style.visibility = "hidden";
            
            
                console.log("Flashcard: "+ flashcard)
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
                }).then((response) => console.log(response))
                
        }
    }
    

    return (
        <div>
            <h1>Flashcards</h1>
            
            <input type={"text"} id="flashcard" placeholder="New Flashcard"   onClick={(e) => {setFlashcard(e.target.value)}}   required></input>
            <br />
            <input type={"text"} id="answer" placeholder="answer to flashcard" onClick={(e) => {setAnswer(e.target.value)}}  required></input>
            <button type={"submit"} onClick={test} id="submit">Submit</button>
            <p id="validation" style={{ visibility: "hidden"}}>Write something</p>
            <p style={{visibility: "hidden"}} id="completed">Saved</p>
            <a href="/login" style={{visibility: "hidden"}} id="checkLogin">Login to make Flashcards</a>
            
        </div>
    )

}

export default Flashcards