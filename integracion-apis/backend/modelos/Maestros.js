const sequelize = require('../db/connection');
const { DataTypes } = require('sequelize');


const Maestros = sequelize.define('Maestros', {
    idMaestro :{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    edad :{
        type: DataTypes.INTEGER,
    },
},{
    tableName: 'Maestros',
    timestamps: false,
});

module.exports = Maestros;