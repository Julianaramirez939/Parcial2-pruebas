const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Pacientes = sequelize.define(
  "Pacientes",
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      unique: true,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[0-9]{7,15}$/i,
      },
    },
  },
  {
    tableName: "pacientes",
    timestamps: false,
  }
);

module.exports = Pacientes;
