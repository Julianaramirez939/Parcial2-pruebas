const { Pacientes } = require("../models");

const crearPaciente = async (data) => {
  const { email } = data;

  const existente = await Pacientes.findOne({ where: { email } });
  if (existente) {
    throw new Error("Ya existe un paciente registrado con este email");
  }

  const paciente = await Pacientes.create(data);
  return paciente;
};

const obtenerPacientes = async () => {
  return await Pacientes.findAll();
};

const obtenerPacientePorId = async (id) => {
  return await Pacientes.findByPk(id);
};

const actualizarPaciente = async (id, data) => {
  id = Number(id); 
  const paciente = await Pacientes.findByPk(id);
  if (!paciente) {
    throw new Error("Paciente no encontrado");
  }

  if (data.email) {
    const duplicado = await Pacientes.findOne({
      where: { email: data.email },
    });

    if (duplicado && duplicado.id !== id) {
      throw new Error("Ya existe otro paciente con este email");
    }
  }

  return await paciente.update(data);
};


const eliminarPaciente = async (id) => {
  const paciente = await Pacientes.findByPk(id);
  if (!paciente) {
    throw new Error("Paciente no encontrado");
  }

  await paciente.destroy();
  return { mensaje: "Paciente eliminado" };
};

module.exports = {
  crearPaciente,
  obtenerPacientes,
  obtenerPacientePorId,
  actualizarPaciente,
  eliminarPaciente,
};
