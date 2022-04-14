import React from "react";
import "../App.css";
import ReAreaChart from "../Charts/ReAreaChart";
import ReLineChart from "../Charts/ReLineChart";
import Navbar from "../Components/Navbar";
import UserTable from "../Components/UserComponents/UserTable";

function Users() {
  return (
    <div className="users">
    <Navbar />
      <div>
      
        <UserTable />
    
      </div>
      
      
    </div>
  );
}

export default Users;
