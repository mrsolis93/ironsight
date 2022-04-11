import React from "react";
import "../../App.css";
import Navbar from "../../Components/Navbar";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getLabOverview } from "../../IronsightAPI";
import LinearProgress from "@mui/material/LinearProgress";

function LabOverview() {
  const { lab_num } = useParams();
  const { data, isLoading, isError } = useQuery(
    ["lab_overview", lab_num],
    getLabOverview
  );

  if (isLoading) {
    return <LinearProgress />;
  }

  if (isError) {
    return <p>Error!</p>;
  }

  // If data comes back as {}, return "No data"
  if (Object.keys(data).length === 0) {
    return (
      <div className="labs">
        <Navbar />
        <p className="card-title m-4">Lab not found</p>
      </div>
    );
  }

  const users = [];
  for (let i = 0; i < data.users.length; i++) {
    users.push(data.users[i]);
  }
  // Map the users to a table
  const get_users = () => {
    return users.map((user) => (
      <tr key={user} className="hover">
        <td>{user}</td>
      </tr>
    ));
  };

  const templates = [];
    for (let i = 0; i < data.templates.length; i++) {
        templates.push(data.templates[i]);
    }
    // Map the templates to a table
    const get_templates = () => {
        return templates.map((template) => (
            <tr key={template} className="hover">
                <td>{template}</td>
            </tr>
        ));
    }

  return (
    <div className="labs">
      <Navbar />
      <h2 className="card-title m-4">Lab: {data.lab_name}</h2>
      <div className="overflow-auto m-4">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Users</th>
            </tr>
          </thead>
          <tbody>{get_users()}</tbody>
        </table>
      </div>
      <div className="overflow-auto m-4">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Templates</th>
            </tr>
          </thead>
          <tbody>{get_templates()}</tbody>
        </table>
      </div>
      <p className="m-4">{data.lab_description}</p>
    </div>
  );
}

export default LabOverview;
