import React from "react";
import "../App.css";
import Navbar from "../Components/Navbar";
import { useQuery } from "react-query";
import { getLabList } from "../IronsightAPI";
import LinearProgress from "@mui/material/LinearProgress";
import { Link } from "react-router-dom";
import ClassList from "../Components/ClassList";

function Labs() {
  const { data, isLoading, isError } = useQuery("lab_list", getLabList);

  if (isLoading) {
    console.log("[Ironsight] Fetching Lab Data...");
    return <LinearProgress />;
  }

  if (isError) {
    return <p>Error!</p>;
  }

  var lab_list = data.map(function (lab) {
    return (
      <tr key={lab.lab_num} className="hover">
        <td>{lab.lab_num}</td>
        <td>
        <Link
              className="w-full"
              to={"/lab_details/" + lab.lab_num}
              key={lab.lab_num}
            >
          <div className="flex items-center space-x-3">
            <div>
              <div className="font-bold">{lab.lab_name}</div>
            </div>
          </div>
          </Link>
        </td>
        <td>
          <div>
            {/* <p>Back in 2012, there was an internet phenomenon known as Cicada 3301. It was a worldwide puzzle/mystery that remains unsolved to this day. Cicada 3301 has been described as “the most baffling and enigmatic mystery on the Internet”. On three occasions, Cicada 3301 has posted spectacular puzzles on the internet and dark web, with the stated intent of "recruiting intelligent individuals". There has been much speculation and theories about Cicada 3301, including that they are recruitment tools for the NSA, MI6, Illuminati, a cult, or a hacker group. Many first thought Cicada 3301 was an Alternate Reality Game, but still very few known where this rabbit hole leads to. Those who do have disappeared from the internet.</p> */}
            <p className="w-96 md:w-full relative overflow-x-auto break-words whitespace-normal max-h-24">
              {lab.lab_description}
            </p>
          </div>
        </td>
        <td>{lab.date_start}</td>
        <td>{lab.date_end}</td>
      </tr>
    );
  });

  return (
    <div className="labs">
      <Navbar />
      {/* Card 1 */}
      <div className="row_1 flex md:flex-row flex-col">
   

        <input type="checkbox" id="my-modal-5" className="modal-toggle" />
        <label htmlFor="my-modal-5" className="modal cursor-pointer">
          <label
            className="modal-box xl:w-4/5 max-w-full max-h-full"
            htmlFor=""
          >
            <label
              htmlFor="my-modal-5"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>

            <div className="mb-3">
              <h1 className="card-title">
                Systems Analysis and Design
              </h1>
            </div>
            <div className="overflow-x-auto w-full">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Lab#</th>
                    <th>Lab Name</th>
                    <th>Description</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                  </tr>
                </thead>
                <tbody>
                  {lab_list}
                </tbody>
              </table>
            </div>
          </label>
        </label>
        {/* imports the cards with the active classes that are currently present in the datatbase */}
        <ClassList />
      </div>
    </div>
  );
}

export default Labs;
