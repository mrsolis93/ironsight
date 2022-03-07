import React from "react";
import "../App.css";
import BarChart from "../Charts/BarChart";
import { Rnd } from "react-rnd";

function Resources() {
  return (
    <div className="resources">
      <Rnd
        default={{
          x: 10,
          y: 0,
          width: "95%",
          height: 200,
        }}
      >
        <BarChart />
      </Rnd>
    </div>
  );
}

export default Resources;
