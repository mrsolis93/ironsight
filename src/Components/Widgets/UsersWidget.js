import * as React from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";
import { Rnd } from "react-rnd";
import { useEffect, useState } from "react";

// Get all of the names from key "user_name" in the json from the API call and display them in a list using react-window and MUI
// URL: "https://api.rellis.dev/get.php?q=get_users"

function renderRow({ index, style }) {
  // const { index, style } = props;
  return (
    // List all of the names
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={names[index]} />
      </ListItemButton>
    </ListItem>
  );
}

var names = [];

function UsersWidget() {
  const [namesState, setNames] = useState([]);

  var baseUrl = "https://api.rellis.dev/get.php?q=get_users";

  useEffect(() => {
    const fetchData = async () => {
      fetch(`${baseUrl}`, {
        method: "GET",
        headers: {
          // 'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          response.json().then((json) => {
            // console.log(json)
            // Get all of the names from key "user_name"
            names = json.map(function (x) {
              return x.user_name;
            });
            // Set the list of names
            setNames(names);
            console.log(names);
            // console.log all of the keys in the names
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, [baseUrl]);

  return (
    <Rnd
      default={{
        x: 970,
        y: 10,
        width: 350,
        height: 350,
      }}
    >
      <Box
        // Add rounded grey border
        borderRadius={1}
        border={7}
        // borderTop={40}
        
        borderColor="#2f3136"
        borderStyle="solid"
        sx={{ bgcolor: "transparent" }}
        // Minimum width of the list
        minWidth={350}
      >
        <Box
          sx={{ bgcolor: "#2f3136" }}
          height={30}
          borderStyle="solid"
          borderLeft={10}
          borderColor="#2f3136"
        >
          <strong>Users</strong>
        </Box>
        <FixedSizeList
          height={400}
          // width={200}
          itemSize={60}
          itemCount={names.length}
        >
          {renderRow}
        </FixedSizeList>
      </Box>
    </Rnd>
  );
}

export default UsersWidget;
