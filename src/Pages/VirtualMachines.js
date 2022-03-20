import React from "react";
import "../App.css";
import { useEffect, useState } from "react";
import VirtualMachineList from "../Components/VirtualMachineList";

// Get all of the names from key "vm_name" in the json from the API call and display them in a list using react-window and MUI
// URL: "https://api.rellis.dev/get.php?q=get_vms"

var virtual_machines = [];
var raw_data = [];

function VirtualMachines() {
  const [namesState, setVirtualMachines] = useState([]);

  var baseUrl = "https://api.rellis.dev/get.php?q=get_vms";

  useEffect(() => {
    const fetchData = async () => {
      fetch(`${baseUrl}`, {
        method: "GET",
        headers: {},
      })
        .then((response) => {
          response.json().then((json) => {
            // Get all of the names from key "vm_name"
            raw_data = json;
            virtual_machines = json.map(function (x) {
              return x.vm_name;
            });
            // Set the list of names
            setVirtualMachines(virtual_machines);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, [baseUrl]);

  return (
    <div className="virtual_machines">
        <VirtualMachineList table_data={raw_data} />
    </div>
  );
}

export default VirtualMachines;
