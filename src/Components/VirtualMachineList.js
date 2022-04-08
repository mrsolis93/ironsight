import React from "react";
import { useQuery } from "react-query";
import { getVMList } from "../IronsightAPI";
import LinearProgress from "@mui/material/LinearProgress";

export const VirtualMachineList = () => {
  const { data, isLoading, isError } = useQuery("virtual_machines", getVMList);

  if (isLoading) {
    return <LinearProgress />;
  }

  if (isError) {
    return <p>Error!</p>;
  }

  const get_vm_list = () => {
    return data.map(({ vm_name, template_name, port_number }) => (
      <tr key={vm_name} className="hover">
        <td>{vm_name}</td>
        <td>{template_name}</td>
        <td>{port_number}</td>
      </tr>
    ));
  };
  const vm_list = get_vm_list();

  return (
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
          <tbody>{vm_list}</tbody>
        </table>
      </div>
    </div>
  );
};

export default VirtualMachineList;
