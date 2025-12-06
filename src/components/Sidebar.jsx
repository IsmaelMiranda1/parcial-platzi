import { Link } from "react-router-dom";
import { FaBox, FaThList, FaUser, FaPlusSquare } from "react-icons/fa";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>

      <ul>
        <li>
          <Link to="/products">
            <span className="icon"><FaBox /></span>
            Productos
          </Link>
        </li>

        <li>
          <Link to="/register">
            <span className="icon"><FaPlusSquare /></span>
            Registrar producto
          </Link>
        </li>

        <li>
          <Link to="/categories">
            <span className="icon"><FaThList /></span>
            Categorías
          </Link>
        </li>

        <li>
          <Link to="/users">
            <span className="icon"><FaUser /></span>
            Usuarios
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
