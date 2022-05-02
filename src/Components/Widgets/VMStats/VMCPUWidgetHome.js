import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

import LinearProgress from "@mui/material/LinearProgress";
import { useQuery } from "react-query";
import { getVMCPUUsage } from "../../../IronsightAPI";
import { BsZoomIn } from "react-icons/bs";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
        <div style={{ color: "white" }}>
          {/* Set background to transparent black */}
          {" "}
          {/* CPU Usage: {` ${payload[0].value}` + "%"}{" "} */}
          {/* For loop to make tooltip with top 5 results */}
          CPU Usage:
          {payload.map((item, index) => {
            if (index < 1) {
              return (
                <div key={index}>
                  <div style={{ color: "white" }}>
                    {" "}
                    {item.dataKey}: {` ${item.value}` + "%"}{" "}
                  </div>
                    </div>
              );
            }
          })}
          
        </div>
        <div style={{ color: "#8142FF" }}> Time: {label} </div>
      </div>
    );
  }

  return null;
};

function VMCPUWidgetHome() {
  const [intervalMs, setIntervalMs] = React.useState(15000);
  const [isZoomed, setIsZoomed] = React.useState(true);
  const { data, isLoading, isError } = useQuery("vm_cpu_usage", getVMCPUUsage, {
    // Refetch the data every 15 seconds
    refetchInterval: intervalMs,
  });

  if (isLoading) {
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

  for (var i = 0; i < results_list.length; i++) {
    var result = results_list[i];
    var hostname = result.metric.name;
    // If vm_name is specified, only show the data for that VM
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
      return parseFloat(bucket[1] * 100).toFixed(2);
    });

    datasets.push({
      labels: hostname,
      data: chart_data_values,
    });
    labels = chart_data_keys;
  }

  // console.log("[Ironsight] Date(keys):", chart_data_keys);
  // console.log("[Ironsight] CPU Usage:", chart_data_values);
  // console.log("[Ironsight] DataSet0:", datasets[0]);
  // console.log("[Ironsight] DataSet1:", datasets[1]);

  // Map datasets into chart_data
  // Map the top 5 CPU usage hosts into a chart
  // Sort the data by CPU usage
  var sorted_datasets = [];
  var sorted_data = datasets.sort(function (a, b) {
    return b.data - a.data;
  }
  // Take the top 5
  ).slice(0, 5);

  // If the sorted_data is not 5, fill the rest with empty data
  if (sorted_data.length < 5) {
    for (var i = 0; i < 5 - sorted_data.length; i++) {
      sorted_data.push({
        labels: "",
        data: [],
      });
    }
  }

  const chart_data = labels.map((x, y) => {
    var temp_chart_data = {};
    temp_chart_data["label"] = x;
    for (var i = 0; i < sorted_data.length; i++) {
      temp_chart_data[sorted_data[i].labels] = sorted_data[i].data[y];
    }
    return temp_chart_data;
  });

  // Find the max value in the datasets
  var max_value = 0;
  for (var i = 0; i < datasets.length; i++) {
    var dataset = datasets[i];
    for (var j = 0; j < dataset.data.length; j++) {
      var value = dataset.data[j];
      if (value > max_value) {
        max_value = value;
      }
    }
  }
  // Convert to integer
  max_value = Math.ceil(max_value);

  // console.log("[Ironsight] Chart Data:", chart_data);

  return (
    <div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart
          width={800}
          height={500}
          data={chart_data}
          margin={{
            top: 20,
            right: 10,
            left: -20,
            bottom: -30,
          }}
          
        >
          {/* CartesianGrid with grey stroke */}
          <CartesianGrid stroke="rgba(0,0,0,0.2)" />
          <defs>
            <linearGradient id="colorValue1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8142FF" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#8142FF" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#359EE5" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#359EE5" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="colorValue3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff6384" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#ff6384" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="colorValue4" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ffce56" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#ffce56" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="colorValue5" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a2ff8f" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#a2ff8f" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey={"label"}
            type="category"
            interval={"preserveStartEnd" | "10"}
            tickCount={15}
            angle={-30}
            height={100}
            dy={30}
            dx={0}
          />
          <YAxis
            dataKey={sorted_data[0].labels}
            type="number"
            unit="%"
            domain={isZoomed ? [0, max_value] : [0, 100]}
            scale="linear"
          />
          <Tooltip content={<CustomTooltip data={chart_data} />} />

          <Area
            type="monotone"
            dataKey={sorted_data[0].labels}
            stroke="#8142FF"
            fillOpacity={1}
            fill="url(#colorValue1)"
          />
          <Area
            type="monotone"
            dataKey={sorted_data[1].labels}
            stroke="#359EE5"
            fillOpacity={1}
            fill="url(#colorValue2)"
          />

          <Area
            type="monotone"
            dataKey={sorted_data[2].labels}
            stroke="#ff6384"
            fillOpacity={1}
            fill="url(#colorValue3)"
          />

          <Area
            type="monotone"
            dataKey={sorted_data[3].labels}
            stroke="#ffce56"
            fillOpacity={1}
            fill="url(#colorValue4)"
          />

          <Area
            type="monotone"
            dataKey={sorted_data[4].labels}
            stroke="#a2ff8f"
            fillOpacity={1}
            fill="url(#colorValue5)"
          />
          

        </AreaChart>
      </ResponsiveContainer>
      <div className="flex justify-end">
        <button className="zoom-button" onClick={() => setIsZoomed(!isZoomed)}>
          <BsZoomIn />
        </button>
      </div>
    </div>
  );
}

export default VMCPUWidgetHome;
