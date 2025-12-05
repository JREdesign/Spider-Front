import { useEffect, useState, useContext } from "react";
import { PaginationProvider } from "../../context/PaginationContext";
import axios from "axios";
import ShowJobs from "./ShowJobs";
import FilterContext from "../../context/FilterContext";
import { locationArray, technologyArray } from "./FilterArrays";

export default function FetchJobs() {
  const { filters, handleFilterChange } = useContext(FilterContext);

  const [jobs, setJobs] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchData();
  }, [filters]);

  const fetchData = async () => {
    try {
      let queryParams = new URLSearchParams();
      for (const filter in filters) {
        switch (filter) {
          case "junior":
          case "english":
          case "verifyHuman":
            if (filters[filter]) {
              queryParams.append(filter, "true");
            }
            break;

          case "location":
            if (filters[filter]) {
              if (filters[filter] === "otherZones") {
                queryParams.append("otherZones", "true");
                queryParams.append("location", ""); // Vaciar la ubicación
              } else {
                queryParams.append("location", filters[filter]);
              }
            }
            break;
          case "technologies":
            if (filters[filter].length > 0) {
              queryParams.append("technologies", filters[filter].join(",")); // Convertir el array de tecnologías a una cadena separada por comas
            }
            break;

          case "date":
            if (filters[filter]) {
              queryParams.append("date", filters[filter]); // Agregar la opción de fecha seleccionada
            } else {
              queryParams.append("date", ""); // Si no se selecciona ninguna fecha, establecer location como vacío
            }
            break;

          case "search":
            if (filters[filter]) {
              queryParams.append("search", filters[filter]); // Agregar la opción de fecha seleccionada
            } else {
              queryParams.append("search", ""); // Si no se selecciona ninguna fecha, establecer location como vacío
            }
            break;
          default:
            break;
        }
      }

      const response = await axios.get(`${apiUrl}/jobs/?${queryParams}`);
      if (response.status === 200) {
        setJobs(response.data);
      } else {
        console.error("Error al obtener los datos");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <>
      <section className="bg-white shadow-lg rounded-lg flex flex-row flex-wrap justify-around container mt-8 mx-auto px-4 py-8 dark:bg-gray800 dark:text-white dark:border-2 dark:border-gray700">
        <input
          className="input placeholder-gray400 w-11/12 rounded-md dark:bg-gray800 dark:text-white dark:placeholder-gray400"
          type="text"
          id="#buscador"
          placeholder="Buscar..."
          value={filters.search}
          onChange={(event) => {
            handleFilterChange("search", event.target.value);
          }}
        />

        <article className="mb-2 mt-4 w-44 h-24 overflow-y-auto">
          {technologyArray.map((technology) => (
            <div key={technology} className="flex items-center ml-2">
              <label className="inline-flex items-center mr-2 dark:text-white">
                <input
                  className="mr-2 w-4 h-4 rounded dark:bg-gray800 dark:border-gray600"
                  type="checkbox"
                  value={technology}
                  checked={filters.technologies.includes(technology)}
                  onChange={(event) => {
                    const { checked, value } = event.target;
                    const updatedTechnologies = checked
                      ? [...filters.technologies, value]
                      : filters.technologies.filter((tech) => tech !== value);
                    handleFilterChange("technologies", updatedTechnologies);
                  }}
                />
                {technology}
              </label>
            </div>
          ))}
        </article>

        <section className="mt-4">
          <article className="mr-4 flex items-center">
            <input
              id="soloJunior" // Asegúrate de agregar el id aquí
              className="mr-2 w-4 h-4 rounded dark:bg-gray800 dark:border-gray600"
              type="checkbox"
              name="soloJunior"
              checked={filters.junior}
              onChange={(event) =>
                handleFilterChange("junior", event.target.checked)
              }
            />
            <label htmlFor="soloJunior" className="dark:text-white">
              Ofertas Junior
            </label>
          </article>

          <article className="mr-4 flex items-center">
            <input
              id="soloEnglish"
              className="mr-2 w-4 h-4 rounded dark:bg-gray800 dark:border-gray600"
              type="checkbox"
              name="soloEnglish"
              checked={filters.english}
              onChange={(event) =>
                handleFilterChange("english", event.target.checked)
              }
            />
            <label htmlFor="soloEnglish" className="dark:text-white">
              Ofertas con inglés requerido
            </label>
          </article>
          <article className="mr-4 flex items-center">
            <input
              id="soloVerifyHuman"
              className="mr-2 w-4 h-4 rounded dark:bg-gray800 dark:border-gray600"
              type="checkbox"
              name="soloVerifyHuman"
              checked={filters.verifyHuman}
              onChange={(event) =>
                handleFilterChange("verifyHuman", event.target.checked)
              }
            />
            <label htmlFor="soloVerifyHuman" className="dark:text-white">
              Ofertas verificadas por humanos
            </label>
          </article>
        </section>

        <article className="mt-4 w-40">
          <label htmlFor="locationFilter" className="dark:text-gray800 text-white absolute top-0">.</label>
          <select
            id="locationFilter" // ID asociado con la etiqueta
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray800 dark:text-white dark:border-gray600"
            value={filters.location}
            onChange={(event) => {
              if (event.target.value === "location") {
                handleFilterChange("otherZones", true);
              } else if (event.target.value === "Ubicación") {
                handleFilterChange("location", "");
              } else {
                handleFilterChange("location", event.target.value);
              }
            }}
          >
            {locationArray.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
            <option value="otherZones">Otras zonas</option>
          </select>
        </article>

        <article>
          <label htmlFor="dateFilter"className="dark:text-gray800 text-white absolute top-0">.</label>
          <select
            id="dateFilter" // ID asociado con la etiqueta
            value={filters.date}
            onChange={(e) => handleFilterChange("date", e.target.value)}
            className="mt-4 rounded-md dark:bg-gray800 dark:text-white dark:border-gray600"
          >
            <option value="">Seleccione la fecha</option>
            <option value="24h">Últimas 24 horas</option>
            <option value="7d">Últimos 7 días</option>
            <option value="14d">Últimos 14 días</option>
          </select>

        </article>

      </section>
      <h2 className="mt-8 ml-12 text-2xl font-bold text-orange dark:text-gray300 hover:text-gray700 cursor-pointer">De lo que buscas tenemos {jobs.length} ofertas:</h2>


      <PaginationProvider jobs={jobs}>
        <ShowJobs />
      </PaginationProvider>
    </>
  );
}
