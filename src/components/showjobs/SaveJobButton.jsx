import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

const apiUrl = import.meta.env.VITE_API_URL;

function SaveJobButton({ jobId, onSave }) {
  const [saving, setSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${apiUrl}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const savedJobs = response.data.savedJobs;
        setIsSaved(savedJobs.some(job => job._id === jobId));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [jobId]);

  const handleSaveJob = async () => {
    setSaving(true);
    const token = localStorage.getItem("token");
    try {
      if (isSaved) {
        // Si ya está guardado, se elimina
        await axios.delete(
          `${apiUrl}/auth/save-job/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsSaved(false); // Cambiamos el estado a no guardado
      } else {
        // Si no está guardado, se guarda
        await axios.post(
          `${apiUrl}/auth/save-job`,
          { jobId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsSaved(true); // Cambiamos el estado a guardado
      }
      onSave(); // Llamamos a la función onSave pasada por el padre
    } catch (error) {
      console.error("Error:", error.response.data);
    } finally {
      setSaving(false);
    }
  };

  return (
    <button onClick={handleSaveJob} disabled={saving} aria-label={isSaved ? "Desguardar trabajo" : "Guardar trabajo"}>
      {saving ? "Guardando..." : isSaved ? (
        <svg className="w-6 h-6 mr-2  text-orange dark:text-gray300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 24 24">
        <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z"/>
      </svg>
      
      
      ) : (
      <svg className="w-6 h-6 mr-1 text-orange dark:text-gray300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"/>
        </svg>

      )}
    </button>
  );
}

export default SaveJobButton;
