import axios from "axios";

const baseURL = `${import.meta.env.VITE_API_URL}/jobs/`;

const fetchData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const getJuniorOffersByTechnology = async (cylinderName) => {
  const url = `${baseURL}?technologies=${cylinderName}&junior=true`;
  const data = await fetchData(url);
  return data ? data.length : null;
};

export const getRemoteOffersByTechnology = async (cylinderName) => {
  const url = `${baseURL}?technologies=${cylinderName}&location=remoto`;
  const data = await fetchData(url);
  return data ? data.length : null;
};

export const getEnglishOffersByTechnology = async (cylinderName) => {
  const url = `${baseURL}?technologies=${cylinderName}&english=true`;
  const data = await fetchData(url);
  return data ? data.length : null;
};

export const getTotalTechs = async (cylinderName) => {
  const url = `${baseURL}?technologies=${cylinderName}`;
  const data = await fetchData(url);
  return data ? data.length : null;
};

export const getMostCommonLocation = async (cylinderName) => {
  const url = `${baseURL}?technologies=${cylinderName}`;
  const data = await fetchData(url);

  if (!data) return null;

  const locationCount = {};
  data.forEach((job) => {
    const location = job.location;
    locationCount[location] = (locationCount[location] || 0) + 1;
  });

  let mostCommonLocation = "";
  let maxCount = 0;
  for (const [location, count] of Object.entries(locationCount)) {
    if (count > maxCount) {
      mostCommonLocation = location;
      maxCount = count;
    }
  }

  return { location: mostCommonLocation, count: maxCount };
};
