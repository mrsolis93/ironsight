import React from "react";
import "../App.css";
import ReAreaChart from "../Charts/ReAreaChart";
import ReAreaChartMultiple from "../Charts/ReAreaChartMultiple";
import ReAreaChartMultiple2 from "../Charts/ReAreaChartMutiple2";
import ReLineChart from "../Charts/ReLineChart";
import Navbar from "../Components/Navbar";
import EnhancedTable from "../Components/UserComponents/EnhancedTable";
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
