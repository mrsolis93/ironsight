import React from "react";

const OngoingLabs = () => {
  const [lab_list, setLabList] = React.useState([]);
  const get_labs = () => {
    fetch("https://api.rellis.dev/get.php?q=get_labs")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        var lab_list = data.map(function (lab) {
          return (
            <tr key={lab.lab_num} className="hover">
              <th>{lab.lab_num}</th>
              <td>{lab.lab_name}</td>
              <td>CSCI 458</td>
            </tr>
          );
        });
        setLabList(lab_list);
      });
  };
  React.useEffect(() => {
    get_labs();
  }, []);

  return (
    <div className="overflow-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Class</th>
          </tr>
        </thead>
        <tbody>{lab_list}</tbody>
      </table>
    </div>
  );
};

export default OngoingLabs;
