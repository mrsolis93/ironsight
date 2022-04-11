import React from 'react'
import LinearProgress from "@mui/material/LinearProgress";
import { useQuery } from "react-query";
import { getNumVMs } from "../../../IronsightAPI";

const VMsOnWidget = () => {
    const [intervalMs, setIntervalMs] = React.useState(10000);
    const { data, isLoading, isError } = useQuery("num_vms", getNumVMs, {
      // Refetch the data every 10 seconds
      refetchInterval: intervalMs,
    });
  
    if (isLoading) {
      return <LinearProgress />;
    }
  
    if (isError) {
      return <p>Error!</p>;
    }
  return (
    <div className="mb-4">
    <div class="stats shadow">
      <div class="stat">
        <div class="stat-title">Total VMs</div>
        <div class="stat-value">{data}</div>
      </div>
    </div>
  </div>
  )
}

export default VMsOnWidget