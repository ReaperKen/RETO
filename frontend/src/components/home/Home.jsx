import { Link } from "react-router-dom";
import React from "react";
import "./home.css";

const Home = () => {
  return (
    <div className="container">
      <nav className="nav">
        <Link className="Link" to="/registrar">
          Registrar vehiculo
        </Link>
        <Link className="Link" to="/consultar">
          Consultar todos los vehículos
        </Link>
        <Link className="Link" to="/cupo">
          Consultar cupo
        </Link>
        <Link className="Link" to="/placa">
          Consultar vehículo por placa
        </Link>
      </nav>
    </div>
  );
};

export default Home;
