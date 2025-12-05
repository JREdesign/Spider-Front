import { useState, useEffect } from "react";
import axios from "axios";
import AddBoxRoundedIcon from '@mui/icons-material/AddBox';
import Alert from "../components/Alert";

function Profile() {
  const [password, setPassword] = useState("");
  const [course, setCourse] = useState("Desarrollo Web Full Stack");
  const [firstName, setFirstName] = useState("");
  const [lastName1, setLastName1] = useState("");
  const [lastName2, setLastName2] = useState("");
  const [email, setEmail] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [bio, setBio] = useState("");
  const [savedJobs, setSavedJobs] = useState([]);
  const [username, setUsername] = useState("");
  const [alert, setAlert] = useState(null); // Estado para manejar las alertas
  const apiUrl = import.meta.env.VITE_API_URL;

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000); // Ocultar la alerta después de 3 segundos
  };

  const handleDeleteOffer = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${apiUrl}/auth/save-job/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }, 
      });
      const response = await axios.get(`${apiUrl}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSavedJobs(response.data.savedJobs);
      showAlert("success", "Oferta eliminada satisfactoriamente");
    } catch (error) {
      console.error("Error deleting job:", error);
      showAlert("error", "Error al eliminar la oferta");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${apiUrl}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const {
          username,
          firstName,
          lastName1,
          lastName2,
          email,
          course,
          favoriteTechnologies,
          linkedin,
          biography,
          savedJobs,
        } = response.data;
        setFirstName(firstName || "");
        setLastName1(lastName1 || "");
        setLastName2(lastName2 || "");
        setEmail(email || "");
        setCourse(course || "Desarrollo Web Full Stack");
        setTechnologies(favoriteTechnologies.join(", "));
        setLinkedin(linkedin || "");
        setBio(biography || "");
        setSavedJobs(savedJobs || []);
        setUsername(username);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [apiUrl]);

  const handleUpdateProfile = async () => {
    const token = localStorage.getItem("token");
    const updatedInfo = {
      firstName,
      lastName1,
      lastName2,
      email,
      biography: bio,
      course,
      favoriteTechnologies: technologies.split(",").map((tech) => tech.trim()),
      linkedin,
    };

    try {
      const response = await axios.put(
        `${apiUrl}/auth/update-profile`,
        updatedInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showAlert("success", "Perfil actualizado satisfactoriamente");
    } catch (error) {
      showAlert("error", "Error al actualizar el perfil");
    }
  };

  const handleUpdatePassword = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${apiUrl}/auth/update-password`,
        {
          newPassword: password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showAlert("success", "Contraseña actualizada exitosamente");
      setPassword(""); // Limpiar el campo de contraseña después de actualizar
    } catch (error) {
      showAlert("error", "Error al actualizar la contraseña");
      console.error("Error updating password:", error.response.data);
    }
  };

  return (
    <div className="bg-gray100 flex items-center justify-center min-h-screen">
      {alert && <Alert type={alert.type} message={alert.message} />}
      <div className="max-w-4xl w-full bg-white shadow-lg p-8 dark:bg-gray700 rounded-xl">
        <h1
          className="text-3xl font-bold mb-8 text-center text-white p-4 rounded-t-lg bg-orange dark:bg-gray900"
        >
          Perfil de {username}
        </h1>
        <div className="grid grid-cols-1 gap-10">
          <div>
            <div className="mb-5">
              <h2 className="text-2xl font-semibold mb-3">
                Información del Usuario
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-gray100"
                  >
                    Contraseña
                  </label>
                  <div className="flex">
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Introduce una nueva contraseña"
                      className="border border-gray600 p-2 flex-1 mr-1 rounded-md dark:bg-gray700 dark:placeholder-gray300"
                    />
                    <AddBoxRoundedIcon className="text-orange dark:text-orange400 cursor-pointer hover:text-orange400 w-20 h-12"
                      style={{ fontSize: 40}}
                      onMouseOver={e => e.currentTarget.style.opacity = '0.75'} 
                      onMouseOut={e => e.currentTarget.style.opacity = '1'}
                      onClick={handleUpdatePassword}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="course" className="block mb-2 text-gray100">
                    Bootcamp / Curso
                  </label>
                  <select
                    id="course"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="border border-gray600 p-2 w-full rounded-md dark:bg-gray700 dark:placeholder-gray300"
                  >
                    <option value="Desarrollo Web Full Stack">
                      Desarrollo Web Full Stack
                    </option>
                    <option value="Desarrollo Web Full Stack + CiberSeguridad">
                      Desarrollo Web Full Stack + CiberSeguridad
                    </option>
                    <option value="Desarrollo Web Full Stack + Tecnologías inmersivas">
                      Desarrollo Web Full Stack + Tecnologías inmersivas
                    </option>
                  </select>
                </div>
              </div>
              <div className="my-8">
                <label htmlFor="name" className="block mb-2 text-gray100">
                  Datos de Contacto
                </label>
                <div className="grid grid-cols-3 gap-4 mb-2">
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Nombre"
                    className="border border-gray600 p-2 rounded-md dark:bg-gray700 dark:placeholder-gray300"
                  />
                  <input
                    type="text"
                    id="lastName1"
                    value={lastName1}
                    onChange={(e) => setLastName1(e.target.value)}
                    placeholder="Apellido 1"
                    className="border border-gray600 p-2 rounded-md dark:bg-gray700 dark:placeholder-gray300"
                  />
                  <input
                    type="text"
                    id="lastName2"
                    value={lastName2}
                    onChange={(e) => setLastName2(e.target.value)}
                    placeholder="Apellido 2"
                    className="border border-gray600 p-2 rounded-md dark:bg-gray700 dark:placeholder-gray300"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail"
                    className="border border-gray600 p-2 w-full rounded-md dark:bg-gray700 dark:placeholder-gray300"
                  />
                  <input
                    type="text"
                    id="technologies"
                    value={technologies}
                    onChange={(e) => setTechnologies(e.target.value)}
                    placeholder="Tecnologías destacadas (separadas por comas)"
                    className="border border-gray600 p-2 w-full rounded-md dark:bg-gray700 dark:placeholder-gray300"
                  />
                </div>
                <div className="mt-4">
                  <input
                    type="text"
                    id="linkedin"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="LinkedIn"
                    className="border border-gray600 p-2 w-full rounded-md dark:bg-gray700"
                  />
                </div>
              </div>
              <div className="mb-5">
                <label htmlFor="bio" className="block mb-2 text-gray100">
                  Biografía
                </label>
                <textarea
                  id="bio"
                  rows="4"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Cuéntanos un poco sobre tus intereses y motivaciones"
                  className="border border-gray600 p-2 w-full rounded-md dark:bg-gray700 dark:placeholder-gray300"
                ></textarea>
              </div>
              <div className="mb-5">
                <h2 className="text-xl font-semibold mb-3">
                  Ofertas Guardadas
                </h2>
                <div className="border border-gray600 p-2 rounded-md" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {savedJobs.map((job, index) => (
                    <div key={index} className="border border-gray600 p-2 mb-1 rounded-md">
                      <div className="flex justify-between items-center  rounded">
                        <a
                          href={job.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:font-bold dark:text-white"
                        >
                          <span>
                            {job.title} | {job.company} | {job.salary}
                          </span>
                        </a>
                        <div>
                          <a className="flex justify-end items-center ml-1"
                            href={job.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <button className="p-0 mr-2">
                                <svg className="w-6 h-6 text-gray800 dark:text-gray300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                  <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/>
                                  <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                </svg>
                            </button>
                          </a>
                          <button
                            className="p-1 ml-1"
                            onClick={() => handleDeleteOffer(job._id)}
                          >
                            <img
                              src="/botonrojo.svg"
                              alt="Eliminar"
                              className="h-4 w-4 rounded"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={handleUpdateProfile}
                className="bg-orange text-white font-bold py-2 px-4 rounded-md dark:bg-orange400 dark:text-gray700 hover:bg-gray800 hover:text-orange400 dark:hover:bg-gray300"
              >
                Actualizar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
