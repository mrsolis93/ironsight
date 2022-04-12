import React from "react";
import "../../App.css";
import Navbar from "../../Components/Navbar";
import { useParams } from "react-router-dom";

function VMDetails() {
  const { vm_name } = useParams();
  console.log("vm_name: " + vm_name);
  return (
    <div className="virtual_machines">
      <Navbar />
      <h2>Virtual Machine Name: {vm_name}</h2>
    </div>
  );
}

export default VMDetails;
