import { useContext, useState } from "react";
import FormatDate from "./FormatDate"; // Asegúrate de que la ruta sea correcta
import PaginationShowData from "./Pagination"; // Asegúrate de que la ruta sea correcta
import { PaginationContext } from "../../context/PaginationContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Share, AddCircle, DeleteForever, Edit } from "@mui/icons-material";
import SaveJobButton from "./SaveJobButton";
import "../css/showjobs.css"; // Asegúrate de que la ruta sea correcta
import Alert from '../Alert'; // Asegúrate de que la ruta sea correcta
import ConfirmAlert from '../ConfirmAlert'; // Asegúrate de que la ruta sea correcta

const apiUrl = import.meta.env.VITE_API_URL;

const colors = [
  "bg-amber500 text-white dark:bg-sky400 dark:text-gray800",
  "bg-amber700 text-white dark:bg-indigo300 dark:text-gray800",
  "bg-amber950 text-white dark:bg-cyan300 dark:text-gray800",
  "bg-lime900 text-white dark:bg-slate300 dark:text-gray800",

  
];

function ShowJobs() {
  const navigate = useNavigate();
  const {
    currentPage,
    jobsPerPage,
    totalPages,
    goToPrevPage,
    goToNextPage,
    currentJobs,
    setCurrentPage,
    setTotalPages,
  } = useContext(PaginationContext);

  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(atob(token.split(".")[1])) : null;
  const isUser = user && user.role === "user";
  const isAdmin = user && user.role === "admin";

  const [alert, setAlert] = useState(null); // Estado para manejar las alertas
  const [confirmAlert, setConfirmAlert] = useState(null); // Estado para manejar las alertas de confirmación

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000); // Ocultar la alerta después de 3 segundos
  };

  const showConfirmAlert = (message, onConfirm) => {
    setConfirmAlert({ message, onConfirm });
  };

  const handleDelete = (jobId) => {
    showConfirmAlert('¿Estás seguro de que quieres eliminar esta oferta?', async () => {
      try {
        await axios.delete(`${apiUrl}/jobs/${jobId}`);
        showAlert('success', 'Oferta eliminada con éxito');
        window.location.reload();
      } catch (error) {
        console.error("Error deleting job:", error.response.data);
        showAlert('error', 'Error al eliminar la oferta');
      } finally {
        setConfirmAlert(null);
      }
    });
  };

  const handleAddClick = () => {
    navigate("/CreateData");
    showAlert('success', 'Oferta agregada con éxito');
  };

  const handleEditClick = (jobId) => {
    navigate(`/EditData/${jobId}`);
    showAlert('success', 'Oferta editada con éxito');
  };

  const compartirWhatsApp = (url) => {
    const enlaceWhatsApp = `https://web.whatsapp.com/send/?text=${encodeURIComponent(
      url
    )}`;
    window.open(enlaceWhatsApp, "_blank");
  };

  return (
    <div className="container mx-auto py-8 dark:bg-gray800">
      {alert && <Alert type={alert.type} message={alert.message} />} {/* Mostrar alerta si existe */}
      {confirmAlert && (
        <ConfirmAlert
          message={confirmAlert.message}
          onConfirm={confirmAlert.onConfirm}
          onCancel={() => setConfirmAlert(null)}
        />
      )} {/* Mostrar alerta de confirmación si existe */}
      {currentJobs.length === 0 ? (
        <div className="flex justify-center flex-col items-center h-screen">
          <h2 className="text-xl font-bold mt-4" style={{ color: "#ff4701" }}>
            ¿POR QUÉ NO PRUEBAS A FILTRAR CON OTROS CRITERIOS?
          </h2>
          <img src="/spidernojobs.png" alt="No hay trabajos disponibles" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentJobs.map((job) => {
            const truncatedTitle =
              job.title.length > 30
                ? job.title.substring(0, 30) + "..."
                : job.title;

            return (
              <div
                key={job._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xl job-card card border-transparent transition duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-105 hover:border-2 hover:border-orange dark:bg-gray800 dark:text-white dark:border-gray100"
              >
                <div className="bg-orange p-4 text-white text-xl dark:bg-gray900 dark:text-gray">
                  <motion.div
                    whileHover={{ scale: 1.1, fontWeight: "bold", originX: 0 }}
                    style={{ display: "inline-block" }}
                  >
                    <a
                      href={job.url}
                      className="hover:text-xl hover:font-bold dark:text-white"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="hover-container">
                        <span className="truncated-text">{truncatedTitle}</span>
                        <span className="full-text">{job.title}</span>
                      </div>
                    </a>
                  </motion.div>
                </div>
                <div className="p-4 flex flex-col h-full relative dark:bg-gray700 dark:text-white">
                  <div className="flex space-x-4">
                    <div className="relative">
                      <img
                        src={job.thumbnail || "https://placehold.co/100x100"}
                        alt="Company Logo"
                        className="h-24 w-24 bg-gray-300 object-cover object-center rounded-md border border-gray600 p-1 dark:bg-gray700 dark:border-gray600"
                        style={{
                          objectFit: "contain",
                          objectPosition: "center",
                        }}
                      />
                      {job.english && (
                        <div className="absolute top-0 right-0 mt-1 mr-1">
                          <img
                            src="/iconos/flag-uk.png"
                            alt="English Flag"
                            className="h-auto w-6"
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col justify-between w-full">
                      <div className="text-sm">
                        <span className="font-bold text-orange dark:text-orange400">
                          {job.location}
                        </span>
                        {job.junior ? " | " : ""}
                        <span className="font-bold">
                          {job.junior ? "Junior" : ""}
                        </span>{" "}
                        | {FormatDate({ dateString: job.publicationDate })} |{" "}
                        <span className="text-orange font-bold dark:text-orange400">
                          {" "}
                          Salario:{" "}
                        </span>
                        <span className="text-gray800 dark:text-gray300">
                          {job.salary}
                        </span>
                      </div>
                      <div className="mt-2 mb-2">
                        <div className="text-xl font-bold">{job.company}</div>
                        <p className="text-gray700 dark:text-gray300 job-description flex justify-around">
                          {job.description}
                        </p>
                        {job.description.length > 100 && (
                          <a
                            href={job.url}
                            className="font-bold text-gray700 dark:text-orange400"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            [ver más...]
                          </a>
                        )}
                      </div>
                      <div className="text-sm">
                        <span className="text-orange font-bold dark:text-orange400">
                          Tecnologías:
                        </span>{" "}
                        <div className="flex flex-wrap gap-1">
                          {job.technologies.map((tech, index) => (
                            <span
                              key={`${tech}-${index}`} // Usa una clave única
                              className={`inline-block mt-1 mb-0 px-0.5 py-0 rounded ${
                                colors[index % colors.length]
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-auto icons">
                    <div className="flex mt-4 ">
                      {isUser || isAdmin ? (
                        <SaveJobButton jobId={job._id} onSave={() => {}} />
                      ) : null}
                      <button
                        title="Share on WhatsApp"
                        aria-label="Compartir en whatsapp"
                        className="group cursor-pointer outline-none hover:rotate-90 duration-300 text-orange dark:text-gray300"
                        onClick={() => compartirWhatsApp(job.url)}
                      >
                        <Share
                          className="h-6 w-6 mr-1"
                          style={{
                            cursor: "pointer",
                            transition: "opacity 0.3s",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.opacity = "0.7")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.opacity = "1")
                          }
                        />
                      </button>
                      {isAdmin ? (
                        <AddCircle
                          className="h-6 w-6 mr-1 text-orange dark:text-gray300"
                          style={{
                            cursor: "pointer",
                            transition: "opacity 0.3s",
                          }}
                          onClick={handleAddClick}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.opacity = "0.7")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.opacity = "1")
                          }
                          aria-label="Crear oferta"
                        />
                      ) : null}
                      {isAdmin ? (
                        <Edit
                          className="h-6 w-6 mr-1 text-orange dark:text-gray300"
                          style={{
                            cursor: "pointer",
                            transition: "opacity 0.3s",
                          }}
                          onClick={() => handleEditClick(job._id)}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.opacity = "0.7")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.opacity = "1")
                          }
                          aria-label="Editar oferta"
                        />
                      ) : null}
                      {isAdmin ? (
                        <DeleteForever
                          className="h-6 w-6 mr-1 text-orange dark:text-gray300"
                          style={{
                            cursor: "pointer",
                            transition: "opacity 0.3s",
                          }}
                          onClick={() => handleDelete(job._id)}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.opacity = "0.7")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.opacity = "1")
                          }
                          aria-label="Borrar oferta"
                        />
                      ) : null}
                    </div>
                    {job.verifyHuman && (
                      <div className="text-sm font-bold flex items-center dark:text-green500">
                        <img
                          src="/iconos/check.png"
                          alt="Verified by human"
                          style={{ width: "1.5em", height: "1.5em" }}
                        />
                        Verificada por humano
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <PaginationShowData
        currentPage={currentPage}
        totalPages={totalPages}
        goToPrevPage={goToPrevPage}
        goToNextPage={goToNextPage}
      />
    </div>
  );
}

export default ShowJobs;
