import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Cupo = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const res = await axios.get(
        process.env.REACT_APP_BACKURL + "parking/cupo/count"
      );
      setData(res.data);
      setLoading(false);
    };
    getData();
  }, []);
  return (
    <section className="container">
      <span className="back" onClick={() => navigate(-1)}>
        <IoMdArrowRoundBack className="arrow" />
        <p>Regresar a la página anterior.</p>
      </span>

      {loading ? (
        <div className="loading"></div>
      ) : (
        <article className="item">
          <p>{data.cupo}</p>
        </article>
      )}
    </section>
  );
};

export default Cupo;
