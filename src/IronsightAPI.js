export const getVMList = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_SERVER}get.php?q=get_vms`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch VMs");
  }
  return response.json();
};

export const getLabList = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_SERVER}get.php?q=get_labs`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch labs");
  }
  return response.json();
};

export const getNewsList = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_SERVER}get.php?q=get_news`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }
  return response.json();
};

export const getDocCount = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_SERVER}get.php?q=%27{%22size%22:100,%22aggs%22:{%22hostnames%22:{%22terms%22:{%22field%22:%22host.name%22,%22size%22:100}}}}%27`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch doc count");
  }
  return response.json();
};

export const getCPUUsage = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_SERVER}get.php?q=get_cpu_usage&step=5`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch CPU usage");
  }
  return response.json();
};

export const getNetworkUsage = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_SERVER}get.php?q=get_network_usage&step=5`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch network usage");
  }
  return response.json();
};

export const getMemoryUsage = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_SERVER}get.php?q=get_memory_usage&step=5`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch memory usage");
  }
  return response.json();
};

export const getDiskUsage = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_SERVER}get.php?q=get_disk_usage&step=5`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch disk usage");
  }
  return response.json();
};

export const getNumVMsOn = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_SERVER}get.php?q=get_num_vms_on`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch number of VMs on");
  }
  return response.json();
};

export const getNumVMs = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_SERVER}get.php?q=get_num_vms`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch number of VMs");
  }
  return response.json();
};

export const getVMsOn = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_SERVER}get.php?q=get_vms_on`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch list of VMs on");
  }
  return response.json();
};

export const getLabOverview = async ({ queryKey }) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_SERVER}get.php?q=get_lab_overview&lab_num=${queryKey[1]}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch lab overview data for ");
  }
  return response.json();
};

export const getClassList = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_SERVER}get.php?q=get_classes`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch class list");
  }
  return response.json();
};

export const getHarvesterVMList = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_SERVER}get.php?q=get_harvester_vms`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch harvester VM list");
  }
  return response.json();
};

export const getActivityLog = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_SERVER}log_data.php`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch activity log");
  }
  return response.json();
};

export const postActivityLog = (username, activity) => {
  return fetch(`${process.env.REACT_APP_API_SERVER}log_data.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // Timestamp in YYYY-MM-DD HH:MM:SS format
      timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
      username: username,
      activity: activity,
    }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to post activity log");
    }
    return response.json();
  });
};

export const powerOnVM = async ({ queryKey }) => {
  if (queryKey[1] === "") {
    return { error: "No VM specified" };
  }
  const response = await fetch(
    `${process.env.REACT_APP_API_SERVER}get.php?q=power_on_vm&vm_name=${queryKey[1]}`
  );
  if (!response.ok) {
    throw new Error("Failed to power on VM " + queryKey[1]);
  }
  return response.json();
};

export const authenticate = (username, password) => {
  console.log("Authenticating...");
  try {
    return fetch(`${process.env.REACT_APP_API_SERVER}authenticate.php`, {
      method: "POST",
      headers: {},
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => response.json())
      .then((status) => {
        return status.status;
      });
  } catch (error) {
    console.log(error);
    alert(error);
  }
};
