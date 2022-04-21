import React from "react";
import "../../App.css";
import { useQuery } from "react-query";
import { getLabList } from "../../IronsightAPI";
import { Link } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";

const LabTable = ({ course_id, user_name }) => {
  const { data, isLoading, isError } = useQuery("lab_list", getLabList);

  if (isLoading) {
    return <LinearProgress />;
  }

  if (isError) {
    return <p>Error!</p>;
  }

  //   Pull in JSON data and add to array if the lab belongs in this class (using sub_tag matching)
  var lab_data = [];
  data.forEach((lab) => {
    // If course_id is not null
    if (course_id != null) {
      if (lab.course_id === course_id) {
        lab_data.push(lab);
      }
    } else {
      lab_data.push(lab);
    }
  });

  //   Take the raw JSON and turn it into the rows of the table
  var lab_html = lab_data.map(function (lab) {
    var lab_link = "/lab_details/" + lab.lab_num;
    if (user_name !== undefined) {
      lab_link += "/" + user_name;
    }
    return (
      <tr key={lab.lab_num} className="hover">
        <td>
          <Link className="w-full" to={lab_link} key={lab.lab_num}>
            <div className="flex items-center space-x-3">
              <div>
                <div className="font-bold">{lab.lab_name}</div>
              </div>
            </div>
          </Link>
        </td>
        <td>
          <div>
            <p className="w-48 xl:w-[500px] relative text-ellipsis overflow-hidden max-h-24">
              {lab.lab_description}
            </p>
          </div>
        </td>
        <td>{lab.date_start}</td>
        <td>{lab.date_end}</td>
      </tr>
    );
  });

  return (
    <div>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <td>Lab Name</td>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>{lab_html}</tbody>
        </table>
      </div>
    </div>
  );
};

export default LabTable;
