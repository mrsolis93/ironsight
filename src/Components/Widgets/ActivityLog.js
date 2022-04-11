import React from "react";
import { useQuery } from "react-query";
import { getActivityLog } from "../../IronsightAPI";
import LinearProgress from "@mui/material/LinearProgress";

const ActivityLog = () => {
  const { data, isLoading, isError } = useQuery(
    "activity_log",
    getActivityLog,
    {
      refetchInterval: 15000,
    }
  );

  if (isLoading) {
    return <LinearProgress />;
  }

  if (isError) {
    return <p>Error!</p>;
  }

  console.log(data);

  const get_activity_log = () => {
    return data.map(({ log_id, log_timestamp, log_username, log_activity }) => (
      <tr key={log_id}>
        <th>.</th>
        <td>{log_timestamp}</td>
        <td>{log_username}</td>
        <td>{log_activity}</td>
      </tr>
    ));
  };
  const activity_log = get_activity_log();

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Timestamp</th>
            <th>User</th>
            <th>Activity</th>
          </tr>
        </thead>
        <tbody>{activity_log}</tbody>
      </table>
    </div>
  );
};

export default ActivityLog;
