const doctoresService = require("../services/doctoresService");

const crearDoctor = async (req, res) => {
  try {
    const doctor = await doctoresService.crearDoctor(req.body);
    res.status(201).json(doctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const obtenerDoctores = async (req, res) => {
  try {
    const doctores = await doctoresService.obtenerDoctores();
    res.status(200).json(doctores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerDoctorPorId = async (req, res) => {
  try {
    const doctor = await doctoresService.obtenerDoctorPorId(req.params.id);
    if (!doctor) return res.status(404).json({ error: "Doctor no encontrado" });
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const actualizarDoctor = async (req, res) => {
  try {
    const doctor = await doctoresService.actualizarDoctor(req.params.id, req.body);
    res.status(200).json(doctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const eliminarDoctor = async (req, res) => {
  try {
    const result = await doctoresService.eliminarDoctor(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  crearDoctor,
  obtenerDoctores,
  obtenerDoctorPorId,
  actualizarDoctor,
  eliminarDoctor,
};
