import React from "react";

function ViewProfile({ userData, onClose }) {
  const hasSavedJobs = userData && userData.savedJobs && userData.savedJobs.length > 0;
  const isScrollable = hasSavedJobs && userData.savedJobs.length > 5;

  return (
    <div className="bg-gray100 flex items-center justify-center min-h-screen">
      <div className="max-w-4xl w-full bg-white shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-white bg-orange p-4 rounded-t-lg">
          Viendo perfil de {userData && userData.username}
        </h1>
        <div className="grid grid-cols-1 gap-10">
          <div>
            <h2 className="text-xl font-bold mb-3">Información del Usuario</h2>
            <div className="grid grid-cols-3 gap-6 mb-5">
              <div>
                <p className="font-bold text-gray-600">Nombre</p>
                <p className="text-normal">{userData && userData.firstName}</p>
              </div>
              <div>
                <p className="font-bold text-gray-600">Primer Apellido</p>
                <p className="text-normal">{userData && userData.lastName1}</p>
              </div>
              <div>
                <p className="font-bold text-gray-600">Segundo Apellido</p>
                <p className="text-normal">{userData && userData.lastName2}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <p className="font-bold text-gray-600">Bootcamp / Curso</p>
                <p className="text-normal">{userData && userData.course}</p>
              </div>
              <div>
                <p className="font-bold text-gray-600">E-mail</p>
                <p className="text-normal">{userData && userData.email}</p>
              </div>
            </div>
            <div className="mb-5">
              <p className="font-bold text-gray-600">Tecnologías favoritas</p>
              <p className="text-normal">{userData && userData.favoriteTechnologies.join(", ")}</p>
            </div>
            <div className="mb-5">
              <p className="font-bold text-gray-600">LinkedIn</p>
              {userData && userData.linkedin ? (
                <a
                  href={userData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'underline', color: '#ff4701' }}
                  className="text-sm"
                >
                  {userData.linkedin}
                </a>
              ) : (
                <p className="italic">(El usuario no ha proporcionado un enlace de LinkedIn)</p>
              )}
            </div>
            <h2 className="text-xl font-bold mb-3">Biografía</h2>
            <p className={`p-3 mb-5 ${userData && userData.biography ? 'border border-gray600 rounded-md' : 'italic'}`}>
              {userData && userData.biography ? userData.biography : "(El usuario no tiene ninguna descripción en su biografía)"}
            </p>
            <h2 className="text-xl font-bold mb-3">Ofertas Guardadas</h2>
            {hasSavedJobs ? (
              <div className="border border-gray-300 p-3" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                <ul className="list-disc pl-8">
                  {userData.savedJobs.map((job) => (
                   <li key={job._id} className="mb-2">
                   <a
                     href={job.url}
                     target="_blank"
                     rel="noopener noreferrer"
                     className=" hover:font-bold dark:text-white"
                   >
                     {job.title} | {job.company} | {job.salary}
                   </a> 
                 </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="italic">(El usuario no tiene ninguna oferta guardada)</p>
            )}
            <div className="flex justify-center">
              <button onClick={onClose} className="bg-orange text-white hover:bg-gray600 px-6 py-2 mt-5 rounded-md">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProfile;
