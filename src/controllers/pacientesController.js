const pacientesService = require("../services/pacientesService");

const crearPaciente = async (req, res) => {
  try {
    const paciente = await pacientesService.crearPaciente(req.body);
    res.status(201).json(paciente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const obtenerPacientes = async (req, res) => {
  try {
    const pacientes = await pacientesService.obtenerPacientes();
    res.status(200).json(pacientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerPacientePorId = async (req, res) => {
  try {
    const paciente = await pacientesService.obtenerPacientePorId(req.params.id);

    if (!paciente) {
      return res.status(404).json({ error: "Paciente no encontrado" });
    }

    res.status(200).json(paciente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const actualizarPaciente = async (req, res) => {
  try {
    const paciente = await pacientesService.actualizarPaciente(
      req.params.id,
      req.body
    );

    res.status(200).json(paciente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const eliminarPaciente = async (req, res) => {
  try {
    const result = await pacientesService.eliminarPaciente(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  crearPaciente,
  obtenerPacientes,
  obtenerPacientePorId,
  actualizarPaciente,
  eliminarPaciente,
};
