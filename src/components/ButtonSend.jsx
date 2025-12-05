import { useState, useEffect } from 'react';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { Button } from '@mui/material';
import axios from "axios";

const MyButton = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleThemeChange = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    // Set initial state
    handleThemeChange();

    // Add event listener for theme changes
    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  const handleClick = () => {
    setIsTracking(true); // Comienza el rastreo

    const token = localStorage.getItem('token'); // Obtener el token del localStorage
    const scrapperUrl = import.meta.env.VITE_SCRAPPER_URL; // Obtener la URL del scrapper desde la variable de entorno

    axios.post(`${scrapperUrl}/user`, {
      // Aquí puedes incluir datos adicionales en el cuerpo de la solicitud si es necesario
      // Ejemplo: data: { /* datos a enviar */ },
    }, {
      headers: {
        Authorization: `Bearer ${token}` // Agrega el token al header de autorización
      }
    })
    .then(response => {
      // Aquí puedes manejar la respuesta de la solicitud si es necesario
    })
    .catch(error => {
      // Aquí puedes manejar errores en la solicitud si es necesario
    })
    .finally(() => {
      setIsTracking(false); // Termina el rastreo
    });
  };

  return (
    <Button 
      onClick={handleClick} 
      disabled={isTracking} // Deshabilita el botón mientras se está rastreando
      sx={{
        width: 'auto',
        height: '48px',
        minWidth: '48px',
        bgcolor: isDarkMode ? '#1f2937' : '#ff4700', // Cambia el color de fondo según el tema
        '&:hover': {
          bgcolor: isDarkMode ? '#fb923c' : '#fb923c',
          color: '',
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        color: 'white',
        fontWeight: 'bold',
        paddingY: 2,
        paddingX: 4
      }}
    >
      {isTracking ? "Rastreando..." : "Rastrear"}
      <SendRoundedIcon sx={{ marginLeft: 1 }} />
    </Button>
  );
};

export default MyButton;
