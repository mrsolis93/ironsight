import React from "react";
import "../../App.css";
import Navbar from "../../Components/Navbar";
import { useQuery } from "react-query";
import { useParams, Link } from "react-router-dom";
import { getCourseList } from "../../IronsightAPI";
import LinearProgress from "@mui/material/LinearProgress";
import { RiArrowRightSLine } from "react-icons/ri";
import LabTable from "../../Components/DetailPageComponents/LabsTable";
import StudentTable from "../../Components/DetailPageComponents/StudentsTable";
import VirtualMachinesTable from "../../Components/DetailPageComponents/VirtualMachinesTable";

function CourseDetails() {
  const { course_id } = useParams();
  const { data, isLoading, isError } = useQuery("course_list", getCourseList);
  const [selectedTab, setSelectedTab] = React.useState("labs");

  if (isLoading) {
    console.log("[Ironsight] Fetching Course Data...");
    return <LinearProgress />;
  }

  if (isError) {
    return <p>Error!</p>;
  }

  const set_selected_tab = (tab) => {
    setSelectedTab(tab);
  };

  // Retrieve friendly name for course rather than the course id
  var course_name = "";
  var sub_tag = "";
  for (var i = 0; i < data.length; i++) {
    if (data[i].sub_tag.replace(" ", "_").toLowerCase() === course_id) {
      course_name = data[i].tag;
      sub_tag = data[i].sub_tag;
    }
  }

  return (
    <div className="courses">
      <Navbar />

      {/* Top bar (breadcrumbs) */}
      <div className="text-md breadcrumbs m-4">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/courses">Courses</Link>
          </li>
          <li>
            <strong>{course_name}</strong>
          </li>
        </ul>
      </div>

      {/* Sidebar with Labs, Students, and Virtual Machines tabs */}
      <div className="grid grid-cols-5 gap-4 m-4 h-[80%]">
        <div className="row-span-1 col-span-5 lg:col-span-1">
          <div className="rounded-box w-full h-full bg-base-100 shadow-xl">
            <div className="sidebar-links">
                  {/* Display rows but highlight the one using selectedTab */}
                  <div className="grid grid-cols-1 grid-flow-row gap-4 mx-4">

                  <button
                    className={
                      selectedTab === "labs"
                      ? "btn btn-primary w-full text-base-900 hover cursor-pointer mt-4"
                      : "btn btn-outline w-full text-base-900 hover cursor-pointer mt-4"
                    }
                    onClick={() => set_selected_tab("labs")}
                    >
                    Labs
                  </button>
                  <button
                    className={
                      selectedTab === "students"
                      ? "btn btn-primary w-full text-base-900 hover cursor-pointer"
                      : "btn btn-outline w-full text-base-900 hover cursor-pointer"
                    }
                    onClick={() => set_selected_tab("students")}
                    >
                    Students
                  </button>
                  <button
                    className={
                      selectedTab === "virtual_machines"
                      ? "btn btn-primary w-full text-base-900 hover cursor-pointer mb-4"
                      : "btn btn-outline w-full text-base-900 hover cursor-pointer mb-4"
                    }
                    onClick={() => set_selected_tab("virtual_machines")}
                    >
                    Virtual Machines
                  </button>
                    </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="rounded-box row-span-1 col-span-5 lg:col-span-4 h-full overflow-auto">
          <div className="w-full h-full bg-base-100 shadow-xl">
            <div className="course-content">
              {/* Display the selected tab */}

              {/* Labs */}
              {selectedTab === "labs" && (
                <LabTable course_id={course_id} sub_tag={sub_tag} />
              )}

              {/* Students */}
              {selectedTab === "students" && (
                <StudentTable course_id={course_id} sub_tag={sub_tag} />
              )}

              {/* Virtual Machines */}
              {selectedTab === "virtual_machines" && (
                <VirtualMachinesTable course_id={course_id} sub_tag={sub_tag} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
