import React, { useState } from "react";
import axios from "axios";

const SignUp=({setToken})=>{
    const [user, setUser]=useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:""
    });
   const[message, setMessage]=useState("");

 async function saveData(e){
    e.preventDefault();
    if(!user.confirmPassword){
        setMessage("Please add all the fields");
        return;
    }
    if(user.password!==user.confirmPassword){
        setMessage("Password and confirm password should be match");
        return;
    }
   try{
    const response=await axios.post("https://instagram-express-app.vercel.app/api/auth/signup",{
        name:user.name,
        email:user.email,
        password:user.password
    }
    );
    console.log("Success", response.data.message);
    console.log("Status : ",response.status);
    setMessage(response.data.message);
    setToken(response.data.data.token);
    setUser({
        name:"",
        email:"",
        password:"",
        confirmPassword:""
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
            <h1>Sign Up</h1>
            {
                message && <h2>{message}</h2>
            }
            <form onSubmit={saveData}>
              <label htmlFor="name">Name</label><br/>
              <input id="name" type="text" name="name" onChange={changeInput}/><br/>
              <label htmlFor="email">Email</label><br/>
              <input id="email" type="email" name="email" onChange={changeInput}/> <br/>
              <label htmlFor="password">Password</label><br/>
              <input id="password" type="password" name="password" onChange={changeInput}/><br/>
              <label htmlFor="confirmPassword">Confirm Password</label><br/>
              <input id="confirmPassword" type="password" name="confirmPassword" onChange={changeInput}/><br/>
              <button type="submit">submit</button>
            </form>
        </div>
    )
}


export default SignUp;