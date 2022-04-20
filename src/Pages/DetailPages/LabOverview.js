import React from "react";
import "../../App.css";
import Navbar from "../../Components/Navbar";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import {
  getLabOverview,
  getCourseList,
  getVMList,
  getLabList,
  getUsersList,
} from "../../IronsightAPI";
import LinearProgress from "@mui/material/LinearProgress";
import { Link } from "react-router-dom";
import ReAreaChart from "../../Charts/ReAreaChart";

function LabOverview() {
  const { lab_num } = useParams();
  const {
    data: lab_overview_data,
    isLoading: isLoading_lab_overview,
    isError: isError_lab_overview,
  } = useQuery(["lab_overview", lab_num], getLabOverview);
  const {
    data: course_data,
    isLoading: isLoading_course,
    isError: isError_course,
  } = useQuery("course_list", getCourseList);
  const {
    data: vm_data,
    isLoading: isLoading_vm,
    isError: isError_vm,
  } = useQuery("vm_list", getVMList);
  const {
    data: lab_data,
    isLoading: isLoading_lab,
    isError: isError_lab,
  } = useQuery("lab_list", getLabList);
  const {
    data: user_data,
    isLoading: isLoading_user,
    isError: isError_user,
  } = useQuery("users_list", getUsersList);

  if (
    isLoading_lab_overview ||
    isLoading_course ||
    isLoading_vm ||
    isLoading_lab ||
    isLoading_user
  ) {
    return (
      <div>
        <Navbar />
        <LinearProgress />
      </div>
    );
  }

  if (
    isError_lab_overview ||
    isError_course ||
    isError_vm ||
    isError_lab ||
    isError_user
  ) {
    return (
      <div>
        <Navbar />
        <p>Error!</p>)
      </div>
    );
  }

  // If data comes back as {}, return "No data"
  if (Object.keys(lab_overview_data).length === 0) {
    return (
      <div className="labs">
        <Navbar />
        <p className="card-title m-4">Lab not found</p>
      </div>
    );
  }

  var course_id = lab_overview_data.course_id;
  var class_name = "";
  for (let i = 0; i < course_data.length; i++) {
    if (course_data[i].course_id === course_id) {
      class_name = course_data[i].course_name;
    }
  }

  const users = [];
  for (let i = 0; i < lab_overview_data.users.length; i++) {
    users.push(lab_overview_data.users[i]);
  }

  // Map the users to a table
  const get_users = () => {
    return users.map((user) => (
      <tr key={user} className="hover">
        <td>
          <Link key={user} to={"/user_details/" + user} className="hover">
            {user}{" "}
          </Link>
        </td>
      </tr>
    ));
  };

  const virtual_machines = [];
  for (let i = 0; i < lab_overview_data.virtual_machines.length; i++) {
    virtual_machines.push(lab_overview_data.virtual_machines[i]);
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
  for (let i = 0; i < lab_overview_data.templates.length; i++) {
    templates.push(lab_overview_data.templates[i]);
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
  for (let i = 0; i < lab_overview_data.tags.length; i++) {
    // Capitalize the first letter of the tag
    const tag = lab_overview_data.tags[i];
    tags.push(tag);
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
              <div className="flex flex-row text-md breadcrumbs m-4">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/courses">Courses</Link>
                  </li>
                  <li>
                    <Link to={`/course_details/${course_id}/`}>
                      {class_name}
                    </Link>
                  </li>
                  <li>
                    <strong>{lab_overview_data.lab_name}</strong>
                  </li>
                </ul>
              </div>
              <div class="flex flex-row ml-4">{get_tags()}</div>

              <div className="flex flex-row ml-4">
                Date start: {lab_overview_data.date_start}
              </div>
              <div className="flex flex-row ml-4">
                Date end: {lab_overview_data.date_end}
              </div>
              <div className="overflow-auto m-4">
                {lab_overview_data.lab_description}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 grid-flow-row m-4 gap-4">
        {/* Users table */}
        <div className="col-span-1 rounded-box bg-base-100 shadow-xl">
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

        {/* Virtual Machine table will eventually add status icons */}
        <div className="col-span-1 md:col-span-2 rounded-box bg-base-100 shadow-xl">
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
        <div className="col-span-1 rounded-box bg-base-100 shadow-xl">
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
