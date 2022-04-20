//...
import Progressbar from "react-js-progressbar";
import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { useQuery } from "react-query";
import { getMetrics } from "../IronsightAPI";

const MemoryProgress = () => {
  const [intervalMs, setIntervalMs] = React.useState(10000);
  const { data, isLoading, isError } = useQuery("get_metrics", getMetrics, {
    // Refetch the data every 10 seconds
    refetchInterval: intervalMs,
  });

  if (isLoading) {
    return <LinearProgress />;
  }

  if (isError) {
    return <p>Error!</p>;
  }

  var metrics_data = data.data;
  var hostname = [];
  var cpu_usage = [];
  var memory_usage = [];
  for (var i = 0; i < metrics_data.length; i++) {
    // hostname.push(metrics_data[i].id);

    var memory = metrics_data[i].metadata.fields[2].split("Ki");
    var temp = memory[0] / (1000 * 1000);
    memory_usage.push(temp.toFixed(2));

    // var cpu = metrics_data[i].metadata.fields[1].split("n");
    // temp = cpu[0]/1024;
    // cpu_usage.push(temp.toFixed(2));
  }
  var sum = 0;
  for (var av = 0; av < memory_usage.length; av++) {
    sum += parseFloat(memory_usage[av]);
  }

  var average_memory = sum / memory_usage.length;

  return (
    <div id="progressbarContainer">
      <Progressbar
        input={average_memory}
        pathWidth={10}
        pathColor={["#e56135", "#35e567"]} // use an array for gradient color.
        trailWidth={20}
        trailColor="#363636" // use a string for solid color.
        textStyle={{ fill: "white" }} // middle text style
        size={100}
      ></Progressbar>
      <div className="mt-4">Memory Used: {sum.toFixed(2)} GB</div>
    </div>
  );
};

export default MemoryProgress;
