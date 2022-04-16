import React from "react";
import "../../App.css";
import Navbar from "../../Components/Navbar";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getLabOverview } from "../../IronsightAPI";
import LinearProgress from "@mui/material/LinearProgress";
import { Link } from "react-router-dom";
import ReAreaChart from "../../Charts/ReAreaChart";

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
        <td>
          <Link key={user} to={"/user_details/" + user}  className="hover">
           {user} </Link></td>
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
        <td>
          <Link key={vm} to={"/vm_details/" + vm}>
            {vm}
          </Link>
        </td>
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
    if (data.tags[i]["type"] != "image_link") {
      tags.push(capitalized_tag);
    }
  }

  // Map the tags to a table
  const get_tags = () => {
    return tags.map((tag) => (
      <div className=" badge badge-primary w-25 mx-1 my-4">{tag}</div>
    ));
  };

  return (
    <div className="labs">
      <Navbar />
      {/* Top bar (breadcrumbs) */}
    

      <div className="navbar bg-base-300 rounded-box">
        <div className="flex flex-1 px-2">
          <div className="flex items-stretch">
            <div className="flex flex-col">
              <div className="flex flex-row ml-4 text-md breadcrumbs m-4">
              
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/courses">Labs</Link>
          </li>
          <li>
            <strong>{data.lab_name}</strong>
          </li>
        </ul>
      
              
              
              </div>
              <div class="flex flex-row ml-4">{get_tags()}</div>

              <div className="flex flex-row ml-4">
                Date start: {data.date_start}
              </div>
              <div className="flex flex-row ml-4">
                Date end: {data.date_end}
              </div>
              <div className="overflow-auto m-4">{data.lab_description}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex md:flex-row flex-col mt-3 md:mr-3 md:ml-3">
        {/* Users table */}
      <div className="md:w-1/4 rounded-box bg-base-100 shadow-xl m-3 max-h-96">
              <div className="card-body p-4 md:p-8 max-h-96">
                <div className="flex flex-row">
                  <table className="table w-full">
          <thead>
            <tr>
              <td>Users</td>
            </tr>
          </thead>
          <tbody>{get_users()}</tbody>
        </table>
        </div>
        </div>
      </div>

      <div className="md:w-1/2 rounded-box bg-base-100 shadow-xl m-3">
              <div className="flex flex-col max-h-96 card-body p-4 md:p-8">
                <h2 className="card-title">Lab Activity</h2>
                <div className="flex flex-col md:flex-row">
                  <div className="hidden lg:flex  w-full">
                    <ReAreaChart />
                  </div>
                </div>
              </div>
            </div>
      
      {/* Virtual Machine table will eventually add status icons */}
      <div className="md:w-1/4 rounded-box bg-base-100 shadow-xl m-3 max-h-96">
              <div className="card-body p-4 md:p-8 max-h-96">
                <div className="flex flex-row">
                  <table className="table w-full">
          <thead>
            <tr>
              <th>Virtual Machines</th>
            </tr>
          </thead>
          <tbody>{get_virtual_machines()}</tbody>
        </table>
      </div>
      </div>
      </div>
      {/* this is where the to div ends right below this comment */}
      </div>
      
      {/* the template table is such a meme and begins here */}
      <div className="flex md:flex-row flex-col md:mr-1 md:ml-1">
      <div className="md:w-1/4 rounded-box bg-base-100 shadow-xl m-3 max-h-96">
      <div className="card-body p-2 md:p-5 max-h-96">
      
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
    </div>
    </div>
  
  );
}

export default LabOverview;
