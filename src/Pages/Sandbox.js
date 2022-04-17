import React from "react";
import "../App.css";
import "../Components/Widgets/UsersWidget";
import "../Charts/DoughnutChart";
import DoughnutChart from "../Charts/DoughnutChart";
import BarChart from "../Charts/BarChart";
import LineChart from "../Charts/LineChart";
import PieChart from "../Charts/PieChart";
import Navbar from "../Components/Navbar";
import ReAreaChartCPU from "../Charts/ReAreaChartCPU";
import ReAreaChartMultiple from "../Charts/ReAreaChartMultiple";

function Sandbox() {
  return (
    <div className="sandbox">
    <Navbar />
      {/* Upper row */}
      <div className="flex md:flex-row flex-col mt-3 mr-3 ml-3">
        {/* Widget Card */}
        <div className="md:w-1/3 rounded-box bg-base-100 shadow-xl m-3 self-center">
          <div className="card-body">
            <DoughnutChart />
            
          </div>
        </div>
        <div className="md:w-1/3 rounded-box bg-base-100 shadow-xl m-3 self-center">
          <div className="card-body">
            <LineChart />
            
          </div>
        </div>
        <div className="md:w-1/3 rounded-box bg-base-100 shadow-xl m-3 self-center">
          <div className="card-body">
            <BarChart />
            
          </div>
        </div>
      </div>
      {/* Lower Row */}
      <div className="flex md:flex-row flex-col mr-3 ml-3">
        {/* Widget Card */}
        <div className="md:w-1/3 rounded-box bg-base-100 shadow-xl m-3 self-center">
          <div className="card-body">
            <ReAreaChartMultiple />
            
          </div>
        </div>
        {/* Widget Card */}
        <div className="md:w-1/3 rounded-box bg-base-100 shadow-xl m-3 self-center">
          <div className="card-body">
            <ReAreaChartCPU />
            
          </div>
        </div>
        {/* Widget Card */}
        <div className="md:w-1/3 rounded-box bg-base-100 shadow-xl m-3 self-center">
          <div className="card-body">
            {/* Content Here */}
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sandbox;
