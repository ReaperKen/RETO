import { Router } from "express";
import {
  ConsultarCupo,
  ConsultarPlaca,
  ConsultarTodos,
  RegistrarIng,
  Retirar,
} from "../controllers/controller.js";

const router = Router();

//Ingresar la hora de entrada del vehiculo

router.post("/", RegistrarIng);

//Consultar todos los vehiculos y fecha de ingreso

router.get("/", ConsultarTodos);

//Consultar un vehiculo por placa

router.get("/:placa", ConsultarPlaca);

//Consultar el cupo de el parqueadero

router.get("/cupo/count", ConsultarCupo);

//Retirar vehiculo y liberar cupo (Restar count document)

router.delete("/retirar/:placa", Retirar);

export default router;
