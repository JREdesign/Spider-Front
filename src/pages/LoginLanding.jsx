import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const LoginLanding = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, credentials);
            if (response.status === 200) {
                const { token, user } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('userId', user.id);
                localStorage.setItem('username', user.username);
                navigate('/');  // Redirige a la ruta raíz después del login exitoso
            } else {
                throw new Error('Authentication failed');
            }
        } catch (error) {
            alert('Autenticación fallida');  // Muestra un mensaje de error si la autenticación falla
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#ff4700' }}>
            <div className="w-full max-w-sm mx-auto">
                <img src="/logore-white.png" alt="Logo Rastreador" className="block mx-auto mb-6" />
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-lg text-gray900 font-semibold text-center mb-6">Por favor, ingresa tus credenciales</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium text-gray700">Introduce tu nombre de usuario</label>
                            <input type="text" id="username" name="username" value={credentials.username} onChange={handleChange} className="mt-1 p-2 block w-full rounded-md border-gray300 shadow-sm focus:border-indigo500 focus:ring-indigo-500 sm:text-sm" />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray700">Introduce tu contraseña</label>
                            <input type="password" id="password" name="password" value={credentials.password} onChange={handleChange} className="mt-1 p-2 block w-full rounded-md border-gray300 shadow-sm focus:border-indigo500 focus:ring-indigo500 sm:text-sm" />
                        </div>
                        <button type="submit" className="w-full bg-[#ff4700] hover:bg-[#e04000] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Entrar
                        </button>
                        <div className="mt-4 text-center">
                            <span>
                                ¿Eres ex-coder y aún no tienes tus credenciales? <Link to="/register" className="text-[#ff4700] hover:text-[#e04000]">Regístrate</Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginLanding;
