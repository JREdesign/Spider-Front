// FloatingChatIcon.jsx
import { useChat } from "../context/ChatContext"; // Asegúrate de ajustar la ruta si es diferente

const FloatingChatIcon = () => {
  const { isOpen, toggleChat } = useChat();

  const handleClick = () => {
    toggleChat();
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        cursor: "pointer",
        zIndex: "1000", // Ajusta el índice z si es necesario
      }}
      onClick={handleClick}
    >
      <img
        src="../chatbot3.png"
        alt="Chatbot Icon"
        style={{
          width: "60px", // Ajusta el tamaño del icono según necesites
          height: "60px",
        }}
      />
    </div>
  );
};

export default FloatingChatIcon;
