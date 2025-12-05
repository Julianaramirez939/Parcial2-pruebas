const { Citas, Doctores, Pacientes } = require("../models");
const { Op } = require("sequelize");

const crearCita = async (data) => {
  const { doctor_id, paciente_id, fecha, hora_inicio, hora_fin } = data;

  const doctor = await Doctores.findByPk(doctor_id);
  if (!doctor) throw new Error("Doctor no encontrado");

  const paciente = await Pacientes.findByPk(paciente_id);
  if (!paciente) throw new Error("Paciente no encontrado");

  const solapada = await Citas.findOne({
    where: {
      doctor_id,
      fecha,
      [Op.and]: [
        { hora_inicio: { [Op.lt]: hora_fin } },
        { hora_fin: { [Op.gt]: hora_inicio } },
      ],
    },
  });

  if (solapada) {
    throw new Error("El doctor ya tiene una cita en este horario");
  }

  const cita = await Citas.create(data);
  return cita;
};

const obtenerCitas = async () => {
  return await Citas.findAll({
    include: [{ model: Doctores }, { model: Pacientes }],
  });
};

const obtenerCitaPorId = async (id) => {
  return await Citas.findByPk(id, {
    include: [{ model: Doctores }, { model: Pacientes }],
  });
};

const actualizarCita = async (id, data) => {
  const cita = await Citas.findByPk(id);
  if (!cita) throw new Error("Cita no encontrada");

  if (data.doctor_id || data.fecha || data.hora_inicio || data.hora_fin) {
    const doctor_id = data.doctor_id || cita.doctor_id;
    const fecha = data.fecha || cita.fecha;
    const hora_inicio = data.hora_inicio || cita.hora_inicio;
    const hora_fin = data.hora_fin || cita.hora_fin;

    const solapada = await Citas.findOne({
      where: {
        doctor_id,
        fecha,
        id: { [Op.ne]: id },
        [Op.and]: [
          { hora_inicio: { [Op.lt]: hora_fin } },
          { hora_fin: { [Op.gt]: hora_inicio } },
        ],
      },
    });

    if (solapada) {
      throw new Error("Este horario ya está ocupado");
    }
  }

  const actualizada = await cita.update(data);
  return actualizada;
};

const eliminarCita = async (id) => {
  const cita = await Citas.findByPk(id);
  if (!cita) throw new Error("Cita no encontrada");

  await cita.destroy();
  return { mensaje: "Cita cancelada correctamente" };
};

module.exports = {
  crearCita,
  obtenerCitas,
  obtenerCitaPorId,
  actualizarCita,
  eliminarCita,
};
