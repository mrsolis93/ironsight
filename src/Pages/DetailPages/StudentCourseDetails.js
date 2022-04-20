import React from "react";
import "../../App.css";
import Navbar from "../../Components/Navbar";
import { useParams } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getUsersList, getCourseList } from "../../IronsightAPI";
import LabTable from "../../Components/DetailPageComponents/LabsTable";
import VirtualMachineTable from "../../Components/DetailPageComponents/VirtualMachinesTable";

function StudentCourseDetails() {
  const { course_id, student_name } = useParams();
  const {
    data: user_data,
    isLoading_user,
    isError_user,
  } = useQuery("users_list", getUsersList);
  const {
    data: course_data,
    isLoading_course,
    isError_course,
  } = useQuery("course_list", getCourseList);
  var [selectedTab, setSelectedTab] = React.useState("labs");

  if (isLoading_user || isLoading_course) {
    return <LinearProgress />;
  }

  if (isError_user || isError_course) {
    return <p>Error!</p>;
  }

  var raw_student_data = user_data.map(function (student) {
    // Capitalize the first letter of the first name
    var first_name =
      student.first_name.charAt(0).toUpperCase() + student.first_name.slice(1);
    // Capitalize the first letter of the last name
    var last_name =
      student.last_name.charAt(0).toUpperCase() + student.last_name.slice(1);
    var student_email = student.user_name + "@leomail.tamuc.edu";
    // Check the tags to see if the student is a student or a professor
    var user_role = "";
    for (let i = 0; i < student.tags.length; i++) {
      if (student.tags[i]["type"] === "role") {
        user_role = student.tags[i]["tag"];
      }
    }
    // Check for a link to a profile picture
    var profile_pic_data = "";
    if (student.profile_pic_data !== null) {
      profile_pic_data = student["profile_pic_data"];
    } else {
      profile_pic_data =
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png";
    }
    var student_major = "";
    for (let i = 0; i < student.tags.length; i++) {
      if (student.tags[i]["type"] === "major") {
        student_major = student.tags[i]["tag"];
      }
    }
    // Return a list of student data
    return {
      first_name: first_name,
      last_name: last_name,
      user_name: student.user_name,
      user_role: user_role,
      profile_pic_data: profile_pic_data,
      student_major: student_major,
    };
  });

  // Filter the data to only include this student
  var student_data = {};
  for (var i = 0; i < raw_student_data.length; i++) {
    if (raw_student_data[i]["user_name"] === student_name) {
      student_data = raw_student_data[i];
    }
  }

  // Retrieve friendly name for course rather than the course id
  var course_name = "";
  var sub_tag = "";
  for (var i = 0; i < course_data.length; i++) {
    if (course_data[i].sub_tag.replace(" ", "_").toLowerCase() === course_id) {
      course_name = course_data[i].tag;
      sub_tag = course_data[i].sub_tag;
    }
  }

  return (
    <div className="course_details">
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
            <Link to={`/course_details/${course_id}`}>{course_name}</Link>
          </li>
          <li>
            <strong>
              {student_data.first_name} {student_data.last_name}
            </strong>
          </li>
        </ul>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 grid-flow-row m-4 gap-4 h-full">
        <div className="col-span-1 w-full">
          <div className="rounded-box bg-base-100 h-full">
            {/* Profile picture, firstname lastname, etc */}
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-center">
                <img
                  src={student_data.profile_pic_data}
                  alt="User Avatar"
                  className="rounded-full w-32 h-32 mt-4"
                />
              </div>
              <div className="text-center">
                <div className="text-lg font-bold">
                  {student_data.first_name} {student_data.last_name}
                </div>
                <div className="text-sm opacity-50 mb-4">Computer Science</div>
              </div>
              <div className="sidebar-links w-full">
                {/* Display rows but highlight the one using selectedTab */}
                <div className="grid grid-cols-2 lg:grid-cols-1 grid-flow-row gap-4 mx-4">
                  <button
                    className={
                      selectedTab === "labs"
                        ? "btn btn-primary w-full text-base-900 hover cursor-pointer mt-4 mb-4 lg:mb-0"
                        : "btn btn-outline w-full text-base-900 hover cursor-pointer mt-4 mb-4 md:mb-0"
                    }
                    onClick={() => setSelectedTab("labs")}
                  >
                    Labs
                  </button>
                  <button
                    className={
                      selectedTab === "virtual_machines"
                        ? "btn btn-primary w-full text-base-900 hover cursor-pointer mb-4 mt-4 lg:mt-0"
                        : "btn btn-outline w-full text-base-900 hover cursor-pointer mb-4 mt-4 lg:mt-0"
                    }
                    onClick={() => setSelectedTab("virtual_machines")}
                  >
                    Virtual Machines
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 lg:col-span-3">
          <div className="rounded-box bg-base-100 h-full">
            {/* Lab overview */}
            <div className="page-content">
              {selectedTab === "labs" ? (
              <LabTable sub_tag={sub_tag} student_name={student_name} />
              ) : (
                <VirtualMachineTable sub_tag={sub_tag} student_name={student_name} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentCourseDetails;