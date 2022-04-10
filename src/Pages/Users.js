import React from "react";
import "../App.css";
import ReAreaChart from "../Charts/ReAreaChart";
import ReLineChart from "../Charts/ReLineChart";
import Navbar from "../Components/Navbar";

function Users() {
  return (
    <div className="users">
    <Navbar />
    <div>
    <ReAreaChart />
   
    </div>
    
      
    </div>
  );
}

export default Users;
