import React, { useState } from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import EnhancedTable from "./EnhancedTable";
import useUserData from "./UserData";
import LinearProgress from "@mui/material/LinearProgress";

function UserTable() {
  const columns = React.useMemo(
    () => [
      {
        Header: "User",
        accessor: "first_name",
      },
      {
        Header: "Role",
        accessor: "last_name",
      },
      {
        Header: "Class",
        accessor: "user_name",
      },
      {
        Header: "# of Labs",
        accessor: "profile_pic_data",
      },

      {
        Header: "# of VMs",
        accessor: "student_major",
      }, 
      {
        Header: "roles",
        accessor: "user_role",
      },
    ],
    []
  );

  const user_data = useUserData();

  const [data, setData] = useState(React.useMemo(() => user_data, []))
  const [skipPageReset, setSkipPageReset] = React.useState(false);

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data


  if (user_data) {
  console.log("UserData: ", user_data);
  }
  else {
    return <LinearProgress />;
  }

  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  return (
    <div>
      <CssBaseline />
      <EnhancedTable
        columns={columns}
        data={data}
        setData={setData}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
    </div>

    // <div className="overflow-auto m-20 xl:mx-48">
    //  <table className="table w-full">
    //       <thead>
    //         <tr>
    //           <th>User</th>
    //           <th>Class</th>
    //           <th>Labs</th>
    //           <th>Progress</th>
    //           <th>VirtualMachines</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         \\
    //       </tbody>
    //     </table>
    // </div>
  );
}

export default UserTable;
