import React from "react";
import SignUp from "./Components/SignUp";
import "./App.css"
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import UploadFile from "./Components/UploadFile"
import { Routes, Route } from "react-router-dom";



const App=()=>{
   

    return (
        <div>
            <Routes>
                <Route path="/"  element={<Login />} />
                <Route path="/signup"  element={<SignUp />} />
                <Route path="/home"  element={<div className="home"><Dashboard /> <UploadFile /> </div>} />
            </Routes>
        </div>
    )
}

export default App;