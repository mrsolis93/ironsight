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

  if (isLoading_course || isLoading_lab || isLoading_vm || isLoading_user) {
    return <LinearProgress />;
  }
  if (isError_course || isError_lab || isError_vm || isError_user) {
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

  var course_details_link = "/course_details/" + course_id + "/";
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
            <Link to={course_details_link}>{course_name}</Link>
          </li>
          <li>
            <strong>
              {first_name} {last_name}
            </strong>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default StudentLabDetails;
