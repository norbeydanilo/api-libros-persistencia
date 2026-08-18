const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Libro = sequelize.define('Libro', {
  // isbn es la clave primaria y la proporciona el usuario al crear el libro.
  // Sequelize NO generará un id automático porque definimos la primaryKey aquí.
  isbn: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  año: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  disponible: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'libros',
  timestamps: true,
});

module.exports = Libro;