import React from "react";
import "../../App.css";
import Navbar from "../../Components/Navbar";
import { useParams } from "react-router-dom";

function UserDetails() {
  const { user_name } = useParams();
  console.log("user_name: " + user_name);
  return (
    <div className="users">
      <Navbar />
      <h2>User: {user_name}</h2>
    </div>
  );
}

export default UserDetails;
