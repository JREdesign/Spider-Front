import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // Usa la variable de entorno

// Función para obtener el total de trabajos en la ubicación seleccionada
export const getLocationTotalJobs = async (selectedMeshId) => {
  const url = `${API_URL}/jobs/?location=${selectedMeshId}`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    return data.length; // Devuelve la longitud de los datos como el total de trabajos
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

// Función para obtener la compañía con más ofertas junior en la ubicación seleccionada
export const getCompanyWithMostJuniorOffers = async (selectedMeshId) => {
  const url = `${API_URL}/jobs/?location=${selectedMeshId}&junior=true`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    const companyCounts = data.reduce((counts, offer) => {
      counts[offer.company] = (counts[offer.company] || 0) + 1;
      return counts;
    }, {});

    let maxOffers = 0;
    let companyWithMostOffers;

    for (const company in companyCounts) {
      if (companyCounts[company] > maxOffers) {
        maxOffers = companyCounts[company];
        companyWithMostOffers = company;
      }
    }

    // Verificar si companyWithMostOffers es undefined y devolver "N/A" en ese caso
    if (!companyWithMostOffers) {
      return "N/A";
    }

    return companyWithMostOffers;
  } catch (error) {
    console.error("Error:", error);
    return "N/A"; // Si hay un error, devuelve "N/A"
  }
};

// Función para obtener la tecnología más repetida en la ubicación seleccionada
export const getMostRepeatedTechnology = async (selectedMeshId) => {
  const url = `${API_URL}/jobs/?location=${selectedMeshId}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    // Crear un objeto para contar la cantidad de veces que se repite cada tecnología
    const technologyCounts = data.reduce((counts, offer) => {
      offer.technologies.forEach((technology) => {
        counts[technology] = (counts[technology] || 0) + 1;
      });
      return counts;
    }, {});

    let maxCount = 0;
    let mostRepeatedTechnology;

    // Encontrar la tecnología que más se repite
    for (const technology in technologyCounts) {
      if (technologyCounts[technology] > maxCount) {
        maxCount = technologyCounts[technology];
        mostRepeatedTechnology = technology;
      }
    }

    // Si no se encuentra ninguna tecnología repetida, devolver una tecnología vacía
    if (!mostRepeatedTechnology) {
      return {
        technology: "",
        count: 0,
      };
    }

    return {
      technology: mostRepeatedTechnology,
      count: maxCount,
    };
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
