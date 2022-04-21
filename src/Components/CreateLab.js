import React from "react";
import "../App.css";
import LinearProgress from "@mui/material/LinearProgress";
import { getCourseList } from "../IronsightAPI";
import { useQuery } from "react-query";
import { handleEvent } from "../IronsightAPI";
import CircularProgress from "@mui/material/CircularProgress";

const CreateLab = () => {
  const {
    data: course_data,
    isLoading: isLoadingCourses,
    isError: isErrorCourses,
  } = useQuery("course_list", getCourseList);
  const [submitStatus, setSubmitStatus] = React.useState("");

  if (isLoadingCourses) {
    return <LinearProgress />;
  }
  if (isErrorCourses) {
    return <p>Error!</p>;
  }

  // Function to print out JSON of selected courses and roles, firstname, lastname, etc.
  const get_lab_data = () => {
    setSubmitStatus("submitting");
    // Create a JSON object to hold the lab data
    var event_data = {
      action: "create",
      type: "lab",
      data: {
        lab_name: "Dummy Test Practice",
        lab_description: "This is a lab for test dummies",
        vm_templates: ["debian11"],
        course: "csci_999",
        date_start: "2022-04-02 00:00:00",
        date_end: "2022-04-29 23:59:00",
        tags: ["linux"],
      },
    };
    // Submit the event to the API and get the response
    handleEvent(event_data).then((response) => {
      // If the response is successful, set the submit status to success
      if (response.status === "success") {
        setSubmitStatus("success");
        // Alert the lab that the lab was created
        alert("Success");
      }
      // If the response is not successful, set the submit status to error
      else {
        setSubmitStatus(response.status);
      }
      console.log(response);
    });
  };

  const handleSubmit = () => {
    get_lab_data();
  };

  return (
    <div>
      {submitStatus === "submitting" ? (
        <div className="m-4">
          <CircularProgress />
        </div>
      ) : (
        <button className="btn btn-primary m-4" onClick={handleSubmit}>
          Create Test Lab
        </button>
      )}
    </div>
  );
};

export default CreateLab;
