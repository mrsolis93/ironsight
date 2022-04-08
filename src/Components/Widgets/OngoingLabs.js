import React from "react";

const OngoingLabs = () => {
  const [lab_list, setLabList] = React.useState([]);
  const get_labs = () => {
    fetch("https://api.rellis.dev/get.php?q=get_labs")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        var lab_list = data.map(function (lab) {
          // Lab date_start and date_end are in the format of YYYY-MM-DD HH:MM:SS
          // If the lab is ongoing, it is between date_start and date_end
          // If the lab is finished, it is after date_end
          var date_start = new Date(lab.date_start);
          var date_end = new Date(lab.date_end);
          var today = new Date();
          var time_left = date_end - today;
          // Convert to human readable format (days, hours, minutes)
          var time_left_readable = { days: 0, hours: 0, minutes: 0 };
          time_left_readable.days = Math.floor(time_left / (1000 * 60 * 60 * 24));

          if (today >= date_start && today <= date_end) {
            return (
              <tr key={lab.lab_num} className="hover">
                <th>{lab.lab_num}</th>
                <td>{lab.lab_name}</td>
                <td>CSCI 458</td>
                <td>{time_left_readable.days} days</td>
              </tr>
            );
          }
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
            <th>Time Left</th>
          </tr>
        </thead>
        <tbody>{lab_list}</tbody>
      </table>
    </div>
  );
};

export default OngoingLabs;
