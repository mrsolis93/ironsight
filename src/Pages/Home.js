import React, { Component } from "react";
import "../App.css";
import HypervisorCPUWidget from "../Components/Widgets/Hypervisor/HypervisorCPUWidget";
import HypervisorNetworkWidget from "../Components/Widgets/Hypervisor/HypervisorNetworkWidget";
import HypervisorMemoryWidget from "../Components/Widgets/Hypervisor/HypervisorMemoryWidget";
import HypervisorDiskWidget from "../Components/Widgets/Hypervisor/HypervisorDiskWidget";
import OngoingLabs from "../Components/Widgets/OngoingLabs";
import NewsWidget from "../Components/Widgets/NewsWidget";
import Navbar from "../Components/Navbar";
import ReAreaChart from "../Charts/ReAreaChart";
import MiniVMStatsWidget from "../Components/Widgets/VMStats/MiniVMStatsWidget";
import ActivityLog from "../Components/Widgets/ActivityLog";

class Home extends Component {
  render() {
    return (
      <>
        <Navbar />
        <div className="home">
          {/* Upper row */}
          <div className="flex md:flex-row flex-col mt-3 md:mr-3 md:ml-3">
            {/* Ongoing Labs */}
            <div className="max-h-96 md:w-1/4 rounded-box bg-base-100 shadow-xl m-3">
              <div className="card-body p-4 md:p-8 max-h-96">
                <div className="flex flex-row">
                  <h2 className="card-title mr-3">Ongoing Labs</h2>

                  {/* Display the current date */}
                  <h3 className="font-mono text-lg mr-3">
                    [{new Date().toLocaleDateString()}]
                  </h3>
                </div>
                <OngoingLabs />
              </div>
            </div>

            {/* VM Overview */}
            <div className="md:w-1/2 rounded-box bg-base-100 shadow-xl m-3">
              <div className="flex flex-col max-h-96 card-body p-4 md:p-8">
                <h2 className="card-title">VM Overview</h2>
                <div className="flex flex-col md:flex-row">
                  <div className="flex max-h-10 w-3/4">
                    <ReAreaChart />
                  </div>
                  <div className="flex flex-row md:flex-col">
                    <MiniVMStatsWidget />
                  </div>
                </div>
              </div>
            </div>

            {/* News Widget */}
            <div className="md:w-1/4 rounded-box bg-base-100 shadow-xl m-3 max-h-96">
              <div className="card-body p-4 md:p-8 max-h-96">
                <div className="flex flex-row">
                  <h2 className="card-title">News / Alerts</h2>
                </div>
                <NewsWidget />
              </div>
            </div>
          </div>
          {/* Lower Row */}
          <div className="flex md:flex-row flex-col md:mr-3 md:ml-3">
            {/* Hypervisor Performance */}
            <div className="md:w-1/2 rounded-box bg-base-100 shadow-xl m-3">
              <div className="card-body p-4 md:p-8">
                <h2 className="card-title">Hypervisor Performance</h2>
                <div className="flex flex-col md:flex-row">
                  <div className="flex flex-col md:w-1/2">
                    <HypervisorCPUWidget />
                    <HypervisorNetworkWidget />
                  </div>
                  <div className="flex flex-col md:w-1/2">
                    <HypervisorMemoryWidget />
                    <HypervisorDiskWidget />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="md:w-1/2 rounded-box bg-base-100 shadow-xl m-3">
              <div className="card-body p-4 md:p-8">
                <h2 className="card-title">Recent Activity</h2>
                <ActivityLog />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
