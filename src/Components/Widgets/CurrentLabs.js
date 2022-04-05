import React from "react";

const CurrentLabs = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Class</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover">
            <th>1</th>
            <td>Cicada 3301 Puzzle</td>
            <td>CSCI 458</td>
          </tr>

          <tr className="hover">
            <th>2</th>
            <td>Linux Terminal Basics</td>
            <td>CSCI 440</td>
          </tr>

          <tr className="hover">
            <th>3</th>
            <td>Machine Learning</td>
            <td>CSCI 101</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CurrentLabs;
