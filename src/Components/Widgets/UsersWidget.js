import * as React from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";
import { Rnd } from "react-rnd";

// List of all names
const names = [
  "tyler_harrison",
  "augustine_solis",
  "truman_brown",
  "sudip_koirala",
  "caleb_hamilton",
  "robert_freas",
  "eman_hammad",
];

function renderRow(props) {
  const { index, style } = props;

  return (
    // List all of the names
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={names[index]} />
      </ListItemButton>
    </ListItem>
  );
}

function VirtualizedList() {
  return (
    <Rnd
    default={{
      x: 970,
      y: 10,
      width: 350,
      height: 350,
    }}>
    <Box
      // Add rounded grey border
      borderRadius={2}
      border={10}
      // borderTop={40}
      borderColor="grey.700"
      borderStyle="solid"
      sx={{ bgcolor: "background.paper" }}
      // Minimum width of the list
      minWidth={350}
    >
      <Box
        sx={{ bgcolor: "grey.700" }}
        height={30}
        borderStyle="solid"
        borderLeft={10}
        borderColor="grey.700"
      >
        <strong>Users</strong>
      </Box>
      <FixedSizeList
        height={400}
        // width={360}
        itemSize={46}
        itemCount={10}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
    </Rnd>
  );
}

export default VirtualizedList;
