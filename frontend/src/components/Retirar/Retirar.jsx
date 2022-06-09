import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
const Retirar = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const { placa } = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const res = await axios.delete(
        process.env.REACT_APP_BACKURL + `parking/retirar/${placa}`
      );
      setData(res.data);
      setLoading(false);
    };
    getData();
  }, [placa]);
  return (
    <div>
      <span className="back" onClick={() => navigate("/")}>
        <IoMdArrowRoundBack className="arrow" />
        <p>Regresar al inicio.</p>
      </span>
      <section className="container">
        {loading ? (
          <div className="loading"></div>
        ) : (
          <article className="item">
            <h1>Placa del vehiculo retirado: {placa} </h1>
            <h2>Su total a pagar es de:</h2>
            <p>${data.total}</p>
          </article>
        )}
      </section>
    </div>
  );
};

export default Retirar;
