import { useEffect, useState } from 'react';
import axios from 'axios';
import ViewProfile from '../components/ViewProfile'; // Asegúrate de importar ViewProfile
import AddBoxRoundedIcon from '@mui/icons-material/AddBox';
import MyButton from '../components/ButtonSend';
import Alert from "../components/Alert";
import ConfirmAlert from '../components/ConfirmAlert';

function Dashboard() {
  const [technologies, setTechnologies] = useState([]);
  const [users, setUsers] = useState([]);
  const [newTech, setNewTech] = useState('');
  const [newUser, setNewUser] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState(null);
  const [confirmAlert, setConfirmAlert] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${apiUrl}/technologies`)
      .then(response => {
        setTechnologies(response.data);
      })
      .catch(error => console.error('Error fetching technologies:', error));

    axios.get(`${apiUrl}/auth/all-users`)
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, [apiUrl]);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000);
  };

  const showConfirmAlert = (message, onConfirm) => {
    setConfirmAlert({ message, onConfirm });
  };

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddTechnology = () => {
    if (newTech) {
      axios.post(`${apiUrl}/technologies`, { technology: newTech })
        .then(response => {
          setTechnologies([...technologies, response.data]);
          setNewTech('');
          showAlert('success', 'Tecnología añadida con éxito');
        })
        .catch(error => {
          console.error('Error adding technology:', error);
          showAlert('error', 'Error al añadir la tecnología');
        });
    }
  };

  const handleRemoveTechnology = (techId) => {
    showConfirmAlert('¿Estás seguro de que quieres eliminar esta tecnología?', () => {
      axios.delete(`${apiUrl}/technologies/${techId}`)
        .then(() => {
          setTechnologies(technologies.filter(tech => tech._id !== techId));
          showAlert('success', 'Tecnología eliminada con éxito');
          setConfirmAlert(null);
        })
        .catch(error => {
          console.error('Error removing technology:', error);
          showAlert('error', 'Error al eliminar la tecnología');
          setConfirmAlert(null);
        });
    });
  };

  const handleRegisterUser = () => {
    if (newUser && !users.some(user => user.username === newUser)) {
      axios.post(`${apiUrl}/auth/register`, {
        username: newUser,
        password: 'rastreadorf5'
      })
      .then(response => {
        setUsers([...users, {username: newUser, role: 'Nuevo'}]);
        setNewUser('');
      })
      .catch(error => console.error('Error registering user:', error));
    }
  };

  const handleRemoveUser = (userId) => {
    console.log("Intentando eliminar usuario con ID:", userId);
    showConfirmAlert('¿Estás seguro de que quieres eliminar este usuario?', () => {
      axios.delete(`${apiUrl}/auth/user/${userId}`)
        .then(() => {
          console.log("Usuario eliminado:", userId);
          setUsers(users.filter(user => user._id !== userId));
          showAlert('success', 'Usuario eliminado con éxito');
          setConfirmAlert(null);
        })
        .catch(error => {
          console.error('Error removing user:', error);
          showAlert('error', 'Error al eliminar el usuario');
          setConfirmAlert(null);
        });
    });
  };

  const handleKeyDownTech = (event) => {
    if (event.key === 'Enter') {
      handleAddTechnology();
    }
  };

  const handleKeyDownUser = (event) => {
    if (event.key === 'Enter') {
      handleRegisterUser();
    }
  };

  return (
    <div className="bg-gray100 flex items-center justify-center min-h-screen" style={{ marginTop: "-100px" }}>
      {alert && <Alert type={alert.type} message={alert.message} />}
      {confirmAlert && (
        <ConfirmAlert
          message={confirmAlert.message}
          onConfirm={confirmAlert.onConfirm}
          onCancel={() => setConfirmAlert(null)}
        />
      )}
      <div className="max-w-4xl w-full bg-white shadow-lg p-8 rounded-lg dark:bg-gray700">
        <h1
          className="text-3xl font-bold mb-8 text-center bg-orange text-white p-4 rounded-t-lg dark:bg-gray900"
        >
          Panel de Administración
        </h1>
        <div className="grid grid-cols-2 gap-10">
          <div>
            <div className="mb-5">
              <h2 className="text-xl font-semibold mb-3 rounded">Rastreo</h2>
              <div>
                <label htmlFor="new-tech" className="block mb-2 rounded-md">Añade una nueva tecnología</label>
                <div className="flex items-center">
                  <input 
                    type="text" 
                    id="new-tech" 
                    value={newTech} 
                    onChange={e => setNewTech(e.target.value)}
                    onKeyDown={handleKeyDownTech}
                    className="border border-gray300 p-2 flex-1 rounded-md dark:bg-gray700 dark:text-gray300 dark:placeholder-gray300"
                    placeholder="Introduce tecnología"
                  />
                  <button className="ml-2" onClick={handleAddTechnology}>
                    <AddBoxRoundedIcon style={{ fontSize: '54px', transition: 'opacity 0.3s', opacity: 1 }} 
                      onMouseOver={e => e.currentTarget.style.opacity = '0.75'} 
                      onMouseOut={e => e.currentTarget.style.opacity = '1'}
                    />
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Rastreando actualmente</h3>
                <div className="border border-gray100 p-3 scrollable rounded-md" style={{ height: '200px', overflowY: 'auto' }}>
                  {technologies.map((tech) => (
                    <div key={tech._id} className="flex justify-between items-center mb-4">
                      <span>{tech.technology}</span>
                      <button className="p-1" onClick={() => handleRemoveTechnology(tech._id)}>
                        <img src="/botonrojo.svg" alt="Eliminar" className="h-4 w-4 rounded"/>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='flex justify-'>
              <MyButton handleRegisterUser={handleRegisterUser} />
            </div>
          </div>
          <div>
            <div className="mb-5">
              <h2 className="text-xl font-semibold mb-3 rounded-md">Usuarios</h2>
              <div>
                <label htmlFor="new-user" className="block mb-2 rounded-md">Añadir usuarios a la plataforma</label>
                <div className="flex items-center rounded-md">
                  <input 
                    type="text" 
                    id="new-user" 
                    value={newUser} 
                    onChange={e => setNewUser(e.target.value)}
                    onKeyDown={handleKeyDownUser}
                    className="border border-gray300 p-2 flex-1 rounded-md dark:bg-gray700 dark:text-gray300 dark:placeholder-gray300"
                    placeholder="Usuario"
                  />
                  <button className="ml-2 rounded-md" onClick={handleRegisterUser} style={{ width: '48px', height: '48px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>  
                    <AddBoxRoundedIcon 
                      style={{ fontSize: '54px', transition: 'opacity 0.3s', opacity: 1 }} 
                      onMouseOver={e => e.currentTarget.style.opacity = '0.75'} 
                      onMouseOut={e => e.currentTarget.style.opacity = '1'} 
                    />
                  </button>
                </div>
              </div>
              <div className="mt-5">
                <h3 className="font-semibold mb-2">Usuarios registrados</h3>
                <div className="border border-gray400 p-3 scrollable rounded-md" style={{ height: '200px', overflowY: 'auto' }}>
                  {users.map((user) => (
                    <div key={user._id} className="flex justify-between items-center mb-4 rounded-lg">
                      <span 
                        className="truncate" 
                        onClick={() => handleOpenModal(user)} 
                        style={{ cursor: 'pointer', maxWidth: 'calc(100% - 48px)', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {`${user.username} (${user.role}) | ${user.course}`}
                      </span>
                      <button 
                        className="p-1 flex-shrink-0 rounded" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveUser(user._id);
                        }} 
                        style={{ width: '24px', height: '24px' }}>
                        <img src="/botonrojo.svg" alt="Eliminar" className='rounded'/>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {showModal && (
          <div className="fixed inset-0 bg-gray600 bg-opacity-50 flex items-center justify-center p-4 rounded-md">
            <div className="bg-white p-4 rounded-lg shadow-lg w-full" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
              <ViewProfile userData={selectedUser} onClose={handleCloseModal} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
