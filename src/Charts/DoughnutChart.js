import React, { useEffect, useRef, useReducer } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
var elkData = [];

const DoughnutChart = () => {
  var url =
    "https://api.rellis.dev/get.php?q=%27{%22size%22:100,%22aggs%22:{%22hostnames%22:{%22terms%22:{%22field%22:%22host.name%22,%22size%22:100}}}}%27";

  const cache = useRef({});
  const initialState = {
    status: "idle",
    error: null,
    data: [],
  };

  const [chartstate, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "FETCHING":
        return { ...initialState, status: "fetching" };
      case "FETCHED":
        return { ...initialState, status: "fetched", data: action.payload };
      case "FETCH_ERROR":
        return { ...initialState, status: "error", error: action.payload };
      default:
        return state;
    }
  }, initialState);

  useEffect(() => {
    let cancelRequest = false;
    if (!url) return;

    const fetchData = async () => {
      fetch(
        `${url}`,
        {
          method: "GET",
          headers: {
            // 'Content-Type': 'application/json',
          },
        },
        { cache: "force-cache" }
      )
        .then((response) => {
          response.json().then((json) => {
            // console.log(json)
            // Append to elkData
            elkData = json.aggregations.hostnames.buckets;
            // console.log all of the keys in the elkData
          });
        })
        .catch((error) => {
          console.log(error);
        });
      dispatch({ type: "FETCHING" });
      if (cache.current[url]) {
        const data = data.current[url];
        dispatch({ type: "FETCHED", payload: elkData });
      } else {
        try {
          const response = await fetch(url);
          const data = await response.json();
          cache.current[url] = data;
          if (cancelRequest) return;
          dispatch({ type: "FETCHED", payload: data });
        } catch (error) {
          if (cancelRequest) return;
          dispatch({ type: "FETCH_ERROR", payload: error.message });
        }
      }
    };

    fetchData(chartstate);

    return function cleanup() {
      cancelRequest = true;
    };
  }, [url]);

  for (var key in elkData) {
    console.log(elkData[key].doc_count);
  }

  //this function below enters buckets and grabs the keys from inside of buckets
  var Xaxis = elkData.map(function (x) {
    return x.key;
  });
  //this function below enters buckets and grabs the doc_count value from inside of buckets
  var Yaxis = elkData.map(function (y) {
    return y.doc_count;
  });

  var data = {
    //fill labels in with the buckets
    labels: Xaxis, //x-axis
    datasets: [
      {
        data: Yaxis,
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
  var options = {
    maintainAspectRatio: false,
  };

  return (
    <div>
      <Doughnut data={data} height={400} options={options} />
    </div>
  );
};

export default DoughnutChart;
