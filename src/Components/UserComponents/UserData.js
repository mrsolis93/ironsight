import React from "react";
import { useQuery } from "react-query";

import {
  getHarvesterVMList,
  getLabList,
  getUsersList,
  getTags,
} from "../../IronsightAPI";

import LinearProgress from "@mui/material/LinearProgress";
import { Link } from "react-router-dom";

const useUserData = () => {
  // State for holding final data

  const { data, isLoading, isError } = useQuery(
    "harvester_vms",
    getHarvesterVMList
  );

  const {
    data: harvester_data,
    isLoading: harvester_isLoading,
    isError: harvester_isError,
  } = useQuery("harvester_vms", getHarvesterVMList);

  const {
    data: lab_data,
    isLoading: lab_isLoading,
    isError: lab_isError,
  } = useQuery("labs", getLabList);

  const {
    data: tags_data,
    isLoading: isLoading_tags,
    isError: isError_tags,
  } = useQuery("tags_list", getTags);

  const {
    data: users_data,
    isLoading: users_isLoading,
    isError: users_isError,
  } = useQuery("users_list", getUsersList);

  if (
    isLoading ||
    harvester_isLoading ||
    lab_isLoading ||
    users_isLoading ||
    isLoading_tags
  ) {
    return;
  }

  if (
    isError ||
    harvester_isError ||
    lab_isError ||
    users_isError ||
    isError_tags
  ) {
    return;
  }

  if (!users_data) {
    return;
  }

  const get_vm_list_length = () => {
    return data.length;
  };
  const vm_list_length = get_vm_list_length();

  const get_labs_list_length = () => {
    return lab_data.length;
  };
  const labs_length = get_labs_list_length();

  var majors = [];
  for (let i = 0; i < tags_data.length; i++) {
    if (tags_data[i].type === "major") {
      majors.push(tags_data[i].tag);
    }
  }

  var raw_student_data = users_data;
  var student_major = "";
  // Pull in all students and display them on the table

  var table_data = raw_student_data.map(function (student) {
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

    return {

      first_name: first_name,
      last_name: last_name,
      user_name: student.user_name,
      student_email: student_email,
      student_major: student_major,
      user_role: user_role,
      profile_pic_data: profile_pic_data,
    };
  });

  //TEST push data from the API to an array for the table

  console.log("UD Table Data: ");
  console.log(table_data);

  // return useUserData in the form of an table_data array
  return table_data;
};

export default useUserData;
