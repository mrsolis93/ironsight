export const getVMList = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_SERVER}get_vms`);

  if (!response.ok) {
    throw new Error("Failed to fetch VMs");
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
