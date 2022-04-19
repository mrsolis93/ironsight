import React from "react";
import "../../App.css";
import Navbar from "../../Components/Navbar";
import { useParams } from "react-router-dom";

function StudentLabDetails() {
  const { lab_num, student_name } = useParams();
  console.log("lab_num: " + lab_num);
  console.log("student_name: " + student_name);
  return (
    <div className="labs">
      <Navbar />
      <h2>Lab: {lab_num}</h2>
      <h2>Student: {student_name}</h2>
    </div>
  );
}

export default StudentLabDetails;
