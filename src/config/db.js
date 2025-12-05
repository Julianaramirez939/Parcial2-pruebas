const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("gestioncitas", "postgres", "1234", {
  host: "localhost",
  dialect: "postgres",
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos exitosa");
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
  }
};

testConnection();

module.exports = sequelize;
