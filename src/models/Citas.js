const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Citas = sequelize.define(
  "Citas",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hora_inicio: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    hora_fin: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    tableName: "citas",
    timestamps: false,
  }
);

module.exports = Citas;
