import React from "react";
import { useQuery } from "react-query";
import LinearProgress from "@mui/material/LinearProgress";
import { getLabList } from "../../IronsightAPI";
import { Link } from "react-router-dom";

const ClassCard = ({ tag, sub_tag }) => {
  const { data, isLoading, isError } = useQuery("lab_list", getLabList);

  if (isLoading) {
    console.log("[Ironsight] Fetching Class Data for " + tag + "...");
    return <LinearProgress />;
  }

  if (isError) {
    return <p>Error!</p>;
  }

  //   Pull in JSON data and add to array if the lab belongs in this class (using sub_tag matching)
  var raw_lab_data = [];
  for (var i = 0; i < data.length; i++) {
    for (var j = 0; j < data[i]["tags"].length; j++) {
      if (data[i]["tags"][j]["tag"] === sub_tag) {
        raw_lab_data.push(data[i]);
      }
    }
  }

  //   Take the raw JSON and turn it into the rows of the table
  var lab_html = raw_lab_data.map(function (lab) {
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

  //   Replace space in sub_tag with underscore
  var modal_id = "modal_" + sub_tag.replace(" ", "_");

  return (
    <div className="master">
      {/* Class Card */}
      <label htmlFor={modal_id} className="modal-button cursor-pointer">
        <div className="card md:w-96 bg-base-100 shadow-xl m-3">
          <figure>
            <img
              className="object-cover h-48 min-w-full"
              src="https://bs-uploads.toptal.io/blackfish-uploads/components/seo/content/og_image_file/og_image/777046/0712-Bad_Practices_in_Database_Design_-_Are_You_Making_These_Mistakes_Dan_Social-754bc73011e057dc76e55a44a954e0c3.png"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{tag}</h2>
            <p>{sub_tag}</p>
          </div>
        </div>
      </label>

      {/* Modal */}
      <input type="checkbox" id={modal_id} className="modal-toggle" />
      <label htmlFor={modal_id} className="modal cursor-pointer">
        <label className="modal-box xl:w-4/5 max-w-full max-h-full" htmlFor="">
          
          {/* X button inside of the modal */}
          <label
            htmlFor={modal_id}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>

          {/* Table inside of the modal */}
          <div className="mb-3">
            <h1 className="card-title">{tag}</h1>
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
              <tbody>{lab_html}</tbody>
            </table>
          </div>
        </label>
      </label>
    </div>
  );
};

export default ClassCard;
