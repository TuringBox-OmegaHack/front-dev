import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/dropdown.module.css';

const UserNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={styles.dropdown}>
      <button onClick={toggleDropdown} className={styles.iconButton}>
        <svg className={styles.iconUser} width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {isOpen && (
        <div className={styles.dropdownContent}>
          <button onClick={handleLogout} className={styles.logoutButton}>Cerrar sesión</button>
        </div>
      )}
    </div>
  );
};

export default UserNav;
