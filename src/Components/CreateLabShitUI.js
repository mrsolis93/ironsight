import React from "react";
import "../App.css";
import Navbar from "../Components/Navbar";
import LinearProgress from "@mui/material/LinearProgress";
import { getRoles, getCourseList, getTemplateList } from "../IronsightAPI";
import { useQuery } from "react-query";



const StupidShit = () => {
  // Get roles from API

  const {
    data: role_data,
    isLoading: isLoadingRoles,
    isError: isErrorRoles,
  } = useQuery("roles", getRoles);
  const{ 
    data: vm_lab_create,
    isLoading: isLoadingVMLabCreate,
    isError: isErrorVMLabCreate,
  } = useQuery("vm_lab_create", getTemplateList);
  

  const {
    data: course_data,
    isLoading: isLoadingCourses,
    isError: isErrorCourses,
  } = useQuery("course_list", getCourseList);

  if (isLoadingRoles || isLoadingCourses || isLoadingVMLabCreate) {
    return <LinearProgress />;
  }
  if (isErrorRoles || isErrorCourses || isErrorVMLabCreate) {
    return <p>Error!</p>;
  }

  // Take role_data and just make an array of the role names
  const role_names = role_data.map((role) => role.role);

  const vm_template = vm_lab_create.map((template) => template.template_name);

//only allow a user to select one checkbox at a time

  
  // Take course_data and make an array of the course names
  const course_names = course_data.map((course) => course.course_name);

  var selected_courses = [];
  var selected_roles = [];

  return (
    <div className="shit">
      
      <div className="grid grid-cols-2  grid-flow-row gap-4 m-4"> 
          {/* C */}
          <div className="grid grid-cols-1  grid-flow-row gap-4 m-4 col-span-1">
          <div className="col-span-1 rounded-box bg-base-100">
          <h2 className="collapse-title text-center text-base-900">
            Lab Creation
          </h2>
          {/* Text box for username */}
          <div className="form-control w-full mb-6">
            <div className="grid grid-cols-2 grid-flow-row mx-4">
              {/* First name and last name row */}
              <label className="label">
                <span className="label-text mx-4">Lab Name</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row col-span-2">
                <div className="col-span-2 row-span-1 mr-2">
                  <input
                    type="text"
                    placeholder="Lab Name"
                    className="input input-bordered w-full mb-4"
                    id="lab_name"
                  />
                </div>
              </div>
              {/* Password confirmation row */}
              <label className="label">
                <span className="label-text mx-4">Description</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row col-span-2">
                <div className="col-span-2 row-span-1 mr-2">
                  <textarea className="input input-bordered w-full mb-4" id="desc" />
                </div>
              </div>

              {/* Selection dropdown for the roles */}
              <div className="col-span-2 row-span-1 mt-4 mb-4">
                <div
                  tabIndex="0"
                  className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
                >
                  <input type="checkbox" />
                  <div className="collapse-title text-lg font-medium">
                    Templates
                  </div>
                  <div className="collapse-content">
                    {/* Map roles to checkboxes */}
                    {vm_template.map((template_name) => (
                      <div key={template_name}>
                        {/* Put checkbox and role next to each other horizontally */}
                        <label className="label cursor-pointer ">
                          <input
                            type="radio"
                            name="radio-7"
                            id={`${template_name}_checkbox`}
                            class="radio checked:bg-blue-500"
                            
                            defaultChecked={false}
                            className="radio"
                          checked/>
                          <span className=" ml-4 checkbox-label-text">
                            {template_name}
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
                        <label className="label cursor-pointer ">
                          <input
                            type="radio"
                            name="radio-6"
                            id={`${course}_checkbox`}
                            class="radio checked:bg-blue-500"
                            
                            defaultChecked={false}
                            className="radio"
                          checked/>
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
          <button className="btn btn-success m-4">Create Lab</button>
          
        </div>
          </div>
        </div>
      </div>
      
    
  );
};

export default StupidShit;