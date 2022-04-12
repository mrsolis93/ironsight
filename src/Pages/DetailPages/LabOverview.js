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
    return (
      <div>
        <Navbar />
        <LinearProgress />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <Navbar />
        <p>Error!</p>)
      </div>
    );
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

  const virtual_machines = [];
  for (let i = 0; i < data.virtual_machines.length; i++) {
    virtual_machines.push(data.virtual_machines[i]);
  }

  // Map the virtual machines to a table
  const get_virtual_machines = () => {
    return virtual_machines.map((vm) => (
      <tr key={vm} className="hover">
        <td>{vm}</td>
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
  };

  const tags = [];
  for (let i = 0; i < data.tags.length; i++) {
    // Capitalize the first letter of the tag
    const tag = data.tags[i]["tag"];
    const capitalized_tag = tag.charAt(0).toUpperCase() + tag.slice(1);
    tags.push(capitalized_tag);
  }

  // Map the tags to a table
  const get_tags = () => {
    return tags.map((tag) => (
      <tr key={tag} className="hover">
        <td>{tag}</td>
      </tr>
    ));
  };

  return (
    <div className="labs">
      <Navbar />

      <div class="navbar bg-base-300 rounded-box">
  <div class="flex-1 px-2 lg:flex-none">
    <a class="text-lg font-bold">{data.lab_name}</a>
  </div> 
  <div class="flex justify-end flex-1 px-2">
    <div class="flex items-stretch">
    <p className="w-60 mt-4">Date start: {data.date_start}</p>
      <p className="w-60 mt-4">Date end: {data.date_end}</p>
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost rounded-btn">Description</label>
        <ul tabindex="0" class="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4">
          <li><a>{data.lab_description}</a></li> 
        </ul>
      </div>
        <div class="dropdown dropdown-end">
        <label tabindex="1" class="btn btn-ghost rounded-btn">Tags</label>
        <ul tabindex="1" class="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4">
          <li>{get_tags()}</li>
        </ul>
        </div>
      
    </div>
  </div>
</div>

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
              <th>Virtual Machines</th>
            </tr>
          </thead>
          <tbody>{get_virtual_machines()}</tbody>
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
    </div>
  );
}

export default LabOverview;
