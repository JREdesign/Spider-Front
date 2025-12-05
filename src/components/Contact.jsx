import { useState } from "react";
import emailjs from "emailjs-com";

function Contact() {
  const [formData, setFormData] = useState({
    from_name: "",
    form_email: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_uwf5lkp",
        "template_q5371wh",
        e.target,
        "xPT6y6aj0zZp-diWj"
      )
      .then(
        (response) => {
          setSuccessMessage("¡El correo ha sido enviado con éxito!");
          setErrorMessage("");
        },
        (error) => {
          setErrorMessage("¡Error al enviar el correo!");
          setSuccessMessage("");
        }
      );
  };

  return (
    <div className="container mx-auto m-10 py-28 text-center h-full">
      <h2 className="text-4xl p-2 text-orange hover:text-gray700 dark:text-gray300 hover:dark:text-gray600 font-bold cursor-pointer">
        Contacta con nosotros
      </h2>
      <p className="text-2xl text-gray-500 mt-2 mb-8">¡Cuéntanos lo que quieras!</p>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label
            htmlFor="from_name"
            className="block text-md font-medium text-gray700 dark:text-gray300"
          >
            Nombre completo:
          </label>
          <input
            type="text"
            id="from_name"
            name="from_name"
            value={formData.from_name}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full border border-gray700 rounded-md focus:outline-none focus:ring-indigo500 focus:border-indigo500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="from_email"
            className="block text-md font-medium text-gray700 dark:text-gray300"
          >
            Correo electrónico:
          </label>
          <input
            type="email"
            id="from_email"
            name="from_email"
            value={formData.from_email}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full border border-gray700 rounded-md focus:outline-none focus:ring-indigo500 focus:border-indigo500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-md font-medium text-gray700 dark:text-gray300"
          >
            Mensaje:
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full border border-gray700 rounded-md focus:outline-none focus:ring-indigo500 focus:border-indigo500 h-32"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-orange hover:bg-orange400 hover:text-gray800 text-white font-bold py-2 px-4 rounded inline-flex items-center dark:bg-gray400 dark:text-gray800 hover:dark:bg-orange400"
        >
          Enviar
        </button>
      </form>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
}

export default Contact;
