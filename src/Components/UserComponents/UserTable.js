import * as React from "react";

import { useQuery } from "react-query";
import { getUsersList } from "../../IronsightAPI";

import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import {DEFAULT_OPTIONS, getTheme} from "@table-library/react-table-library/material";

import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { usePagination } from '@table-library/react-table-library/pagination';


import {
  Stack,
  TextField,
  Checkbox,
  Modal,
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  TablePagination,
} from '@mui/material';

import { useSort } from "@table-library/react-table-library/sort";
import { FaSearch } from "react-icons/fa";
import useUserData from "./UserData";
import LinearProgress from "@mui/material/LinearProgress";
import CreateUser from "../CreateUser";


// import { nodes } from './data';


const key = "Search";

//THESE ARE YOUR OPTIONS FOR TABLE CSS
// export declare type Theme = {
//   Table?: string;
//   Header?: string;
//   Body?: string;
//   BaseRow?: string;
//   HeaderRow?: string;
//   Row?: string;
//   BaseCell?: string;
//   HeaderCell?: string;
//   Cell?: string;
// };


// const DEFAULT_OPTIONS: {
//   horizontalSpacing: number;
//   verticalSpacing: number;
//   striped: boolean;
//   highlightOnHover: boolean;
// };

const UserTable = () => {

  //set data to users_data (DATA MUST BE NAMED NODES)
  const nodes = useUserData();
  let data = nodes;

  

  const materialTheme = getTheme({
    ...DEFAULT_OPTIONS,
    
    highlightOnHover: true,
  });

  const customTheme = {
    Table: `
    margin: 5px 5px;
    background-color: pink;
    border-radius: 10 px;

    height: 100%;
    color: #6419E6;

    &.my-table {
      background-color: orange;
     }

    .hover-row {
      background-color: #A4A8B5;
    }

    
    
  `,

  Body:
  `
    
    background-color: transparent;
  
  `,

  BaseRow:
  `
  
    background-color: transparent;
  
  `,

    Cell:
     `
    font-size: 18px;

    &:nth-of-type(1) {
      min-width: 10%;
      width: 10%;
      color: #6419E6;
      
    }

    &:nth-of-type(2), &:nth-of-type(3), &:nth-of-type(4) {
      min-width: 20%;
      width: 20%;
      background-color: transparent;
    }

    &:nth-of-type(5) {
      min-width: 30%;
      width: 30%;
      background-color: transparent;
    }

    &:nth-of-type(6) {
      min-width: 30%;
      width: 30%;
      background-color: transparent;
    }

  
    border-right: 1px solid transparent;
    `,

    HeaderRow:
    `
    
      background-color: #1E1E1E;
      color: #ABACAF;
      
    
    `,

    Row:
    `
    &:hover {
      color: #6419E6;
      background-color: #2F3137;
      opacity: 0.9;

    }
      background-color: transparent;
    
    `,
  };

  
  const theme = useTheme([materialTheme, customTheme]);


   const pagination = usePagination(data, {
    state: {
      page: 0,
      size: 15,
    },
    onChange: onPaginationChange,
  });

  function onPaginationChange(action, state) {
    console.log(action, state);
  }


  const [search, setSearch] = React.useState("");

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
        USER: (array) =>
          array.sort((a, b) => a.first_name.localeCompare(b.first_name)),
        ROLE: (array) =>
          array.sort((a, b) => a.user_role.localeCompare(b.user_role)),
        COURSES: (array) =>
          array.sort((a, b) => a.course_id_list.localeCompare( b.course_id_list)),
        COURSENUM: (array) =>
          array.sort((a, b) => (b.course_num || []) - (a.course_num || [])),
        VMNUM: (array) =>
          array.sort((a, b) => (b.vm_num || []) - (a.vm_num || [])),
      },
    }
  );  


  function onSortChange(action, state) {
    console.log(action, state);
  }

  //* Modal *//

  const [modalOpened, setModalOpened] = React.useState(false);


  if (!nodes) {
    return <LinearProgress />;
  }

  console.log("Top Table Data:", data);

  data = {
    id: "users",
    nodes: data.filter((item) =>
      item.user_name.toLowerCase().includes(search.toLowerCase())
    ),
  };

  // console.log("Table Data 2: ", table_data);

  const COLUMNS = [
    // Display a circle mask profile picture
    {
      label: "User",
      renderCell: (item) => (item.thumbnail),
      sort: { sortKey: "USER" },
      
    },

    {
      label: "Role",
      renderCell: (item) => item.user_role,
      sort: { sortKey: "ROLE" },
    },

    {
      label: "Courses",
      renderCell: (item) => item.course_id_list,
      sort: { sortKey: "COURSES" },
    },

    {
      label: "# of Courses",
      renderCell: (item) => item.course_num,
      sort: { sortKey: "COURSENUM" },
    },

    {
      label: "# of VMs",
      renderCell: (item) =>  item.vm_num,
      sort: { sortKey: "VMNUM" },
    },
  ];


  return (
    <>

      <Modal open={modalOpened} onClose={() => setModalOpened(false)}>
      <div className="rounded-box bg-base-100 mx-4 md:my-20 lg:mx-88">
          <h2 className="collapse-title text-center text-base-900">
            Create User
          </h2>
          <CreateUser />
        </div>
      </Modal>

      <Stack spacing={120} direction="row-reverse" className="m-3 ">

        <button variant="contained" onClick={() => setModalOpened(true)} className="btn btn-primary btn-med text-base-900 hover cursor-pointer " >
          Create User
        </button>

        <TextField
          label="Search Users"
          value={search}
          icon={<FaSearch />}
          onChange={handleSearch}
        />
  
      </Stack>

      
      <br />

         <div className="grid  gap-4 m-4 "> 
           <CompactTable columns={COLUMNS} data={data} sort={sort} theme={theme}  />
        </div>
         

      <br />
      

      <Stack spacing={10}>
          <TablePagination
            count={data.nodes.length}
            page={pagination.state.page}
            rowsPerPage={pagination.state.size}
            rowsPerPageOptions={[10, 15, 20]}
            onRowsPerPageChange={(event) =>
              pagination.fns.onSetSize(parseInt(event.target.value, 10))
            }
            onPageChange={(event, page) => pagination.fns.onSetPage(page)}
          />
      </Stack>
      
    </>
  );
};

export default UserTable;
