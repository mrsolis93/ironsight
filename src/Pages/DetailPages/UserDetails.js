import React from "react";
import "../../App.css";
import Navbar from "../../Components/Navbar";
import { useParams, Link } from "react-router-dom";

function UserDetails() {
  const { user_name } = useParams();
  console.log("user_name: " + user_name);
  return (
    <div className="users">
      <Navbar />

      {/* Top bar (breadcrumbs) */}
      <div className="text-md breadcrumbs m-4">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <strong>{user_name}</strong>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UserDetails;
