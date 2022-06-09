import Parking from "../models/model.js";
import { CreateError } from "../utils/error.js";

export const RegistrarIng = async (req, res, next) => {
  const { placa } = req.body;

  //Aqui verifico el cupo del parking, si no hay cupo, retornara un mensaje

  const stats = await Parking.collection.stats();
  const ParkingCount = stats.count;

  if (ParkingCount >= 30) {
    return next(CreateError(500, "No hay cupo actualmente para otro vehiculo"));
  }

  //Aqui verifico si hay algun vehiculo ya registrado con la misma placa
  const verify = await Parking.findOne({ placa: placa });

  if (verify) {
    return next(
      CreateError(500, "Ya hay un vehiculo registrado con esta placa.")
    );
  }

  //Aqui arreglo la fecha, y redondeo los segundos a minutos
  const fechaE = new Date(Date.now());

  let minutes = fechaE.getMinutes();
  let seconds = fechaE.getSeconds();

  if (seconds > 0) {
    seconds = 0;
    minutes += 1;
  }

  fechaE.setMinutes(minutes);
  fechaE.setSeconds(seconds);

  const hora = fechaE.toLocaleTimeString();
  const fechaStr = fechaE.toLocaleDateString();

  //Aqui uso try catch para manejar los posibles errores mientras se registra un nuevo vehiculo y se guarda en la db

  try {
    const newVehicle = new Parking({
      placa,
      horaE: hora,
      fechaE: {
        fechaStr,
        fechaD: fechaE,
      },
    });

    await newVehicle.save();

    res.status(200).json(newVehicle);
  } catch (error) {
    next(CreateError(500, "Algo ha salido mal. Intentalo de nuevo."));
  }
};

export const ConsultarTodos = async (req, res, next) => {
  try {
    //Aqui consulto a la base de datos sobre todos los vehiculos que hay actualmente y los devuelvo
    const Vehicles = await Parking.find();

    res.status(200).json(Vehicles);
  } catch (error) {
    next(CreateError(500, "Algo ha salido mal. Intentalo de nuevo."));
  }
};

export const ConsultarPlaca = async (req, res, next) => {
  try {
    //Aqui consulto a la base de datos por un vehiculo, por su placa

    const Vehicle = await Parking.findOne({ placa: req.params.placa });

    res.status(200).json(Vehicle);
  } catch (error) {
    next(CreateError(500, "Algo ha salido mal. Intentalo de nuevo."));
  }
};

export const ConsultarCupo = async (req, res, next) => {
  try {
    //Aqui reviso el numero de registros que hay en la base de datos y retorno un mensaje segun la cantidad

    const stats = await Parking.collection.stats();

    const ParkingCount = stats.count;

    const cupo = 30 - ParkingCount;

    let message = "";

    if (cupo >= 30) {
      message = "No queda cupo para mas vehiculos";
    } else {
      message = `El cupo restante es de ${cupo} vehiculos`;
    }

    res.status(200).json({ cupo: message });
  } catch (error) {
    next(CreateError(500, "Algo ha salido mal. Intentalo de nuevo."));
  }
};

export const Retirar = async (req, res, next) => {
  //Aqui desestructuro la placa de los parametros de la url

  const { placa } = req.params;
  try {
    //Aqui busco el vehiculo por su placa en la base de datos

    const Vehicle = await Parking.findOne({ placa: placa });

    //Verifico que el vehiculo que se desea eliminar exista

    if (!Vehicle) {
      return next(CreateError(500, "No se ha encontrado el vehiculo."));
    }
    const { fechaE } = Vehicle;
    const { fechaD } = fechaE;

    //Creo la fecha de salida con el date.now

    const fechaS = new Date(Date.now());

    let minutes = fechaS.getMinutes();
    let seconds = fechaS.getSeconds();

    //Redondeo los segundos a minutos
    if (seconds > 0) {
      seconds = 0;
      minutes += 1;
    }
    //Actualizo los los minutos y segundos con sus nuevos valores

    fechaS.setMinutes(minutes);
    fechaS.setSeconds(seconds);

    //Busco la diferencia de minutos entre ambas fechas

    const difference = Math.abs(
      (fechaS.getTime() - fechaD.getTime()) / (1000 * 60)
    );
    //Calculo el total a pagar

    const total = Math.round(difference * 100);

    //Elimino el vehiculo de la base de datos

    await Parking.findOneAndDelete({ placa: placa });

    //Envio una respuesta con el total
    res.status(200).json({ total });
  } catch (error) {
    next(CreateError(500, "Algo ha salido mal. Intentalo de nuevo."));
  }
};
