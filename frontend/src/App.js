import Registrar from "./components/Registrar/Registrar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Consultar from "./components/ConsultarA/Consultar";
import Retirar from "./components/Retirar/Retirar";
import Cupo from "./components/cupo/Cupo";
import ConsultarP from "./components/consultarplaca/ConsultarP";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registrar" element={<Registrar />} />
        <Route path="/consultar" element={<Consultar />} />
        <Route path="/cupo" element={<Cupo />} />
        <Route path="/placa" element={<ConsultarP />} />
        <Route path="/retirar/:placa" element={<Retirar />} />
      </Routes>
    </>
  );
}

export default App;
