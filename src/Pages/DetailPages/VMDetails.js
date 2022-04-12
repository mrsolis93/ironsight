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

      {/* VM tags */}
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-row mx-4 md:m-4 md:mt-0">
          Tags:
          <div class="badge badge-info badge gap-2 mx-1">cryptography</div>
          <div class="badge badge-success badge mx-1">networking</div>
          <div class="badge badge-warning badge mx-1">linux</div>
          <div class="badge badge-error badge ml-1 mr-4 break-after-all whitespace-nowrap">terminal practice</div>
        </div>
        <div className="flex flex-row mx-4 mt-2 mb-4 md:m-4 md:mt-0">
          Labs:
          <div class="badge badge-info badge-ghost gap-2 mx-1">
            <Link to="/lab_details/1">Cicada 3301 Puzzle</Link>
            </div>
            <div class="badge badge-info badge-ghost gap-2 mx-1">
            <Link to="/lab_details/3">Project Management</Link>
            </div>
        </div>
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
          <h2 className="card-title mx-4 mt-4">Status Panel</h2>
          <div class="grid grid-cols-2 xl:grid-cols-4 grid-row-1 gap-4 m-4">
            <button className="btn btn-success btn-outline btn-lg col-span-1 text-2xl">
              <span>
                <BsPower
                  onClick={() => {
                    toggleVMPower(vm_name);
                  }}
                />
              </span>
            </button>
            <button className="btn btn-lg btn-success btn-outline col-span-1">
              <span>Elastic Agent</span>
            </button>
            <button className="btn btn-lg btn-error btn-outline col-span-1">
              <span>VNC Proxy</span>
            </button>
            <button className="btn btn-lg btn-success btn-outline col-span-1">
              <span>SQL</span>
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
                      <Link to="/user_details/tyler_harrison">
                        tyler_harrison
                      </Link>
                    </td>
                  </tr>
                  <tr class="hover">
                    <td>
                      <Link to="/user_details/tyler_harrison">
                        sudip_koirala
                      </Link>
                    </td>
                  </tr>
                  <tr class="hover">
                    <td>
                      <Link to="/user_details/tyler_harrison">
                        augustine_solis
                      </Link>
                    </td>
                  </tr>
                  <tr class="hover">
                    <td>
                      <Link to="/user_details/tyler_harrison">
                        truman_brown
                      </Link>
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
            <div className="overflow-auto mt-2 max-h-44">
              <table className="table table-compact w-full">
                <thead>
                  <tr>
                    <th>
                      <span>Process</span>
                    </th>
                    <th>
                      <span>User</span>
                    </th>
                    <th>
                      <span>CPU</span>
                    </th>
                    <th>
                      <span>Memory</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="w-full">
                  <tr>
                    <td>free-robux-generator</td>
                    <td>root</td>
                    <td>90.10%</td>
                    <td>68.90%</td>
                  </tr>
                  <tr>
                    <td>bash</td>
                    <td>tyler</td>
                    <td>1.20%</td>
                    <td>0.10%</td>
                  </tr>
                  <tr>
                    <td>cloud-initd</td>
                    <td>root</td>
                    <td>0.10%</td>
                    <td>1.70%</td>
                  </tr>
                  <tr>
                    <td>firefox</td>
                    <td>tyler</td>
                    <td>8.70%</td>
                    <td>40.80%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-span-1 rounded-box bg-base-100 shadow-xl">
          <div className="mx-4 my-6">
            <h2 className="card-title">Commands Executed</h2>
            <div className="overflow-auto mt-2 max-h-44">
              <table className="table table-compact w-full">
                <thead>
                  <tr>
                    <th>
                      <span>Timestamp</span>
                    </th>
                    <th>
                      <span>Command</span>
                    </th>
                    <th>
                      <span>User</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="w-full">
                  <tr>
                    <td>2022-04-11 13:04:10</td>
                    <td className="break-normal whitespace-normal">
                      firefox %u https://google.com/
                    </td>
                    <td>tyler</td>
                  </tr>
                  <tr>
                    <td>2022-04-11 13:04:10</td>
                    <td className="break-normal whitespace-normal">
                      cd /home/tyler_harrison/Downloads/elasticsearch-8.1.0/bin
                    </td>
                    <td>cloud-init</td>
                  </tr>
                  <tr>
                    <td>2022-04-11 13:04:10</td>
                    <td className="break-normal whitespace-normal">
                      ./elastic-setup.sh --install-dir /usr/local/elasticsearch
                    </td>
                    <td>cloud-init</td>
                  </tr>
                  <tr>
                    <td>2022-04-11 13:04:10</td>
                    <td className="break-normal whitespace-normal">
                      sudo systemctl start elasticsearch
                    </td>
                    <td>cloud-init</td>
                  </tr>
                  <tr>
                    <td>2022-04-11 13:04:10</td>
                    <td className="break-normal whitespace-normal">
                      sudo systemctl start kibana
                    </td>
                    <td>cloud-init</td>
                  </tr>
                  <tr>
                    <td>2022-04-11 13:04:10</td>
                    <td className="break-normal whitespace-normal">
                      sudo systemctl start nginx
                    </td>
                    <td>cloud-init</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-span-1 rounded-box bg-base-100 shadow-xl">
          <div className="mx-4 my-6">
            <h2 className="card-title">Files Created</h2>
            <div className="overflow-auto mt-2 max-h-44">
              <table className="table table-compact w-full">
                <thead>
                  <tr>
                    <th>
                      <span>Timestamp</span>
                    </th>
                    <th>
                      <span>Filename</span>
                    </th>
                    <th>
                      <span>User</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="w-full">
                  <tr>
                    <td>2022-04-11 13:04:10</td>
                    <td className="break-normal whitespace-normal">
                      /home/tyler_harrison/.bashrc
                    </td>
                    <td>tyler</td>
                  </tr>
                  <tr>
                    <td>2022-04-11 13:04:10</td>
                    <td className="break-normal whitespace-normal">
                      /home/tyler_harrison/Downloads/Hunger-Games-The-Mockingjay-Part-1-2015-1080p-BluRay-HDRip-x264-AC3-10bit-YIFY.mkv
                    </td>
                    <td>tyler</td>
                  </tr>
                  <tr>
                    <td>2022-04-11 13:04:10</td>
                    <td className="break-normal whitespace-normal">
                      /tmp/apache/logs/access.log
                    </td>
                    <td>apache</td>
                  </tr>
                  <tr>
                    <td>2022-04-11 13:04:10</td>
                    <td className="break-normal whitespace-normal">
                      /tmp/apache/logs/error.log
                    </td>
                    <td>apache</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right-hand side will have several cards with tables for "Commands Executed", "Files Recently Created", "Processes Running", etc.*/}
      </div>
    </div>
  );
}

export default VMDetails;
