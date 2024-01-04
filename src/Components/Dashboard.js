import axios from "axios";
import React, { useState } from "react";


const Dashboard=({token})=>{
  const [joke, setJoke]=useState("");

    function getJoke(){

        axios.get("https://instagram-express-app.vercel.app/api/auth/zuku",{
            headers:{
                "authorization":`Bearer ${token}`
            }
        }).then(res=>{
            console.log("joke", res.data.data.message);
            setJoke(res.data.data.message);
        })
        .catch(err=> console.log("Error",err.response.data.message))
    }

    return(
        <div>
            <h1>Dashboard</h1>
          <button onClick={getJoke}>Give Joke</button>
          {
            joke && <h2>{joke}</h2>
          }
        </div>
    )
}


export default Dashboard;