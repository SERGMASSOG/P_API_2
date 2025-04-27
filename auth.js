const express = require('express');
const Usuario = require('./Model'); // Importar el modelo

const router = express.Router();

// Ruta para crear un nuevo usuario
router.post('/registro', async (req, res) => {
  const { usuario, clave } = req.body;

  try {
    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ usuario });
    if (usuarioExistente) {
      return res.status(400).send('El usuario ya existe');
    }

    // Crear un nuevo usuario con la contraseña en texto plano
    const nuevoUsuario = new Usuario({
      usuario,
      clave // Guardar la contraseña tal cual sin encriptarla
    });

    // Guardar el usuario en la base de datos
    await nuevoUsuario.save();

    res.status(201).send('Usuario registrado exitosamente');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error al registrar el usuario');
  }
});

module.exports = router;
