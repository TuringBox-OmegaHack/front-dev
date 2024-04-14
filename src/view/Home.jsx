import { useState, useEffect } from 'react';
import Header from '../components/Header';
import DashboardAdmin from '../components/DashboardAdmin';
import DashboardClient from '../components/DashboardClient';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate(); // Obtenemos la función navigate del enrutador
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirigir al usuario a la página de inicio de sesión si no está autenticado
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      const accessToken = localStorage.getItem('access');
      try {
        const response = await axios.get('http://localhost:8000/api/user/', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setUserInfo(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al recuperar la información del usuario:', error);
        setError('No se pudo cargar la información del usuario');
      }
    };

    fetchUserData();
  }, [isAuthenticated, navigate]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Decidir qué Dashboard renderizar basado en la pertenencia al grupo 'administrator'
  const isAdmin = userInfo?.groups.includes("administrator");

  return (
    <div>
      <Header />
      {isAdmin ? <DashboardAdmin userInfo={userInfo} /> : <DashboardClient userInfo={userInfo} />}
    </div>
  );
};

export default Home;
