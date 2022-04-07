import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import LinearProgress from "@mui/material/LinearProgress";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  var url =
    "https://api.rellis.dev/get.php?q=%27{%22size%22:100,%22aggs%22:{%22hostnames%22:{%22terms%22:{%22field%22:%22host.name%22,%22size%22:100}}}}%27";
  const [chart_data, setChartData] = React.useState(null);

  // Make a GET request to the server to get the list of hostnames
  // and map them to a react-chartjs-2 chart
  const get_doc_count = () => {
    console.log("[Ironsight] Fetching Chart Data...");
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Get X axis (keys)
        var chart_data_keys = data.aggregations.hostnames.buckets.map(function (
          bucket
        ) {
          return bucket.key;
        });
        console.log("[Ironsight] VM List:", chart_data_keys);

        // Get Y axis (values)
        var chart_data_values = data.aggregations.hostnames.buckets.map(
          function (bucket) {
            return bucket.doc_count;
          }
        );
        console.log("[Ironsight] Doc Count:", chart_data_values);

        // Create the chart
        var chart_data = {
          //fill labels in with the buckets
          labels: chart_data_keys, //x-axis
          datasets: [
            {
              data: chart_data_values,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 3,
            },
          ],
        };
        setChartData(chart_data);
        console.log("[Ironsight] Chart Data:", chart_data);
        console.log("[Ironsight] Loading complete");
      });
  };

  // Get the list of templates on page load, and set the state
  React.useEffect(() => {
    get_doc_count();
  }, []);
  var options = {
    AnimationEffect: false,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        autoskip: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div>
      {chart_data === null ? (
          <LinearProgress />
      ) : (
        <Doughnut data={chart_data} height={400} options={options} />
      )}
    </div>
  );
};

export default DoughnutChart;
