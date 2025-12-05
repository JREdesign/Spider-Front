import { useState } from "react";
import emailjs from "emailjs-com";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    primerApellido: "",
    segundoApellido: "",
    curso: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await emailjs.sendForm(
        "service_uwf5lkp",
        "template_q5371wh",
        e.target,
        "xPT6y6aj0zZp-diWj"
      );
      await sendEmailToAdmin(); // Enviar correo al administrador
 toast.success(
   <div style={{ textAlign: "center" }}>
     ¡Gracias {formData.nombre} por solicitar registrarte en nuestro portal!{" "}
     <br />
     En breve recibirás tus credenciales.
   </div>
 );      setTimeout(() => navigate("/"), 4000); // Redirige al usuario a la página de inicio después de 3 segundos
    } catch (error) {
      console.error("¡Error al enviar la solicitud de registro!", error);
      toast.error("¡Error al enviar la solicitud de registro!");
      setTimeout(() => navigate("/"), 4000); // Redirige al usuario a la página de inicio después de 3 segundos
    }
  };

  const sendEmailToAdmin = async () => {
    try {
      // Configuración para enviar el correo electrónico usando emailjs
      const templateParams = {
        from_name: formData.nombre,
        from_email: formData.email,
        message: `Solicitud de registro de un nuevo usuario:
          Nombre: ${formData.nombre} ${formData.primerApellido} ${formData.segundoApellido}
          Curso: ${formData.curso}
          Email: ${formData.email}
        `,
      };

      await emailjs.send(
        "service_uwf5lkp", // ID del servicio de emailjs
        "template_q5371wh", // ID de la plantilla de emailjs
        templateParams,
        "xPT6y6aj0zZp-diWj" // ID del usuario de emailjs
      );
    } catch (error) {
      console.error("Error al enviar correo al administrador:", error);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundColor: "#ff4700" }}
    >
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-lg text-gray-900 font-semibold text-center mb-6">
            Registro de Usuario
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Primer apellido
              </label>
              <input
                type="text"
                name="primerApellido"
                value={formData.primerApellido}
                onChange={handleChange}
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Segundo apellido
              </label>
              <input
                type="text"
                name="segundoApellido"
                value={formData.segundoApellido}
                onChange={handleChange}
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Bootcamp / Curso
              </label>
              <select
                name="curso"
                value={formData.curso}
                onChange={handleChange}
                className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Seleccione un curso</option>
                <option value="Desarrollo Web Full Stack">
                  Desarrollo Web Full Stack
                </option>
                <option value="Desarrollo Web Full Stack + Tecnologias Inmersivas">
                  Desarrollo Web Full Stack + Tecnologias Inmersivas
                </option>
                <option value="Desarrollo Web Full Stack + Ciberseguridad">
                  Desarrollo Web Full Stack + Ciberseguridad
                </option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#ff4700] hover:bg-[#e04000] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Regístrate
            </button>
            <div className="mt-4 text-center">
              <span>
                ¿Ya tienes cuenta?{" "}
                <Link
                  to="/login"
                  className="text-[#ff4700] hover:text-[#e04000]"
                >
                  Accede al sitio
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
