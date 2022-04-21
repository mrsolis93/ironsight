import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ course_id, course_name, course_thumbnail }) => {
  var course_id_friendly = course_name.split(" -")[0];

  return (
    <div>
    <Link to={`/course_details/${course_id}`}>
      {/* Course Card */}
      <div className="card md:w-96 bg-base-100 shadow-xl">
        <figure>
          <img
            className="object-cover h-48 min-w-full"
            src={course_thumbnail}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{course_name}</h2>
          <p>{course_id_friendly}</p>
        </div>
      </div>
    </Link>
    </div>

  );
};

export default CourseCard;
