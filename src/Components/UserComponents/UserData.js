import React from "react";
import { useQuery } from "react-query";
import { getVMList, getHarvesterVMList, getLabList, getUsersList } from "../../IronsightAPI";
import LinearProgress from "@mui/material/LinearProgress";
import { Link } from "react-router-dom";


// const newUser = () => {

//   return {
//     user: namor.generate({ words: 1, numbers: 0 }),
//     classes: namor.generate({ words: 1, numbers: 0 }),
//     labs: Math.floor(Math.random() * 30),
//     vms: Math.floor(Math.random() * 30),
 
//   }
// }

const useUserData = () => {

    const { data, isLoading, isError } = useQuery("virtual_machines", getVMList);
    const {
      data: harvester_data,
      isLoading: harvester_isLoading,
      isError: harvester_isError,
    } = useQuery("harvester_vms", getHarvesterVMList, {
      refetchInterval: 5000,
    });

    const {
      data: lab_data,
      isLoading: lab_isLoading,
      isError: lab_isError,
    } = useQuery("labs", getLabList, {
      refetchInterval: 5000,
    });

    const {
      data: users_data,
      isLoading: users_isLoading,
      isError: users_isError,
    } = useQuery("users", getUsersList, {
      refetchInterval: 5000,
    });

    if (isLoading || harvester_isLoading || lab_isLoading || users_isLoading) {
      return <LinearProgress />;
    }

    if (isError || harvester_isError || lab_isError || users_isError) {
      return <p>Error!</p>;
    }

    const get_vm_list_length = () => {
  
      return data.length;

    };
    const vm_list_length = get_vm_list_length();



    const get_labs_list_length = () => {

      return lab_data.length;

    };
    const labs_length = get_labs_list_length();



    
    var raw_student_data = [];
      
    raw_student_data = users_data;
    var table_html = raw_student_data.map(function (student) 
    {

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

    });

//TEST push data from the API to an array for the table

 var table_data = [];
  for (let i = 0; i < raw_student_data.length; i++) {
    table_data.push({
      first_name: raw_student_data[i]["first_name"],
      last_name: raw_student_data[i]["last_name"],
      user_name: raw_student_data[i]["user_name"],
      profile_pic_data: raw_student_data[i]["profile_pic_data"],
      student_major: raw_student_data[i]["tags"][1]["tag"],
      user_role: raw_student_data[i]["tags"][0]["tag"],
    });
  }

  console.log("table_data", table_data);

  // return useUserData in the form of an table_data array
  return {
    table_data
  }
}


export default useUserData;
