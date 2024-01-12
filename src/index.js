import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import UserProvider from "./context/UserProvider";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(<UserProvider>
   <BrowserRouter>
   <App />
   </BrowserRouter> 
    </UserProvider>, 
    document.getElementById("root"));