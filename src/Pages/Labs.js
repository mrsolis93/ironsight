import React from "react";
import "../App.css";
import Navbar from "../Components/Navbar";
import { useQuery } from "react-query";
import { getClassList } from "../IronsightAPI";
import LinearProgress from "@mui/material/LinearProgress";
import ClassCard from "../Components/LabComponents/ClassCard";

function Labs() {
  const { data, isLoading, isError } = useQuery("class_list", getClassList);

  if (isLoading) {
    console.log("[Ironsight] Fetching Lab Data...");
    return <LinearProgress />;
  }

  if (isError) {
    return <p>Error!</p>;
  }

  var class_cards = data.map(({ tag, sub_tag }) => (
    <ClassCard key={sub_tag} tag={tag} sub_tag={sub_tag} />
  ));

  return (
    <>
      <Navbar />
    <div className="labs">
      {/* If cards are going to off the screen, make them go into the next column */}
      <div className="flex flex-wrap">
        {class_cards}
      </div>
    </div>
    </>
  );
}

export default Labs;
