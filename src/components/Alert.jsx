// src/components/Alert.jsx
import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';

const Alert = ({ type, message }) => {
  const baseStyle = 'fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 z-50 p-6 w-3/4 md:w-1/2 lg:w-1/3 text-center rounded-lg shadow-lg text-white flex flex-col items-center border border-gray400';
  let alertStyle = '';
  let IconComponent;
  let iconClass = 'mb-4 text-8xl'; // Clase para íconos grandes

  switch (type) {
    case 'success':
      alertStyle = 'bg-green500';
      IconComponent = CheckCircleIcon;
      break;
    case 'error':
      alertStyle = 'bg-red700';
      IconComponent = ErrorIcon;
      break;
    case 'warning':
      alertStyle = 'bg-yellow500';
      IconComponent = WarningIcon;
      break;
    case 'info':
      alertStyle = 'bg-blue500';
      IconComponent = InfoIcon;
      break;
    default:
      alertStyle = 'bg-gray600';
      IconComponent = InfoIcon;
  }

  return (
    <div className={`${baseStyle} ${alertStyle}`}>
      <IconComponent className={iconClass} fontSize="ihnerit" />
      <p className="text-lg">{message}</p>
    </div>
  );
};

export default Alert;
