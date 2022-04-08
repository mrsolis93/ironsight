import React from "react";
import "../App.css";
import { useEffect, useState } from "react";
import VirtualMachineList from "../Components/VirtualMachineList";
import Navbar from "../Components/Navbar";

// Get all of the names from key "vm_name" in the json from the API call and display them in a list using react-window and MUI
// URL: "https://api.rellis.dev/get.php?q=get_vms"


function VirtualMachines() {


  return (
    <div className="virtual_machines">
      <Navbar />
        <div>
        <div className="overflow-auto">
    <table className="table w-full">
      <thead>
      <tr>
          <th>Name</th>
          <th>Template</th>
          <th>Port</th>
        </tr>
      </thead>
      <tbody>
        <VirtualMachineList />
        </tbody>
    </table>
  </div>
        </div>
    </div>
  );
}

export default VirtualMachines;
