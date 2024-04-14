import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/images/Celsia_logo.png';
import styles from '../styles/login.module.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
  
      try {
        const response = await axios.post('http://localhost:8000/api/token/', {
          username,
          password
        });
        login(response.data.access);
        navigate('/home');
      } catch (error) {
        console.error('Error en la autenticación:', error.response?.data || error.message);
        setError('Credenciales inválidas');
      }
    };

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <img src={Logo} alt="Logo Celsia" className={styles.logoImg}/>
        <h2 className={styles.title}>Iniciar sesión</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputContainer}>
            <label htmlFor="username" className={styles.label}>Usuario</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nombre de usuario" className={styles.input} />
            <label htmlFor="password" className={styles.label}>Contraseña</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className={styles.input} />
          </div>
          {error && <p className={styles.errorMessage}>{error}</p>}
          <button type="submit" className={styles.button}>
            <svg className={styles.loginIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4V20M4 12H16M16 12L12 8M16 12L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
