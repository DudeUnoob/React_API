import React from "react";
import Axios from 'axios';
import { useEffect, useState } from 'react';
import '../public/Home.css';

function Covid () {

    const li1 = {
        marginLeft: "25px"
    }
    Axios.defaults.withCredentials = true;
    const [backendData, setBackendData] = useState("");
        
    useEffect(() => {
        Axios.get('http://localhost:5000/covid').then((response) => setBackendData(
            
        {
            name: response.data.name,
            state_code: response.data.state_code,
            population: response.data.population,
            url: response.data.url
        }
        )) 
    }, []);
    let backendDataArray = ['State: '+ backendData.name, 'State Code: ' + backendData.state_code, 'Population: ' + backendData.population]

    
    let pushArray = backendDataArray.map((elm, i) => <li  key={i} style={li1}>{elm}</li>)
    return (
        <div>
            <h1>Alaska Covid Information</h1>
            <ul>
                
                {pushArray}
                <li style={li1}><a href={backendData.url}>Website</a></li>
            </ul>
        </div>
        
    )
}

export default Covid;

