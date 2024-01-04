import React, { useState } from "react";
import axios from "axios";

const Login=({setToken})=>{
    const [user, setUser]=useState({
        email:"",
        password:"",
    });
   const[message, setMessage]=useState("");

 async function saveData(e){
    e.preventDefault();
   
   try{
    const response=await axios.post("https://instagram-express-app.vercel.app/api/auth/login",{
        email:user.email,
        password:user.password
    }
    );
    console.log( response.data.message);
    console.log("Status : ",response.status);
    setMessage(response.data.message);
    setToken(response.data.data.token);
    setUser({
        email:"",
        password:"",
    });
   }
   catch(error){
    console.log("Error", error.response.data.message);
    console.log("Status : ",error.response.status);
    setMessage(error.response.data.message);
   }
}

 function changeInput(e){

    setUser({
        ...user, [e.target.name]:e.target.value
    })
 }
    return (
        <div>
            <h1>Login</h1>
            {
                message && <h2>{message}</h2>
            }
            <form onSubmit={saveData}>
              <label htmlFor="lEmail">Email</label><br/>
              <input id="lEmail" type="email" name="email" onChange={changeInput}/> <br/>
              <label htmlFor="lPassword">Password</label><br/>
              <input id="lPassword" type="password" name="password" onChange={changeInput}/><br/>
              <button type="submit">submit</button>
            </form>
        </div>
    )
}


export default Login;