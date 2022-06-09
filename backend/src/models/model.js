import mongoose from "mongoose";
const { Schema, model } = mongoose;

/*Aqui estoy creando el esquema del parqueadero(Los campos que tendra), en este caso tendre le fecha de entrada,
hora de ingreso(tomada de la fecha y hora del sistema) y aparte pondre un campo vacio con la fecha de salida,
para luego actualizarla
*/
const ParkingSchema = new Schema(
  {
    placa: { type: String, unique: true, required: true },
    horaE: { type: String, required: true },
    fechaE: {
      fechaStr: String,
      fechaD: { type: Date, required: true },
    },
    total: Number,
  },
  {
    versionKey: false,
  }
);

export default model("Parking", ParkingSchema);
