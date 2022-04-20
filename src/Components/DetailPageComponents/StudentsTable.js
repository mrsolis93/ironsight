import React from "react";
import "../../App.css";
import { useQuery } from "react-query";
import { getUsersList, getTags } from "../../IronsightAPI";
import { Link } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";

const StudentsTable = ({ course_id }) => {
  const { data, isLoading, isError } = useQuery("users_list", getUsersList);
  const {
    data: tags_data,
    isLoading: isLoading_tags,
    isError: isError_tags,
  } = useQuery("tags_list", getTags);

  if (isLoading || isLoading_tags) {
    return <LinearProgress />;
  }

  if (isError || isError_tags) {
    return <p>Error!</p>;
  }

  var majors = [];
  for (let i = 0; i < tags_data.length; i++) {
    if (tags_data[i].type === "major") {
      majors.push(tags_data[i].tag);
    }
  }

  var raw_student_data = [];
  // Pull in all students and display them on the table
  raw_student_data = data;
  var table_html = raw_student_data.map(function (student) {
    // Capitalize the first letter of the first name
    var first_name =
      student.first_name.charAt(0).toUpperCase() + student.first_name.slice(1);
    // Capitalize the first letter of the last name
    var last_name =
      student.last_name.charAt(0).toUpperCase() + student.last_name.slice(1);
    var student_email = student.user_name + "@leomail.tamuc.edu";
    // Check the tags to see if the student is a student or a professor
    var user_role = student.roles[0];
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
      for (let j = 0; j < majors.length; j++) {
        if (student.tags[i] === majors[j]) {
          student_major = majors[j];
          // Capitalize the first letter of each word in the major
          var major_words = student_major.split(" ");
          var capitalized_major_words = [];
          for (let k = 0; k < major_words.length; k++) {
            capitalized_major_words.push(
              major_words[k].charAt(0).toUpperCase() + major_words[k].slice(1)
            );
          }
          student_major = capitalized_major_words.join(" ");
        }
      }
    }

    return (
      <tr key={student.user_name} className="hover">
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={profile_pic_data} alt="User Avatar" />
              </div>
            </div>
            <div>
              <Link
                to={"/course_details/" + course_id + "/" + student.user_name}
                key={student.user_name + "_link"}
              >
                <div className="font-bold">
                  {first_name} {last_name}
                </div>
                <div className="text-sm opacity-50">{student_major}</div>
              </Link>
            </div>
          </div>
        </td>
        <td>{student_email}</td>
        <td>********</td>
        <td>{user_role}</td>
      </tr>
    );
  });

  //   Take the raw JSON and turn it into the rows of the table
  var student_name = "";

  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        {/* <!-- head --> */}
        <thead>
          <tr>
            <td>Name</td>
            <th>Email</th>
            <th>Student ID</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>{table_html}</tbody>
      </table>
    </div>
  );
};

export default StudentsTable;
