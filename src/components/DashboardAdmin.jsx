import PropTypes from 'prop-types';
import LineChart from './LineChart';

const DashboardAdmin = ({ userInfo }) => {
  
  return (
    <div>
      <h1>Página del Admin</h1>
      <div>
        Bienvenido, {userInfo ? userInfo.username : 'Usuario Desconocido'}!
      </div>
      <div>
        <h2>Gráfico</h2>
        <div>
          <LineChart />
        </div>
      </div>
    </div>
  );
};

DashboardAdmin.propTypes = {
  userInfo: PropTypes.object.isRequired,
};

export default DashboardAdmin;
