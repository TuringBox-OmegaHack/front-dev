import PropTypes from 'prop-types';

const DashboardClient = ({ userInfo }) => {
  return (
    <div>
      <h1>Página del Cliente</h1>
      <div>
        Bienvenido, {userInfo ? userInfo.username : 'Usuario Desconocido'}!
      </div>
    </div>
  );
};

DashboardClient.propTypes = {
  userInfo: PropTypes.object.isRequired,
};

export default DashboardClient;
