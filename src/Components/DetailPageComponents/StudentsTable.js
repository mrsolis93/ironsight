import React from "react";
import "../../App.css";
import { useQuery } from "react-query";
import { getUsersList } from "../../IronsightAPI";
import { Link } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";

const StudentsTable = ({ course_id, sub_tag }) => {
  const { data, isLoading, isError } = useQuery("users_list", getUsersList);

  if (isLoading) {
    return <LinearProgress />;
  }

  if (isError) {
    return <p>Error!</p>;
  }

  // User data comes back like this:
  // {
  //     "user_name": "augustine_solis",
  //     "first_name": "augustine",
  //     "last_name": "solis",
  //     "tags": [
  //         {
  //             "tag": "user",
  //             "type": "role"
  //         }
  //     ],
  //     "profile_pic_data": null,
  //     "virtual_machines": []
  // }

  var raw_student_data = [];

  //   Filter the data to only include students in this class
  // TODO: Implement this feature
  //   for (var i = 0; i < data.length; i++) {
  //     for (var j = 0; j < data[i]["tags"].length; j++) {
  //       if (data[i]["tags"][j]["tag"] === sub_tag) {
  //         raw_student_data.push(data[i]);
  //       }
  //     }
  //   }

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
    }
    else {
        profile_pic_data = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png";
    }
    var student_major = "";
    for (let i = 0; i < student.tags.length; i++) {
        if (student.tags[i]["type"] === "major") {
            student_major = student.tags[i]["tag"];
        }
    }
    
    return (
      <tr key={student.user_name} className="hover">
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img
                  src={profile_pic_data}
                  alt="User Avatar"
                />
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
                <div className="text-sm opacity-50">
                  {student_major}
                </div>
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
