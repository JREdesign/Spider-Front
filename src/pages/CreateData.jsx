import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";

const CompCreateData = () => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("Factoría F5");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [publicationDate, setPublicationDate] = useState(new Date().toLocaleDateString('es-ES'));
  const [thumbnail, setThumbnail] = useState("https://factoriaf5.org/wp-content/uploads/2021/07/logo.png");
  const [salary, setSalary] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [url, setUrl] = useState("");
  const [site, setSite] = useState("Rastreador F5");
  const [verifyhuman, setVerifyHuman] = useState(true);
  const [junior, setJunior] = useState(false);
  const [english, setEnglish] = useState(false);
  const [alert, setAlert] = useState(null); // Estado para manejar las alertas
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const showAlert = (type, message) => {
    console.log("showAlert called with:", type, message); // Log para verificar si showAlert se llama
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000); // Ocultar la alerta después de 3 segundos
  };

  const store = async (e) => {
    e.preventDefault();
    console.log("store function called"); // Log para verificar si store se llama
    const techArray = technologies.split(",").map(tech => tech.trim());
    try {
      const response = await axios.post(`${apiUrl}/jobs/`, {
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
        verifyHuman: verifyhuman,
        junior,
        english,
      });
      console.log("API response:", response); // Log para verificar la respuesta de la API
      if (response.status === 201) {
        showAlert("success", "Oferta agregada con éxito");
        navigate("/");
      } else {
        console.error("Error al crear el registro:", response.data);
        showAlert("error", "No se pudo agregar la oferta");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      showAlert("error", "No se pudo agregar la oferta");
    }
  };

  return (
    <div className="bg-gray100 flex items-center justify-center min-h-screen" style={{ marginTop: "-70px" }}>
      {alert && <Alert type={alert.type} message={alert.message} />}
      <div className="max-w-4xl w-full bg-white dark:bg-gray600 shadow-lg p-8">
        <h1 className="bg-orange dark:bg-gray900 text-3xl font-bold mb-8 text-center text-white p-4 rounded-t-lg">
          Crear nuevo registro de empleo
        </h1>
        <form onSubmit={store} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <input
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="dark:bg-gray600 dark:text-gray300 border border-gray800 p-2 rounded-lg"
            />
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              type="text"
              className="dark:bg-gray600 border border-gray800 p-2 rounded-lg"
            />
            <input
              placeholder="Ubicación"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              className="dark:bg-gray600 border border-gray800 p-2 rounded-lg"
            />
            <input
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              type="text"
              className="dark:bg-gray600 border border-gray800 p-2 rounded-lg"
            />
            <input
              placeholder="Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              className="border border-gray600 p-2 col-span-2 rounded-lg"
            />
            <input
              value={publicationDate}
              onChange={(e) => setPublicationDate(e.target.value)}
              type="date"
              className="dark:bg-gray600 border border-gray800 p-2 rounded-lg"
            />
            <input
              placeholder="Salario"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              type="text"
              className="dark:bg-gray600 border border-gray800 p-2 rounded-lg"
            />
            <input
              placeholder="Tecnologías (separadas por comas)"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              type="text"
              className="dark:bg-gray600 border border-gray800 p-2 rounded-lg"
            />
            <input
              placeholder="URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              type="text"
              className="dark:bg-gray600 border border-gray800 p-2 rounded-lg"
            />
            <input
              value={site}
              onChange={(e) => setSite(e.target.value)}
              type="text"
              className="dark:bg-gray600 border border-gray800 p-2 rounded-lg"
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="verifyhuman"
                checked={verifyhuman}
                onChange={(e) => setVerifyHuman(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <label htmlFor="verifyhuman" className="ml-2">Verificado</label>
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
              type="submit" // Asegúrate de que el botón sea de tipo submit
              className="text-white bg-orange font-bold py-2 px-4 rounded-md hover:bg-gray600 dark:bg-gray700 dark:hover:bg-gray800"
            >
              Agregar oferta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompCreateData;
