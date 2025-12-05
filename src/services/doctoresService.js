const { Doctores } = require("../models");

const crearDoctor = async (data) => {
  const doctor = await Doctores.create(data);
  return doctor;
};

const obtenerDoctores = async () => {
  return await Doctores.findAll();
};

const obtenerDoctorPorId = async (id) => {
  return await Doctores.findByPk(id);
};

const actualizarDoctor = async (id, data) => {
  const doctor = await Doctores.findByPk(id);
  if (!doctor) {
    throw new Error("Doctor no encontrado");
  }

  const actualizado = await doctor.update(data);
  return actualizado;
};

const eliminarDoctor = async (id) => {
  const doctor = await Doctores.findByPk(id);
  if (!doctor) {
    throw new Error("Doctor no encontrado");
  }

  await doctor.destroy();
  return { mensaje: "Doctor eliminado" };
};

module.exports = {
  crearDoctor,
  obtenerDoctores,
  obtenerDoctorPorId,
  actualizarDoctor,
  eliminarDoctor,
};
