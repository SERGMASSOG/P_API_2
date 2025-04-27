const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Definir el esquema
const usuarioSchema = new mongoose.Schema({
  usuario: { type: String, required: true, unique: true },
  clave: { type: String, required: true }
});

// Crear el modelo
const Usuario = mongoose.model('api', usuarioSchema, 'api');

module.exports = Usuario;