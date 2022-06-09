import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Routes from "./routes/routes.js";

dotenv.config();
const app = express();

//CONFIG JSON
app.use(express.json());

//Coneccion a la base de datos
const connect = async () => {
  await mongoose.connect(process.env.MONGODB);
};
connect();

/*Muestra en la consola cuando se conecta a la base de datos, y en caso en que se desconecte mostrara el mensaje y 
volvera a intentar conectarse*/

mongoose.connection.on("disconnected", () => console.log("Disconnected"));
mongoose.connection.on("connected", () => console.log("Connected"));

//Endpoints a los cuales se deben hacer las peticiones
app.use("/parking", Routes);

//Manejador de errores, en caso de que ocurra alguno
app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMSG = error.message || "Something went wrong";
  res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMSG,
  });
});

app.listen(6000, console.log("Server On"));
