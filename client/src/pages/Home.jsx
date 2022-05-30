import React, { useState, useEffect } from "react";
import '../public/Home.css';
import Axios from 'axios';
import { testClient } from "./testClient";


function Home() {
  Axios.defaults.withCredentials = true;
  const [loginStatus, setLoginStatus] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [backendData, setBackendData] = useState([])

  if (testClient === false) {
    testClient = `https://reactroastapi.up.railway.app`
  }

  if (testClient === true) {
    testClient = `http://localhost:5000`
  }

  let myArray = ['Users', 'Signup', 'Login', "Profile", "Flashcards", "Blogs"]
  let ugh = myArray.map((elm, i) => {
    <a href={elm} key={i}>{elm}</a>
  })
  // useEffect(() => {
  //     fetch('/api').then(res => res.json()).then(data => setBackendData(data))
  // }, [])
  
  useEffect(() => {
    Axios.get(`${testClient}/login`).then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.user)
      }
    });
    document.getElementById("myMenu").style.display = "none"
  }, []);
  useEffect(() => {
    Axios.get(`${testClient}/rand`).then((response) => {
      console.log(response.data)
      setTitle(response.data.title)
      setDescription(response.data.description)
    });
  }, []);
  useEffect(() => {
    fetch('/user').then(res => res.json()).then(data => setBackendData(data))
  }, [])
  function myFunction() {
    console.log("ive already been triggered")
    document.getElementById("myMenu").style.display = ""
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("searchBar");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myMenu");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
      if (!filter) {
        li[i].style.display = "none"
        
      }
    }
  }
  let oof = backendData.map((elm ,i) => {
    
    return (<li><a href={`/users/${elm}`} key={i}>{elm}</a></li>)
     
  })
  return (
    <>
      <div className="topnav">
        <a className="active" href="/">Home</a>
        {myArray.map((elm, i) => (
          <a href={elm} key={i}>{elm}</a>
        ))}
        <input type="text" id="searchBar" onKeyUp={() => myFunction()}placeholder="Search.." title="Type in a category" />
        
      </div>
      <ul id="myMenu">
  
  {oof}
</ul>

<div className="cater3-movingBG" style={{display:"flex", height:"827px"}}>
<div className="flyinTxtCont">
<div className="flyIn lineOne">Perfect</div>
<div className="flyIn lineTwo">Food</div>
<div className="flyIn lineThree">Blog</div>
  <div className="flyIn lineFour">Hey, {loginStatus}!</div>
</div>
</div>
    </>


  )


}


export default Home;