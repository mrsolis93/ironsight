import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const CourseCard = ({ tag, sub_tag, image_link }) => {
  return (
    <div className="master">
      {/* Course Card */}
      <div className="card md:w-96 bg-base-100 shadow-xl">
        <figure>
          <img
            className="object-cover h-48 min-w-full"
            src={image_link}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{tag}</h2>
          <p>{sub_tag}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
