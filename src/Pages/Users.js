import React from "react";
import "../App.css";
import ReAreaChart from "../Charts/ReAreaChart";
import ReAreaChartMultiple from "../Charts/ReAreaChartMultiple";
import ReAreaChartMultiple2 from "../Charts/ReAreaChartMutiple2";
import ReLineChart from "../Charts/ReLineChart";
import Navbar from "../Components/Navbar";

function Users() {
  return (
    <div className="users">
    <Navbar />
    <div>
    <ReAreaChartMultiple />
   
    </div>
    
      
    </div>
  );
}

export default Users;
