import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";
import LinearProgress from "@mui/material/LinearProgress";
import { useQuery } from "react-query";
import { getVMCPUUsage } from "../../../IronsightAPI";
import { BsZoomIn } from "react-icons/bs";
import { ResponsiveContainer } from "recharts";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Legend, Tooltip);

const VMCPUWidgetHome = ({ vm_name }) => {
  const [intervalMs, setIntervalMs] = React.useState(15000);
  const [isZoomed, setIsZoomed] = React.useState(true);
  const { data, isLoading, isError } = useQuery("vm_cpu_usage", getVMCPUUsage, {
    // Refetch the data every 15 seconds
    refetchInterval: intervalMs,
  });

  if (isLoading) {
    console.log("[Ironsight] Fetching VM CPU Data...");
    return <LinearProgress />;
  }

  if (isError) {
    return <p>Error!</p>;
  }
  

  // Make a GET request to the server to get the list of hostnames
  // and map them to a react-chartjs-2 chart
  // For every host in data.data.result, create a new dataset

  var results_list = data.data.result;
  var datasets = [];
  var labels = [];

  // Limit the results list to 5 items
  // if (results_list.length > 5) {
  //   results_list = results_list.slice(0, 5);
  // }

  for (var i = 0; i < results_list.length; i++) {
    var result = results_list[i];
    var hostname = result.metric.name;
    // If vm_name is specified, only show the data for that VM
    if (vm_name && hostname != vm_name) {
      continue;
    }
    var chart_data_keys = result.values.map(function (bucket) {
      //   Convert the epoch time to a human readable date
      var date = new Date(bucket[0] * 1000);
      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();
      var seconds = "0" + date.getSeconds();
      var formattedTime =
        hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
      return formattedTime;
    });
    var chart_data_values = result.values.map(function (bucket) {
      return bucket[1] * 100;
    });
      
    datasets.push({
      label: hostname,
      data: chart_data_values,
      // If vm_name is specified, only use one color
      backgroundColor: vm_name
        ? "rgba(100, 25, 230, 0.2)"
        : [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
      borderColor: vm_name
        ? "rgba(100, 25, 230, 1)"
        : [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
      borderWidth: 3,
      elements: {
        point: {
          radius: 0,
        },
      },
    });
    labels = chart_data_keys;
  }

  // Create the chart
  var chart_data = {
    //fill labels in with the buckets
    labels: labels, //x-axis
    datasets: datasets,
  };

  var options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        autoskip: false,
        usePointStyle: false,
        // Set max to 100 unless zoomed in
        max: isZoomed ? null : 100,
      },
    },
    plugins: {
      legend: {
        display: true,
        // Set label to CPU Usage
      },
    },
  };

  return (
    <ResponsiveContainer width="100%"  height="100%">

      <div className="w-full">
        <div>
          <Line data={chart_data} height={280} options={options} />
        </div>

        <div className="flex justify-end">
          <button
            className="zoom-button"
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <BsZoomIn />
          </button>
        </div>
      </div>

    </ResponsiveContainer>
  );
};

export default VMCPUWidgetHome;
