import React from "react";
import "../../App.css";
import { useQuery } from "react-query";
import { getVMList, getHarvesterVMList, getLabList } from "../../IronsightAPI";
import { Link } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import { BsPower } from "react-icons/bs";

const VirtualMachinesTable = ({ course_id, sub_tag, student_name }) => {
  const [intervalMs, setIntervalMs] = React.useState(5000);
  const { data, isLoading, isError } = useQuery("virtual_machines", getVMList);
  const {
    data: harvester_data,
    isLoading: harvester_isLoading,
    isError: harvester_isError,
  } = useQuery("harvester_vms", getHarvesterVMList, {
    refetchInterval: intervalMs,
  });

  const {
    data: lab_data,
    isLoading: lab_isLoading,
    isError: lab_isError,
  } = useQuery("labs", getLabList, {
    refetchInterval: intervalMs,
  });

  if (isLoading || harvester_isLoading || lab_isLoading) {
    return <LinearProgress />;
  }

  if (isError || harvester_isError || lab_isError) {
    return <p>Error!</p>;
  }

  var filtered_vm_list = [];
  // TODO: Better way to do this chaos
  // If sub_tag is specified, filter the list to only include VMs in that course
  if (sub_tag) {
    for (let i = 0; i < data.length; i++) {
      // If data[i] has a tags field
      if (data[i].tags) {
        for (let j = 0; j < data[i].tags.length; j++) {
          if (
            data[i].tags[j].tag === sub_tag &&
            data[i].tags[j].type === "class"
          ) {
            filtered_vm_list.push(data[i]);
          }
        }
      }
    }
  } else {
    filtered_vm_list = data;
  }

  // If student_name is specified, filter the list to only include VMs for that student
  if (student_name) {
    var filtered_vm_list_2 = [];
    for (let i = 0; i < filtered_vm_list.length; i++) {
      for (let j = 0; j < filtered_vm_list[i].users.length; j++) {
        if (filtered_vm_list[i].users[j] === student_name) {
          filtered_vm_list_2.push(filtered_vm_list[i]);
        }
      }
    }
    filtered_vm_list = filtered_vm_list_2;
  }

  const get_labs_list = () => {
    // Find lab by lab num and store in lab_mapping
    var lab_mapping = {};
    for (let i = 0; i < lab_data.length; i++) {
      lab_mapping[lab_data[i].lab_num] = lab_data[i].lab_name;
    }
    return lab_mapping;
  };
  const lab_mapping = get_labs_list();

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

  // Loop through Harvester VM list and if there is a VM in the get_vm_list, add the port number to the list
  for (var i = 0; i < harvester_data.length; i++) {
    var harvester_vm = harvester_data[i];
    var harvester_vm_name = harvester_vm.metadata.name;
    for (var j = 0; j < data.length; j++) {
      if (harvester_vm_name === data[j].vm_name) {
        harvester_data[i].port_number = data[j].port_number;
        harvester_data[i].users = data[j].users;
        harvester_data[i].labs = data[j].labs;
      }
    }
  }

  // Convert the labs in the harvester_data to the lab_mapping alias
  for (var i = 0; i < harvester_data.length; i++) {
    var harvester_vm = harvester_data[i];
    if (harvester_vm.labs) {
      var harvester_vm_labs = harvester_vm.labs;
      var harvester_vm_labs_list = [];
      for (var j = 0; j < harvester_vm_labs.length; j++) {
        harvester_vm_labs_list[j] = lab_mapping[harvester_vm_labs[j]];
      }
      harvester_data[i].labs = harvester_vm_labs_list;
    }
  }

  var filtered_harvester_vm_list = [];
  // If harvester VM metadata.name matches any of the VM names in the filtered_vm_list, add it to the filtered_harvester_vm_list
  for (var i = 0; i < harvester_data.length; i++) {
    var harvester_vm = harvester_data[i];
    var harvester_vm_name = harvester_vm.metadata.name;
    for (var j = 0; j < filtered_vm_list.length; j++) {
      if (harvester_vm_name === filtered_vm_list[j].vm_name) {
        filtered_harvester_vm_list.push(harvester_vm);
      }
    }
  }

  const get_harvester_vm_list = () => {
    // If the filtered_harvester_vm_list is empty, return a placeholder
    if (filtered_harvester_vm_list.length === 0) {
      return (
        <tr>
          <td colSpan="6">
            <p>No virtual machines enrolled in this course</p>
          </td>
        </tr>
      );
    }

    return filtered_harvester_vm_list.map(
      ({ metadata, status, port_number, users, labs }) => (
        <tr key={metadata.name} className="hover">
          <td>
            <Link key={metadata.name} to={"/vm_details/" + metadata.name}>
              {metadata.name}
            </Link>
          </td>
          <td>
            {
              // If users is undefined or an empty list, display ---. Otherwise, display the users list
              labs === undefined || labs.length === 0 ? "---" : labs.join(", ")
            }
          </td>
          <td>
            {
              // If users is undefined or an empty list, display ---. Otherwise, display the users list
              users === undefined || users.length === 0
                ? "---"
                : users.join(", ")
            }
          </td>
          <td>{port_number ? port_number : "---"}</td>
          <td>
            {/* Three states are Running, Starting, and Stopped */}

            {status.printableStatus === "Running" ? (
              <div className="badge badge-success gap-2">
                {status.printableStatus}
              </div>
            ) : status.printableStatus === "Starting" ? (
              <div className="badge badge-info gap-2">
                {status.printableStatus}
              </div>
            ) : status.printableStatus === "Stopped" ? (
              <div className="badge badge-error gap-2">
                {status.printableStatus}
              </div>
            ) : (
              <div className="badge badge-warning gap-2">
                {status.printableStatus}
              </div>
            )}
          </td>
          {/* Power button */}
          <td>
            <button
              onClick={() => {
                toggleVMPower(metadata.name);
              }}
              className="btn btn-outline btn-sm btn-circle"
              type="button"
            >
              <BsPower />
            </button>
          </td>
        </tr>
      )
    );
  };

  const harvester_vm_list = get_harvester_vm_list();

  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        <thead>
          <tr>
            <td>Name</td>
            <th>Labs</th>
            <th>Users</th>
            <th>Port</th>
            <th>Status</th>
            <th>Power</th>
          </tr>
        </thead>
        <tbody>{harvester_vm_list}</tbody>
      </table>
    </div>
  );
};

export default VirtualMachinesTable;
