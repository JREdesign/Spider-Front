import React from "react";

function DeleteJobButton({ jobId, handleDelete }) {
  return (
    <button
      onClick={() => handleDelete(jobId)}
      className="h-6 w-6 mr-2"
      style={{
        cursor: 'pointer',
        transition: 'opacity 0.3s',
        backgroundColor: 'transparent',
        border: 'none',
      }}
      onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
      onMouseLeave={e => e.currentTarget.style.opacity = '1'}
    >
      <img src="/iconos/delete.png" alt="Delete" className="h-6 w-6" />
    </button>
  );
}

export default DeleteJobButton;
