import PropTypes from "prop-types";
import LineChart from "./LineChart";

const DashboardAdmin = ({ userInfo }) => {
  return (
    <div>
      <h1 style={{ marginLeft: "100px" }}>Página de Administración</h1>
      <div style={{ marginLeft: "100px" }}>
        Bienvenido, {userInfo ? userInfo.username : "Usuario Desconocido"}!
      </div>
      <div>
        <h2 style={{ marginLeft: "100px" }}>Gráfico</h2>
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
