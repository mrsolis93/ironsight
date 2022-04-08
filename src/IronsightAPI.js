export const getVmList = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_SERVER}get_vms`);

  if (!response.ok) {
    throw new Error("Failed to fetch VMs");
  }
  return response.json();
};
