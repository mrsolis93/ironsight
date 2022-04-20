import React from "react";
import "../../App.css";
import Navbar from "../../Components/Navbar";
import { useParams } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getCourseList, getVMList, getLabList } from "../../IronsightAPI";

function StudentLabDetails() {
  const { lab_num, student_name } = useParams();

  // Get course associated with this lab_num
  const { data: course_data, isLoading: isLoading_course, isError: isError_course } = useQuery("course_list", getCourseList);
  const { data: lab_data, isLoading: isLoading_lab, isError: isError_lab } = useQuery("lab_list", getLabList);

  if (isLoading_course || isLoading_lab) {
    return <LinearProgress />;
  }
  if (isError_course || isError_lab) {
    return <p>Error!</p>;
  }

  var course_id = "";
  // Get course_id out of lab_data
  for (let i = 0; i < lab_data.length; i++) {
    if (lab_data[i].lab_num.toString() === lab_num) {
      course_id = lab_data[i].course_id;
    }
  }
  // Remove the underline and make the letters all caps
  var course_name = course_id.replace(/_/g, " ");
  course_name = course_name.toUpperCase()

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
            <strong>{student_name}</strong>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default StudentLabDetails;
