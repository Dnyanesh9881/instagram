import React, { useContext, useState } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login=()=>{
     const {setToken}=useContext(UserContext);

    const [user, setUser]=useState({
        email:"",
        password:"",
    });
   const[message, setMessage]=useState("");

   const navigate=useNavigate();

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
    localStorage.setItem("token", JSON.stringify(response.data.data.token));
     navigate("/home")
    setUser({
        email:"",
        password:"",
    });
   }
   catch(error){
    console.log("Error", error.response.data.message);
    console.log("Status : " , error.response.status);
    setMessage(error.response.data.message);
   }
}

 function changeInput(e){

    setUser({
        ...user, [e.target.name]:e.target.value
    })
 }
    return (
            <div className="login all">

            <div className="login_card">
            <h1>Login</h1>
            {
                message && <h2>{message}</h2>
            }
            <form className="login_form" onSubmit={saveData}>
              {/* <label htmlFor="lEmail">Email</label><br/> */}
              <input id="lEmail" type="email" placeholder="Enter Email" name="email" onChange={changeInput}/> <br/><br/>
              {/* <label htmlFor="lPassword">Password</label><br/> */}
              <input id="lPassword" type="password" placeholder="Enter Password" name="password" onChange={changeInput}/><br/>
              <button type="submit">submit</button>
            </form>
            <p>Don't have an account? <Link to={"/signup"}>signup</Link></p>
            </div>
           
        </div>
    )
}


export default Login;