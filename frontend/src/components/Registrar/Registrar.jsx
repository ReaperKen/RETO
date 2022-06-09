import axios from "axios";
import React from "react";
import { useState } from "react";
import "./registrar.css";
import { IoMdCheckmarkCircleOutline, IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Registrar = () => {
  const [placa, setPlaca] = useState("");
  const [error, setError] = useState(false);
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/parking", {
        placa: placa,
      });
      setOk(true);
      setLoading(false);
      setPlaca("");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="container">
      <span className="back" onClick={() => navigate(-1)}>
        <IoMdArrowRoundBack className="arrow" />
        <p>Regresar a la página anterior.</p>
      </span>
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="title">Registre aquí su vehículo</h1>
        <input
          type="text"
          onChange={(e) => setPlaca(e.target.value)}
          name="placa"
          value={placa}
          placeholder="Ingrese la placa de su vehiculo"
          className="input"
          autoComplete="off"
        />
        <button type="submit" className="button" disabled={!placa}>
          Registrar
        </button>
        {loading ? (
          <div className="loading"></div>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          ok && (
            <IoMdCheckmarkCircleOutline className="success"></IoMdCheckmarkCircleOutline>
          )
        )}
      </form>
    </div>
  );
};

export default Registrar;
