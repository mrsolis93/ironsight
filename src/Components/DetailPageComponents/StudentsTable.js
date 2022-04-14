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
  //             "type": "role",
  //             "tag_id": 7
  //         }
  //     ],
  //     "password": "$6$rounds=4096$BN9N/Istfglu2Ogc$eVjEb7G8ZfCZ/j7YGFVlqwnxISruvQacR1rdxgf7Pw85pWRhVr0qovCTrKC31qtzf/DPnj5OYs24su5U9uesK1",
  //     "profile_pic_data": null,
  //     "virtual_machines": []
  // }

  var raw_student_data = [];
  for (var i = 0; i < data.length; i++) {
    for (var j = 0; j < data[i]["tags"].length; j++) {
      if (data[i]["tags"][j]["tag"] === sub_tag) {
        raw_student_data.push(data[i]);
      }
    }
  }

  //   Take the raw JSON and turn it into the rows of the table
  var student_name = "";

  return (
    <div class="overflow-x-auto w-full">
      <table class="table w-full">
        {/* <!-- head --> */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Student ID</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {/* <!-- row 1 --> */}
          <tr className="hover">
            <td>
              <div class="flex items-center space-x-3">
                <div class="avatar">
                  <div class="mask mask-squircle w-12 h-12">
                    <img
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
                      alt="User Avatar"
                    />
                  </div>
                </div>
                <div>
                  <Link
                    to={"/user_details/" + "tyler_harrison"}
                    key={"tyler_harrison"}
                  >
                    <div class="font-bold">Tyler Harrison</div>
                    <div class="text-sm opacity-50">
                      Computer Information Systems
                    </div>
                  </Link>
                </div>
              </div>
            </td>
            <td><a href="mailto:tharrison12@leomail.tamuc.edu">tharrison12@leomail.tamuc.edu</a></td>
            <td>********</td>
            <td>Student</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StudentsTable;
