const express = require("express");
const router = express.Router();
const citasController = require("../controllers/citasController");

router.post("/", citasController.crearCita);
router.get("/", citasController.obtenerCitas);
router.get("/:id", citasController.obtenerCitaPorId);
router.delete("/:id", citasController.cancelarCita);

module.exports = router;
