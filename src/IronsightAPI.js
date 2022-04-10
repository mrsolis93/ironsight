export const getVMList = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_SERVER}get_vms`);

  if (!response.ok) {
    throw new Error("Failed to fetch VMs");
  }
  return response.json();
};

export const getLabList = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_SERVER}get_labs`);

  if (!response.ok) {
    throw new Error("Failed to fetch labs");
  }
  return response.json();
};

export const getNewsList = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_SERVER}get_news`);

  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }
  return response.json();
};

export const getDocCount = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_SERVER}%27{%22size%22:100,%22aggs%22:{%22hostnames%22:{%22terms%22:{%22field%22:%22host.name%22,%22size%22:100}}}}%27`);

  if (!response.ok) {
    throw new Error("Failed to fetch doc count");
  }
  return response.json();
};

export const getCPUUsage = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_SERVER}get_cpu_usage&step=5`);
  if (!response.ok) {
    throw new Error("Failed to fetch CPU usage");
  }
  return response.json();
};

export const getNetworkUsage = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_SERVER}get_network_usage&step=5`);
  if (!response.ok) {
    throw new Error("Failed to fetch network usage");
  }
  return response.json();
};
