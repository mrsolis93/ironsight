import React from "react";
import "../../App.css";
import Navbar from "../../Components/Navbar";
import { useParams } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import {
  getCourseList,
  getVMList,
  getLabList,
  getUsersList,
  getHarvesterVMList,
  getLabOverview,
} from "../../IronsightAPI";

function StudentLabDetails() {
  const { lab_num, student_name } = useParams();

  // Get course associated with this lab_num
  const {
    data: course_data,
    isLoading: isLoading_course,
    isError: isError_course,
  } = useQuery("course_list", getCourseList);
  const {
    data: lab_overview_data,
    isLoading: isLoading_lab_overview,
    isError: isError_lab_overview,
  } = useQuery(["lab_overview", lab_num], getLabOverview);
  const {
    data: lab_data,
    isLoading: isLoading_lab,
    isError: isError_lab,
  } = useQuery("lab_list", getLabList);
  const {
    data: vm_data,
    isLoading: isLoading_vm,
    isError: isError_vm,
  } = useQuery("vm_list", getVMList);
  const {
    data: user_data,
    isLoading: isLoading_user,
    isError: isError_user,
  } = useQuery("users_list", getUsersList);
  const {
    data: harvester_data,
    isLoading: harvester_isLoading,
    isError: harvester_isError,
  } = useQuery("harvester_vms", getHarvesterVMList);

  var [selectedVM, setSelectedVM] = React.useState("");

  if (
    isLoading_course ||
    isLoading_lab ||
    isLoading_vm ||
    isLoading_user ||
    harvester_isLoading
  ) {
    return <LinearProgress />;
  }
  if (
    isError_course ||
    isError_lab ||
    isError_vm ||
    isError_user ||
    harvester_isError
  ) {
    return <p>Error!</p>;
  }

  // Get course_id out of lab_data
  var course_id = "";
  for (let i = 0; i < lab_data.length; i++) {
    if (lab_data[i].lab_num.toString() === lab_num) {
      course_id = lab_data[i].course_id;
    }
  }

  // Find course_name out of course_data using course_id
  var course_name = "";
  for (let i = 0; i < course_data.length; i++) {
    if (course_data[i].course_id === course_id) {
      course_name = course_data[i].course_name;
    }
  }

  // Get student data out of user_data
  var student_data = [];
  for (let i = 0; i < user_data.length; i++) {
    if (user_data[i].user_name === student_name) {
      student_data = user_data[i];
    }
  }

  // Capitalize the first letter of the first name and last name
  var first_name =
    student_data.first_name.charAt(0).toUpperCase() +
    student_data.first_name.slice(1);
  var last_name =
    student_data.last_name.charAt(0).toUpperCase() +
    student_data.last_name.slice(1);

  // Get the lab name out of lab_data
  var lab_name = "";
  for (let i = 0; i < lab_data.length; i++) {
    if (lab_data[i].lab_num.toString() === lab_num) {
      lab_name = lab_data[i].lab_name;
    }
  }

  function getLabRequirements() {
    var lab_requirements = [];
    for (let i = 0; i < 10; i++) {
      lab_requirements[i] = (
        <div className="form-control flex flex-row gap-4 items-center">
          <label className="label cursor-pointer">
            <input
              type="checkbox"
              defaultChecked={i < 5 ? true : false}
              className="checkbox checkbox-primary"
            />
            {/* Item 1 justify next to checkbox */}
          </label>
          <span className="checkbox-label">Item {i + 1}</span>
        </div>
      );
    }
    return lab_requirements;
  }

  function getStudentVirtualMachines() {
    var lab_vms = [];
    for (let i = 0; i < vm_data.length; i++) {
      for (let j = 0; j < vm_data[i].labs.length; j++) {
        if (vm_data[i].labs[j].toString() === lab_num) {
          lab_vms.push(vm_data[i]);
        }
      }
    }
    var student_vms = [];
    for (let i = 0; i < lab_vms.length; i++) {
      for (let j = 0; j < lab_vms[i].users.length; j++) {
        if (lab_vms[i].users[j].toString() === student_name) {
          student_vms.push(lab_vms[i]);
        }
      }
    }
    return student_vms;
  }

  function getVirtualMachineTabs() {
    var student_vms = getStudentVirtualMachines();
    var vm_tabs = [];
    for (let i = 0; i < student_vms.length; i++) {
      vm_tabs.push(
        <button
          className={
            selectedVM === student_vms[i].vm_name ? "btn btn-primary" : "btn"
          }
          onClick={() => setSelectedVM(student_vms[i].vm_name)}
        >
          {student_vms[i].vm_name}
        </button>
      );
    }

    return <div className="btn-group">{vm_tabs}</div>;
  }

  if (getVirtualMachineTabs().length != 0 && selectedVM == "") {
    selectedVM = getStudentVirtualMachines()[0].vm_name;
  }

  function remoteVNC(vm_name) {
    
  }

  return (
    <div className="labs">
      <Navbar />
      <div className="text-md breadcrumbs m-4">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/courses">Courses</Link>
          </li>
          <li>
            <Link to={`/course_details/${course_id}/`}>{course_name}</Link>
          </li>
          <li>
            <Link to={`/lab_details/${lab_num}/`}>{lab_name}</Link>
          </li>
          <li>
            <strong>
              {first_name} {last_name}
            </strong>
          </li>
        </ul>
      </div>

      {/* Display VMs that are in this lab, lab requirements with checkboxes, 
          combined bash history for each virtual machine in lab, login history,
          whether or not the lab has been submitted, and notes*/}

      <div className="grid grid-flow-row grid-cols-1 md:grid-cols-3 gap-4 mx-4">
        <div className="row-span-4 md:col-span-2 rounded-box bg-base-100 shadow-xl">
          <div className="mx-4 my-6 h-full">
            {/* Main Panel */}
            <div className="grid grid-cols-1 mb-4">
              {/* Main panel title */}
              <div className="col-span-1 flex flex-col">
                <div className="flex flex-row gap-4">
                  <h2 className="card-title">Virtual Machines</h2>
                  {getVirtualMachineTabs()}
                  <button
                    className="btn btn-success btn-outline"
                    onClick={() => {
                      remoteVNC("filler");
                    }}
                  >
                    <span>Remote VNC</span>
                  </button>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
        <div className="row-span-4 md:col-span-1 rounded-box bg-base-100 shadow-xl">
          <div className="mx-4 my-6 h-full">
            {/* Lab Requirements */}
            <div className="grid grid-cols-1 mb-4">
              {/* Lab Requirements title */}
              <div className="col-span-1">
                <h2 className="card-title mb-4">Lab Requirements</h2>
                {/* Checkboxes for action items */}
                {/* Make 8 of them as a placeholder */}
                {getLabRequirements()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentLabDetails;
