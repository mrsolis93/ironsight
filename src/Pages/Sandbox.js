import React from "react";
import "../App.css";
import Navbar from "../Components/Navbar";
import LinearProgress from "@mui/material/LinearProgress";
import { useQuery } from "react-query";
import { getVMCPUUsage, getVMMemoryUsage } from "../IronsightAPI";
import ReAreaChartMultiple from "../Charts/ReAreaChartMultiple";
import VMCPUWidgetOld from "../Components/Widgets/VMStats/VMCPUWidgetOld";

function Sandbox() {
  const [intervalMs, setIntervalMs] = React.useState(15000);
  const { data, isLoading, isError } = useQuery("vm_cpu_usage", getVMCPUUsage, {
    // Refetch the data every 15 seconds
    refetchInterval: intervalMs,
  });
  const {
    data: memory_data,
    isLoading: memory_isLoading,
    isError: memory_isError,
  } = useQuery("vm_memory_usage", getVMMemoryUsage, {
    // Refetch the data every 15 seconds
    refetchInterval: intervalMs,
  });

  if (isLoading || memory_isLoading) {
    return <LinearProgress />;
  }

  if (isError || memory_isError) {
    return <p>Error!</p>;
  }
  return (
    <div className="sandbox">
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-4 m-4">
        <div className="col-span-1">
          <div className="flex justify-center rounded-box bg-base-100 shadow-2xl">
            <ReAreaChartMultiple />
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex justify-center rounded-box bg-base-100 shadow-2xl h-full items-center">
            <VMCPUWidgetOld />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sandbox;
