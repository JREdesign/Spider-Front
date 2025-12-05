import React, { createContext, useState, useContext } from 'react';

export const ChatContext = createContext({
  isOpen: false,
  toggleChat: () => {},
  userData: null,
  setUserData: () => {}
});

export const ChatProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ChatContext.Provider value={{ isOpen, toggleChat, userData, setUserData }}>
      {children}
    </ChatContext.Provider>
  );
};

// Crear un hook personalizado para facilitar el uso del contexto
export const useChat = () => useContext(ChatContext);
