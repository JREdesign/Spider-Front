import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { ChatContext } from "../context/ChatContext";

function Chatbot() {
  const { isOpen, userData, setUserData } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [initialMessageSent, setInitialMessageSent] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const aiApiUrl = import.meta.env.VITE_AI_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found");
        return;
      }
      try {
        const response = await axios.get(`${apiUrl}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("User data fetched:", response.data);
        setUserData(response.data);
        localStorage.setItem("userData", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    if (!userData) {
      fetchData();
    }
  }, [userData, setUserData, apiUrl]);

  const sendMessage = async (messageList, token) => {
    try {
      const response = await axios.post(`${aiApiUrl}/chatbot`, { messages: messageList }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("API response:", response.data);

      const botMessage = { text: `Respuesta: ${response.data}`, sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Hubo un error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Hubo un error al obtener la respuesta", sender: "bot" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found");
      return;
    }

    const userMessage = { text: `Tú: ${input}`, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (!storedUserData) {
      console.error("No user data found in localStorage");
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "No se encontraron los datos del usuario", sender: "bot" },
      ]);
      setIsLoading(false);
      return;
    }

    const previousMessages = messages.map(msg => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text.replace(/^(Tú|Respuesta): /, "")
    }));

    const currentMessage = {
      role: "user",
      content: input
    };

    // Log the message being sent to the AI API
    console.log("Message to AI API:", [...previousMessages, currentMessage]);

    const dataToSend = [...previousMessages];
    if (!initialMessageSent) {
      const initialUserDataMessage = {
        role: "user",
        content: `datos del usuario: Mi nombre es: ${storedUserData.firstName}, Algunas cosas sobre mi son: ${storedUserData.biography}, estas son las tecnologías que domino:${storedUserData.favoriteTechnologies.join(", ")}`
      };
      dataToSend.push(initialUserDataMessage);
      setInitialMessageSent(true);
    }
    dataToSend.push(currentMessage);

    await sendMessage(dataToSend, token);

    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="p-5 bg-white shadow-lg rounded-lg fixed bottom-5 right-5 w-80 z-50">
      <div
        className="text-center bg-orange font-bold p-2 rounded-t-lg"
        style={{ color: "white" }}
      >
        ¡Prepara tu entrevista personalizada!
      </div>
      <div className="h-72 overflow-y-auto p-2 flex flex-col space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 text-sm rounded-md max-w-max ${
              msg.sender === "user"
                ? "bg-[#ed8232] text-white self-end"
                : "bg-white text-orange self-start"
            }`}
          >
            {msg.sender === "user" ? (
              <span>
                <strong>Tú:</strong> {msg.text.slice(4)}
              </span>
            ) : (
              <span>
                <strong>Respuesta:</strong> {msg.text.slice(10)}
              </span>
            )}
          </div>
        ))}
        {isLoading && <div className="text-center">Pensando...</div>}
      </div>
      <div className="p-2 bg-white">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Escribe tu pregunta..."
          className="w-full p-2 border border-gray-300 rounded-md focus:border-[#ed8232] focus:outline-none"
          disabled={!userData}
        />
        <button
          onClick={handleSubmit}
          className="w-full mt-2 bg-orange hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          disabled={!userData}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
