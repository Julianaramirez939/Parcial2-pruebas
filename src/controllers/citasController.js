const citasService = require("../services/citasService");

const crearCita = async (req, res) => {
  try {
    const cita = await citasService.crearCita(req.body);
    res.status(201).json(cita);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const obtenerCitas = async (req, res) => {
  try {
    const citas = await citasService.obtenerCitas();
    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerCitaPorId = async (req, res) => {
  try {
    const cita = await citasService.obtenerCitaPorId(req.params.id);

    if (!cita) {
      return res.status(404).json({ error: "Cita no encontrada" });
    }

    res.status(200).json(cita);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const cancelarCita = async (req, res) => {
  try {
    const result = await citasService.eliminarCita(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  crearCita,
  obtenerCitas,
  obtenerCitaPorId,
  cancelarCita,
};
