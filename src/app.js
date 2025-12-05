const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const pacientesRoutes = require("./routes/pacientesRoutes");
const doctoresRoutes = require("./routes/doctoresRoutes");
const citasRoutes = require("./routes/citasRoutes");

const app = express();

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  })
);

app.use(bodyParser.json());
app.use(express.json());

app.use("/pacientes", pacientesRoutes);
app.use("/doctores", doctoresRoutes);
app.use("/citas", citasRoutes);

module.exports = app;
