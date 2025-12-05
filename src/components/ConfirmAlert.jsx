// src/components/ConfirmAlert.jsx
import React from 'react';
import WarningIcon from '@mui/icons-material/Warning';

const ConfirmAlert = ({ message, onConfirm, onCancel }) => {
  const baseStyle = 'fixed top-60 left-1/2 transform -translate-x-1/2 mt-4 z-50 p-6 w-3/4 md:w-1/2 lg:w-1/3 text-center rounded-lg shadow-lg text-gray800 flex flex-col items-center bg-white border border-4 border-orange';

  return (
    <div className={baseStyle}>
      <WarningIcon className="mb-4 text-orange" style={{ fontSize: '8rem' }} />
      <p className="text-sd mb-4">{message}</p>
      <div className="flex space-x-4">
        <button
          className="bg-gray600 hover:bg-green500 text-gray300 hover:text-gray800 font-bold py-2 px-4 rounded"
          onClick={onConfirm}
        >
          Confirmar
        </button>
        <button
          className="bg-orange hover:bg-orange400 text-white hover:text-red700 font-bold py-2 px-4 rounded"
          onClick={onCancel}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default ConfirmAlert;
