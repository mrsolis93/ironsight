import React from "react";
import "../App.css";
import VirtualMachineList from "../Components/VirtualMachineList";
import Navbar from "../Components/Navbar";

// Get all of the names from key "vm_name" in the json from the API call and display them in a list using react-window and MUI
// URL: "https://api.rellis.dev/get.php?q=get_vms"

function VirtualMachines() {
  return (
    <div className="virtual_machines">
      <Navbar />
      <VirtualMachineList />
    </div>
  );
}

export default VirtualMachines;
