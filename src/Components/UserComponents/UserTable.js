import * as React from 'react';

import { useQuery } from "react-query";
import {
  getUsersList,
} from "../../IronsightAPI";
 
 

import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/material';
import { useSort } from '@table-library/react-table-library/sort';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Stack, TextField } from '@mui/material';
import { FaSearch } from 'react-icons/fa';
// import {useUserData} from "./UserData";
import LinearProgress from "@mui/material/LinearProgress";

 import { nodes } from './data';

const key = 'Search';
 
const UserTable = () => {


  const {
    data: users_data,
    isLoading: users_isLoading,
    isError: users_isError,
  } = useQuery("users_list", getUsersList);

  console.log("Users Data:",users_data)

  //set data to users_data
  let data =  table_data ;

  console.log("Data:",data)
  console.log("Top Table Data:",table_data)

  const materialTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(materialTheme);

  const [search, setSearch] = React.useState('');

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };


  const sort = useSort(
    data,
    {
      onChange: onSortChange,
    },
    {
      sortIcon: {
        iconDefault: null,
        iconUp: <FaChevronUp />,
        iconDown: <FaChevronDown />,
      },
      sortFns: {
        TASK: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
        DEADLINE: (array) => array.sort((a, b) => a.deadline - b.deadline),
        TYPE: (array) => array.sort((a, b) => a.type.localeCompare(b.type)),
        COMPLETE: (array) => array.sort((a, b) => a.isComplete - b.isComplete),
        TASKS: (array) => array.sort((a, b) => (a.nodes || []).length - (b.nodes || []).length),
      },
    },
  );

  function onSortChange(action, state) {
    console.log(action, state);
  }

  if ( users_isLoading ) {
    console.log("Users Loading...");
    return "Hello";

  }

  if (   users_isError) {
    console.log("Error...");
    return "Error";
  }

  var raw_student_data = [];

  raw_student_data = users_data;
  // console.log(raw_student_data);
  var table_html = raw_student_data.map(function (student) {
    // Capitalize the first letter of the first name
    var first_name =
      student.first_name.charAt(0).toUpperCase() + student.first_name.slice(1);

    // Capitalize the first letter of the last name
    var last_name =
      student.last_name.charAt(0).toUpperCase() + student.last_name.slice(1);

    var student_email = student.user_name + "@leomail.tamuc.edu";
    // Check the tags to see if the student is a student or a professor
    var user_role = "";
    for (let i = 0; i < student.tags.length; i++) {
      if (student.tags[i]["type"] === "role") {
        user_role = student.tags[i]["tag"];
      }
    }

    // Check for a link to a profile picture
    var profile_pic_data = "";
    if (student.profile_pic_data !== null) {
      profile_pic_data = student["profile_pic_data"];
    } else {
      profile_pic_data =
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png";
    }

    var student_major = "";

    for (let i = 0; i < student.tags.length; i++) {
      if (student.tags[i]["type"] === "major") {
        student_major = student.tags[i]["tag"];
      }
    }
  });

  var table_data = [];
  for (let i = 0; i < raw_student_data.length; i++) {
    table_data.push({
      first_name: raw_student_data[i]["first_name"],
      last_name: raw_student_data[i]["last_name"],
      user_name: raw_student_data[i]["user_name"],
      profile_pic_data: raw_student_data[i]["profile_pic_data"],
      student_major: raw_student_data[i]["tags"][1]["tag"],
      user_role: raw_student_data[i]["tags"][0]["tag"],
    });
  }

  console.log("Table Data: ", data.table_data);
  
  data = {
    table_data: data.table_data.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())),
  };

  console.log("Table Data 2: ", table_data);

  const COLUMNS = [
    { label: 'User', renderCell: (item) => item.first_name, sort: { sortKey: 'TASK' } },

    { label: 'Role', renderCell: (item) => item.last_name, sort: { sortKey: 'DEADLINE' }},

    { label: 'Role', renderCell: (item) => item.user_name, sort: { sortKey: 'DEADLINE' }},

    { label: 'Class', renderCell: (item) => item.profile_pic_data, sort: { sortKey: 'TYPE' } },

    { label: '# of Labs', renderCell: (item) => item.student_major, sort: { sortKey: 'COMPLETE' }},

    { label: '# of VMs', renderCell: (item) => item.user_role, sort: { sortKey: 'TASKS' } },
  ];

  return (

    <>
      <Stack spacing={10}>
        <TextField label="Search Task" value={search} icon={<FaSearch />} onChange={handleSearch} />
      </Stack>
      <br />

      <CompactTable columns={COLUMNS} data={data} sort={sort} theme={theme} />

      <br />
      
    </>

  );
};

export default UserTable;