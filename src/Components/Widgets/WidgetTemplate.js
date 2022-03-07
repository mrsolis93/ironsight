import * as React from "react";
import Box from "@mui/material/Box";

var widgetName = "Widget Template";

function Widget() {
  return (
    <Box
      // Add rounded grey border
      borderRadius={2}
      border={10}
      // borderTop={40}
      borderColor="grey.700"
      borderStyle="solid"
      sx={{ bgcolor: "background.paper" }}
      // Minimum width of the widget
      minWidth={350}
      minHeight={400}
    >
      <Box
        sx={{ bgcolor: "grey.700" }}
        height={30}
        borderStyle="solid"
        borderLeft={10}
        borderColor="grey.700"
      >
        <strong>{widgetName}</strong>
      </Box>
      <Box sx={{ bgcolor: "background.paper" }} minWidth={350}></Box>
    </Box>
  );
}

export default Widget;
