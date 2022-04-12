import React from "react";
import "../../App.css";
import Navbar from "../../Components/Navbar";
import { Link, useParams } from "react-router-dom";
import ReAreaChart from "../../Charts/ReAreaChart";
import { BsPower } from "react-icons/bs";

function VMDetails() {
  // Function to power on a VM with a GET request
  const toggleVMPower = (hostname) => {
    if (localStorage.getItem("ironsight_username") === "demo_user") {
      alert("You are not authorized to manage VMs");
      return;
    }
    // Ask if the user wants to power on the VM
    var confirm_power_on = window.confirm(
      "Are you sure you want to toggle the power to " + hostname + "?"
    );
    if (confirm_power_on) {
      console.log("[Ironsight] Toggling power on : " + hostname);
      var status = fetch(
        "https://api.rellis.dev/get.php?q=power_toggle_vm&vm_name=" + hostname
      );
      status.then((response) => {
        return response.json();
      });
    } else {
      console.log("[Ironsight] Cancelled power on VM: " + hostname);
    }
  };

  const { vm_name } = useParams();
  console.log("vm_name: " + vm_name);
  return (
    <div className="virtual_machines">
      <Navbar />

      {/* Top bar (breadcrumbs) */}
      <div class="text-md breadcrumbs m-4">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/virtual_machines">Virtual Machines</Link>
          </li>
          <li>
            <strong>{vm_name}</strong>
          </li>
        </ul>
      </div>

      {/* VM details contents */}
      <div className="grid grid-flow-row grid-cols-1 md:grid-cols-3 gap-4 mx-4">
        <div className="row-span-4 md:col-span-2 rounded-box bg-base-100 shadow-xl">
          <div className="mx-4 my-6">
            {/* Performance Header */}
            <div className="grid grid-cols-3 mb-4">
              {/* Performance Graph title */}
              <div className="col-span-1">
                <h2 className="card-title">Performance Graph</h2>
              </div>

              {/* Pagination widget */}
              <div class="tabs tabs-boxed col-span-2 justify-self-end">
                <a class="tab tab-active">CPU</a>
                <a class="tab">RAM</a>
                <a class="tab">Network</a>
              </div>
            </div>
            <ReAreaChart />
          </div>
        </div>
        <div className="col-span-1 row-span-1 rounded-box bg-base-100 shadow-xl">
          <h2 className="card-title mx-4 mt-4">Quick Panel</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 grid-row-1 gap-4 m-4">
            <button className="btn btn-success btn-lg col-span-1">
              <span>
                <BsPower
                  onClick={() => {
                    toggleVMPower(vm_name);
                  }}
                />
              </span>
            </button>
            <button className="btn btn-lg btn-outline col-span-1">
              <span></span>
            </button>
            <button className="btn btn-lg btn-outline col-span-1">
              <span></span>
            </button>
            <button className="btn btn-lg btn-outline col-span-1">
              <span></span>
            </button>
          </div>
        </div>
        <div className="col-span-1 row-span-3 rounded-box bg-base-100 shadow-xl">
          <div className="mx-4 my-6">
            <h2 className="card-title">Users</h2>
            <div className="overflow-auto mt-2 max-h-44">
              <table className="table w-full">
                <tbody className="w-full">
                  <tr class="hover">
                    <td>
                      <Link to="/user_details/tyler_harrison">tyler_harrison</Link>
                    </td>
                  </tr>
                  <tr class="hover">
                    <td>
                      <Link to="/user_details/tyler_harrison">sudip_koirala</Link>
                    </td>
                  </tr>
                  <tr class="hover">
                    <td>
                      <Link to="/user_details/tyler_harrison">augustine_solis</Link>
                    </td>
                  </tr>
                  <tr class="hover">
                    <td>
                      <Link to="/user_details/tyler_harrison">truman_brown</Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-span-1 rounded-box bg-base-100 shadow-xl">
          <div className="mx-4 my-6">
            <h2 className="card-title">Processes Running</h2>
          </div>
        </div>
        <div className="col-span-1 rounded-box bg-base-100 shadow-xl">
          <div className="mx-4 my-6">
            <h2 className="card-title">Commands Executed</h2>
          </div>
        </div>
        <div className="col-span-1 rounded-box bg-base-100 shadow-xl">
          <div className="mx-4 my-6">
            <h2 className="card-title">Files Created</h2>
          </div>
        </div>

        {/* Right-hand side will have several cards with tables for "Commands Executed", "Files Recently Created", "Processes Running", etc.*/}
      </div>
    </div>
  );
}

export default VMDetails;
