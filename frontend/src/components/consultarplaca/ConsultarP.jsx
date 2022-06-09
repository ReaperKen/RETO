import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const ConsultarP = () => {
  const [placa, setPlaca] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get(
        process.env.REACT_APP_BACKURL + `parking/${placa}`
      );
      setData(res.data);
      setLoading(false);
    } catch (error) {
      setError(error.response.data);
      setLoading(false);
    }
  };
  return (
    <div className="container">
      <span className="back" onClick={() => navigate(-1)}>
        <IoMdArrowRoundBack className="arrow" />
        <p>Regresar a la página anterior.</p>
      </span>
      {error ? (
        <p className="error">{error}</p>
      ) : data ? (
        <article className="item">
          <h1>Placa: {data.placa}</h1>
          <h2>Fecha de entrada: {data.fechaE.fechaStr}</h2>
          <h2>Hora de entrada: {data.horaE}</h2>
          <button
            onClick={() => navigate(`/retirar/${data.placa}`)}
            className="button"
          >
            Retirar vehículo
          </button>
        </article>
      ) : (
        <form className="form" onSubmit={handleSubmit}>
          <h1 className="title">Consultar por placa</h1>
          <input
            type="text"
            className="input"
            onChange={(e) => setPlaca(e.target.value)}
            autoComplete="off"
            placeholder="Ingrese la placa del vehiculo"
          />
          <button className="button">Consultar</button>
          {loading && <div className="loading"></div>}
        </form>
      )}
    </div>
  );
};

export default ConsultarP;
