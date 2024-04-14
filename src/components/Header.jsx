import styles from '../styles/header.module.css';
import UserNav from './UserNav';
import Logo from '../assets/images/Celsia_logo.png';

function Header() {
  return (
    <header className={styles.header}>
      <img src={Logo} alt="Logo Celsia" className={styles.logoImages}/>
      {/* <nav>
        <ul className={styles.navLinks}>
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Acerca de</a></li>
          <li><a href="#">Contacto</a></li>
        </ul>
      </nav> */}
      <UserNav />
    </header>
  );
}

export default Header;
