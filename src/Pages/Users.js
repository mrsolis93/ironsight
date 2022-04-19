import React from "react";
import "../App.css";
import ReAreaChart from "../Charts/ReAreaChart";
import ReAreaChartMultiple from "../Charts/ReAreaChartMultiple";

import ReLineChart from "../Charts/ReLineChart";
import Navbar from "../Components/Navbar";

import UserTable from "../Components/UserComponents/UserTable";

function Users() {
  return (
    <div className="users">

      <Navbar />

      <div className="overflow-auto m-4 xl:mx-48">
          <div className="w-full h-full bg-base-100 shadow-xl">
            <div className="course-content">

              <UserTable />
                 
            </div>
          </div>
      </div>

    </div>
    

  );
}

export default Users;
