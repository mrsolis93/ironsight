import * as React from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import LineChart from "../../Charts/LineChart";
import { Rnd } from "react-rnd";

var widgetName = "Elastic Entries by Host";

function Widget() {
  return (
    <Rnd
    default={{
      x: 10,
      y: 10,
      width: 950,
      height: 350,
    }}>
    <Box
      // Add rounded grey border
      borderRadius={2}
      border={10}
      // borderTop={40}
     class="bg-grey-700"
      borderStyle="solid"
      sx={{ bgcolor: "background.paper" }}
      // Minimum width of the widget
      // minWidth={950}
      // minHeight={350}
    >
      <Box
        sx={{ bgcolor: "bg-grey-700" }}
        height={30}
        borderStyle="solid"
        borderLeft={10}
        borderColor="transparent"
      >
        <Tooltip title="Drag me around" placement="top">
        <strong>{widgetName}</strong>
        </Tooltip>
      </Box>
      <Box sx={{ bgcolor: "background.paper" }}></Box>
      <LineChart />
    </Box>
    </Rnd>
  );
}

export default Widget;
