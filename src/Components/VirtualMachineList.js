import React from "react";

const VirtualMachineList = () => {
  const [vm_list, setVMList] = React.useState([]);

  // Make a GET request to the server to get the list of VMs
  // and map them to a DaisyUI table
  const get_vms = () => {
    fetch("https://api.rellis.dev/get.php?q=get_vms")
      .then((response) => response.json())
      .then((data) => {
        console.log("[Ironsight] VM List:", data);
        var vm_list = data.map(function (vm) {
          return <li key={vm.vm_name}>{vm.vm_name}</li>;
        });
          setVMList(vm_list);
      });
  };

  // Get the list of templates on page load, and set the state
  React.useEffect(() => {
    get_vms();
  }, []);

  return (
    <div>
      <ul>{vm_list}</ul>
    </div>
  );
};

export default VirtualMachineList;
