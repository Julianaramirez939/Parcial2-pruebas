const sequelize = require("../config/db");

const Pacientes = require("./Pacientes");
const Doctores = require("./Doctores");
const Citas = require("./Citas");

Pacientes.hasMany(Citas, { foreignKey: "paciente_id" });
Citas.belongsTo(Pacientes, { foreignKey: "paciente_id" });

Doctores.hasMany(Citas, { foreignKey: "doctor_id" });
Citas.belongsTo(Doctores, { foreignKey: "doctor_id" });

const syncDB = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Tablas sincronizadas correctamente");
  } catch (error) {
    console.error("Error sincronizando las tablas:", error);
  }
};

module.exports = {
  sequelize,
  Pacientes,
  Doctores,
  Citas,
  syncDB
};
