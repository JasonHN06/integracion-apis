const sequelize = require("../db/connection");
const { DataTypes } = require("sequelize");

const Productos = sequelize.define(
  "Productos",
  {
    idProducto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM("Disponible", "No disponible"),
      allowNull: false,
      defaultValue: "Disponible",
    },
    categoria: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    url_fotografia: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "productos",
    timestamps: false,
  },
);

module.exports = Productos;
