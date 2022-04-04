import React, { Component } from "react";
import "../App.css";
import LineChart from "../Charts/LineChart.js";
import CurrentLabs from "../Components/Widgets/CurrentLabs";
import NewsWidget from "../Components/Widgets/NewsWidget";

class Home extends Component {
  render() {
    return (
      <>
        <div className="App">
          <div className="App-header"></div>

          {/* Upper row */}
          <div class="flex md:flex-row flex-col mt-3 mr-3 ml-3">
            {/* Ongoing Labs */}
            <div class="max-h-96 md:w-1/4 rounded-box bg-base-100 shadow-xl m-3">
              <div class="card-body">
                <div class="flex flex-row">
                  <h2 class="card-title mr-3">Ongoing Labs</h2>
                  {/* Display the current date */}
                  <h3 class="font-mono text-lg mr-3">
                    [{new Date().toLocaleDateString()}]
                  </h3>
                </div>

                <CurrentLabs />
                <div class="card-actions justify-end">
                  <button class="btn btn-primary shadow-xl">View all</button>
                </div>
              </div>
            </div>

            {/* VM Overview */}
            <div class="md:w-1/2 rounded-box bg-base-100 shadow-xl m-3">
              <div class="card-body">
                <h2 class="card-title">VM Overview</h2>
                <LineChart />
              </div>
            </div>
          {/* News Widget */}
            <NewsWidget />
          </div>

          {/* Lower Row */}
          <div class="flex md:flex-row flex-col mr-3 ml-3">
            {/* Hypervisor Performance */}
            <div class="md:w-1/2 rounded-box bg-base-100 shadow-xl m-3">
              <div class="card-body">
                <h2 class="card-title">Hypervisor Performance</h2>
              </div>
            </div>

            {/* Recent Activity */}
            <div class="md:w-1/2 rounded-box bg-base-100 shadow-xl m-3">
              <div class="card-body">
                <h2 class="card-title">Recent Activity</h2>
                <div class="overflow-x-auto">
                  <table class="table w-full">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Timestamp</th>
                        <th>User</th>
                        <th>Activity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>.</th>
                        <td>2022-04-02 00:00:00</td>
                        <td>tyler_harrison</td>
                        <td>[Ironsight] User logon</td>
                      </tr>

                      <tr>
                        <th>.</th>
                        <td>2022-04-02 00:00:00</td>
                        <td>tyler_harrison</td>
                        <td>VM Created - debian11_tharrison</td>
                      </tr>

                      <tr>
                        <th>.</th>
                        <td>2022-04-02 00:00:00</td>
                        <td>tyler_harrison</td>
                        <td>VM Deleted - debian11_tharrison</td>
                      </tr>

                      <tr>
                        <th>.</th>
                        <td>2022-04-02 00:00:00</td>
                        <td>tyler_harrison</td>
                        <td>[Ironsight] User logoff</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
