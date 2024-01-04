import React, { useState } from "react";
import SignUp from "./Components/SignUp";
import "./App.css"
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
const App=()=>{

const[token, setToken]=useState("");

    return (
        <div>
            <SignUp  setToken={setToken}/>
            <Login setToken={setToken}/>
            <Dashboard token={token}/>
        </div>
    )
}

export default App;