import React from "react";
import { useQuery } from "react-query";
import { getVmList } from "../IronsightAPI";

export const VirtualMachineList = () => {
  const { data, isLoading, isError } = useQuery("virtual_machines", getVmList) 

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error!</p>;
  }


return (

  data.map(({ vm_name, template_name, port_number}) => (

  

        <tr key={vm_name} className="hover">
            <td>{vm_name}</td>
            <td>{template_name}</td>
            <td>{port_number}</td>
          </tr>
     

)));
}










export default VirtualMachineList;
