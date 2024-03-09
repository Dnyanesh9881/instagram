import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [joke, setJoke] = useState("");
  const { token, setToken } = useContext(UserContext);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  // console.log(token);
  useEffect(() => {
    if (token === "") {
      let localToken = localStorage.getItem("token");
      if (localToken === undefined) {
        navigate("/");
      } else {
        setToken(JSON.parse(localToken));
      }
    }
  }, [token]);

  useEffect(() => {
    if (token !== "") {
      getJoke();
    }
  }, [token]);

  async function logOut() {
    try {
      const response = await axios.delete(
        "https://instagram-express-app.vercel.app/api/auth/logout",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      alert("Logout Succesfully");
      localStorage.removeItem("token");
      setToken("");
      setName("");
      setJoke("");
      navigate("/");
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
  function getJoke() {
    axios
      .get("https://instagram-express-app.vercel.app/api/auth/zuku", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log("joke", res.data.data.message);
        setJoke(res.data.data.message);
        setName(res.data.data.user.name);
      })
      .catch((err) => console.log("Error", err.response.data.message));
  }

  return (
    <div className="dashboard">
      <div className="name_joke">
        <h1 className="user_name">Welcome {name}</h1>
        <p className="joke">{joke}</p>
      </div>
      <button onClick={logOut} className="logout_btn">LogOut</button>
    </div>
  );
};

export default Dashboard;
