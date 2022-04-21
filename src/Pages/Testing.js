import React from "react";
import "../App.css";
import Navbar from "../Components/Navbar";
import LinearProgress from "@mui/material/LinearProgress";
import { getRoles, getCourseList } from "../IronsightAPI";
import { useQuery } from "react-query";

const Testing = () => {
  // Get roles from API

  const {
    data: role_data,
    isLoading: isLoadingRoles,
    isError: isErrorRoles,
  } = useQuery("roles", getRoles);

  const {
    data: course_data,
    isLoading: isLoadingCourses,
    isError: isErrorCourses,
  } = useQuery("course_list", getCourseList);

  if (isLoadingRoles || isLoadingCourses) {
    return <LinearProgress />;
  }
  if (isErrorRoles || isErrorCourses) {
    return <p>Error!</p>;
  }

  // Take role_data and just make an array of the role names
  const role_names = role_data.map((role) => role.role);

  // Take course_data and make an array of the course names
  const course_names = course_data.map((course) => course.course_name);

  var selected_courses = [];
  var selected_roles = [];

  return (
    <div className="testing">
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-4 grid-flow-row gap-4 m-4">
        {/* User creation testing */}
        <div className="col-span-2 rounded-box bg-base-100">
          <h2 className="collapse-title text-center text-base-900">
            User Creation
          </h2>
          {/* Text box for username */}
          <div className="form-control w-full mb-6">
            <div className="grid grid-cols-2 grid-flow-row mx-4">
              {/* First name and last name row */}
              <label className="label">
                <span className="label-text mx-4">User Name</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row col-span-2">
                <div className="col-span-1 row-span-1 mr-2">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="input input-bordered w-full mb-4"
                    id="first_name"
                  />
                </div>
                <div className="col-span-1 row-span-1 mr-2">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="input input-bordered w-full mb-4"
                    id="last_name"
                  />
                </div>
              </div>
              {/* Password confirmation row */}
              <label className="label">
                <span className="label-text mx-4">Password</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row col-span-2">
                <div className="col-span-1 row-span-1 mr-2">
                  <input
                    type="text"
                    placeholder="Password"
                    className="input input-bordered w-full mb-4"
                    id="password"
                  />
                </div>
                <div className="col-span-1 row-span-1 mr-2">
                  <input
                    type="text"
                    placeholder="Confirm Password"
                    className="input input-bordered w-full"
                    id="confirm_password"
                  />
                </div>
              </div>

              {/* Selection dropdown for the roles */}
              <div className="col-span-2 row-span-1 mb-4">
                <div
                  tabIndex="0"
                  className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
                >
                  <input type="checkbox" />
                  <div className="collapse-title text-lg font-medium">
                    Role selection
                  </div>
                  <div className="collapse-content">
                    {/* Map roles to checkboxes */}
                    {role_names.map((role) => (
                      <div key={role}>
                        {/* Put checkbox and role next to each other horizontally */}
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            defaultChecked={false}
                            className="checkbox"
                            id={`${role}_checkbox`}
                          />
                          <span className=" ml-4 checkbox-label-text">
                            {role}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Selection dropdown for the courses */}
              <div className="col-span-2 row-span-1">
                <div
                  tabIndex="0"
                  className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
                >
                  <input type="checkbox" />
                  <div className="collapse-title text-lg font-medium">
                    Course selection
                  </div>
                  <div className="collapse-content">
                    {/* Map roles to checkboxes */}
                    {course_names.map((course) => (
                      <div key={course}>
                        {/* Put checkbox and course next to each other horizontally */}
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            defaultChecked={false}
                            className="checkbox"
                            id={`${course}_checkbox`}
                          />
                          <span className=" ml-4 checkbox-label-text">
                            {course}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="btn btn-success m-4">Create User</button>
        </div>
        <div className="col-span-1 rounded-box bg-base-100">
          {/* Code here */}
        </div>
        <div className="col-span-1 rounded-box bg-base-100">
          {/* Code here */}
        </div>
      </div>
    </div>
  );
};

export default Testing;
