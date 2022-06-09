import axios from "axios";
import React, { useEffect, useState } from "react";
import "./consultar.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Consultar = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(process.env.REACT_APP_BACKURL + "parking");
        setData([...res.data]);
        setLoading(false);
      } catch (error) {
        setError(error.response.data);
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <>
      <span className="back" onClick={() => navigate(-1)}>
        <IoMdArrowRoundBack className="arrow" />
        <p>Regresar a la página anterior.</p>
      </span>
      <section className="grid-con">
        {data.length > 0 &&
          data.map((item, i) => (
            <article className="item" key={item._id}>
              <p>{i + 1}</p>
              <h1>Placa: {item.placa}</h1>
              <h2>Fecha de entrada: {item.fechaE.fechaStr}</h2>
              <h2>Hora de entrada: {item.horaE}</h2>
              <button
                onClick={() => navigate(`/retirar/${item.placa}`)}
                className="button"
              >
                Retirar vehículo
              </button>
            </article>
          ))}
        {loading ? (
          <div className="loading"></div>
        ) : (
          error && <p className="error">{error}</p>
        )}
      </section>
    </>
  );
};

export default Consultar;
