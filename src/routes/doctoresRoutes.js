const express = require("express");
const router = express.Router();
const doctoresController = require("../controllers/doctoresController");

router.post("/", doctoresController.crearDoctor);
router.get("/", doctoresController.obtenerDoctores);
router.get("/:id", doctoresController.obtenerDoctorPorId);
router.put("/:id", doctoresController.actualizarDoctor);
router.delete("/:id", doctoresController.eliminarDoctor);

module.exports = router;
