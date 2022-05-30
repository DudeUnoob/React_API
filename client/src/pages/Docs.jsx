import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useQuill } from 'react-quilljs';
import { testClient } from './testClient';
import Quill from 'quill';
if (testClient === false) {
  testClient = `https://reactroastapi.up.railway.app`
}

if (testClient === true) {
  testClient = `http://localhost:5000`
}
function Docs(){
  const [username, setUsername] = useState("");
  const { quill, quillRef } = useQuill();
  const { quilly, qref } = useQuill()
  const [documentData, setDocumentData] = useState({});
  const [count, setCount] = useState("")
  useEffect(() => {
    Axios.get(`${testClient}/login`).then((response) => {
      if(response.data.loggedIn === false){
        //document.getElementById("body").style.visibility = 'hidden'
        document.getElementById("body").innerHTML = '<a href="/login">Login to access blogs!</a>' 
      } 
      else {
        setUsername(response.data.user)
        setCount("one")

      }
    })
  })
  useEffect(() => {
    Axios.post(`${testClient}/getdocument`, {
      username: username,
    }).then((response) => {
      console.log(response)
      console.log(response.data.Document['ops'])

      setDocumentData(response.data.Document['ops'])
      
    })
  },[count])
  setTimeout(() => {
    quill.setContents(documentData)

  },1000)

  useEffect(() => {

    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        console.log('Text change!');
        console.log(quill.getText()); // Get text only
        console.log(quill.getContents()); // Get delta contents
        Axios.post(`${testClient}/document`, {
          document: quill.getContents(),
          username: username
        }).then((response) => console.log(response))
        console.log(quill.root.innerHTML); // Get innerHTML using quill
        console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
      });
    }
    
    
  }, [quill]);
  console.log(documentData)
  return (
    <>
    <div id="body" >
      <h1>{username}</h1>
      <div ref={quillRef} style={{height:"700px" }}/>
    </div>
    <div ref={qref}>

    </div>
    </>
  );
}
export default Docs;