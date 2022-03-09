import React from "react";
import "../App.css";
import BarChart from "../Charts/BarChart";
import { Rnd } from "react-rnd";
import  PieChart  from "../Charts/PieChart";
import DoughnutChart from "../Charts/DoughnutChart";

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
