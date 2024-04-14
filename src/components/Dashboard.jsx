import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
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
        console.log('Información del usuario:', response.data);
        setUserInfo(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al recuperar la información del usuario:', error);
        setError('No se pudo cargar la información del usuario');
        navigate('/login');
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

  return (
    <div>
      <h1>Página Principal</h1>
      <div>
        Bienvenido, {userInfo ? userInfo.username : 'Usuario Desconocido'}!
      </div>
    </div>
  );
};

export default Dashboard;
