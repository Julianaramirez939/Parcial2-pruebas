const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Doctores = sequelize.define(
  "Doctores",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    especialidad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "doctores",
    timestamps: false,
  }
);

module.exports = Doctores;
