import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CompEditData = () => {
  const { jobId } = useParams();  // Asegúrate de que estás extrayendo correctamente el jobId de los parámetros
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [salary, setSalary] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [url, setUrl] = useState("");
  const [site, setSite] = useState("");
  const [verifyHuman, setVerifyHuman] = useState(false);
  const [junior, setJunior] = useState(false);
  const [english, setEnglish] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${apiUrl}/jobs/${jobId}`);
      const { title, company, location, description, publicationDate, thumbnail, salary, technologies, url, site, verifyHuman, junior, english } = result.data;
      setTitle(title);
      setCompany(company);
      setLocation(location);
      setDescription(description);
      setPublicationDate(new Date(publicationDate).toISOString().substring(0, 10)); // Formatear la fecha correctamente para el input tipo date
      setThumbnail(thumbnail);
      setSalary(salary);
      setTechnologies(technologies.join(", "));
      setUrl(url);
      setSite(site);
      setVerifyHuman(verifyHuman);
      setJunior(junior);
      setEnglish(english);
    };
    fetchData();
  }, [jobId, apiUrl]);

  const updateJob = async (e) => {
    e.preventDefault();
    const techArray = technologies.split(",").map(tech => tech.trim()); // Convertir string de tecnologías a array
    try {
      const response = await axios.patch(`${apiUrl}/jobs/${jobId}`, {
        title,
        company,
        location,
        description,
        publicationDate,
        thumbnail,
        salary,
        technologies: techArray,
        url,
        site,
        verifyHuman,
        junior,
        english,
      });
      if (response.status === 200) {
        alert("Empleo actualizado con éxito");
        navigate("/");
      } else {
        console.error("Error al actualizar el empleo:", response.data);
        alert("No se pudo actualizar el empleo");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud de actualización:", error);
      alert("No se pudo actualizar el empleo");
    }
  };

  return (
    <div className="bg-gray100 flex items-center justify-center min-h-screen" style={{ marginTop: "-70px" }}>
      <div className="max-w-4xl w-full bg-white dark:bg-gray600 shadow-lg p-8 rounded-md">
        <h1
          className="bg-orange  dark:bg-gray900 text-3xl font-bold mb-8 text-center text-white p-4 rounded-t-lg"
        >
          Editar registro de empleo
        </h1>
        <form onSubmit={updateJob} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <input
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="border border-gray800 dark:bg-gray600 p-2 rounded-md"
            />
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              type="text"
              className="border border-gray800 dark:bg-gray600 p-2 rounded-md"
            />
            <input
              placeholder="Ubicación"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              className="border border-gray800 dark:bg-gray600 p-2 rounded-md"
            />
            <input
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              type="text"
              className="border border-gray800 dark:bg-gray600 p-2 rounded-md"
            />
            <input
              placeholder="Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              className="border border-gray800 dark:bg-gray600 p-2 rounded-md"
            />
            <input
              value={publicationDate}
              onChange={(e) => setPublicationDate(e.target.value)}
              type="date"
              className="border border-gray800 dark:bg-gray600 p-2 rounded-md"
            />
            <input
              placeholder="Salario"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              type="text"
              className="border border-gray800 dark:bg-gray600 p-2 rounded-md"
            />
            <input
              placeholder="Tecnologías (separadas por comas)"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              type="text"
              className="border border-gray800 dark:bg-gray600 p-2 rounded-md"
            />
            <input
              placeholder="URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              type="text"
              className="border border-gray800 dark:bg-gray600 p-2 rounded-md"
            />
            <input
              value={site}
              onChange={(e) => setSite(e.target.value)}
              type="text"
              className="border border-gray800 dark:bg-gray600 p-2 rounded-md"
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="verifyhuman"
                checked={verifyHuman}
                onChange={(e) => setVerifyHuman(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <label htmlFor="verifyhuman" className="ml-2">Verificar oferta</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="junior"
                checked={junior}
                onChange={(e) => setJunior(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <label htmlFor="junior" className="ml-2">Junior</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="english"
                checked={english}
                onChange={(e) => setEnglish(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <label htmlFor="english" className="ml-2">Inglés</label>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button
              className="bg-orange dark:bg-gray700 dark:bg-gray900 text-white font-bold py-2 px-4 rounded-md hover:bg-gray600"
            >
              Actualizar oferta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompEditData;
