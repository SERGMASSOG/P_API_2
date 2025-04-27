// Importar las dependencias necesarias de Express
const express = require('express');
const app = express();
const port = 3005; // Puerto donde se ejecutará el servidor
const path = require('path'); // Módulo para manejar rutas de archivos
const connectDB = require('./Config'); // Importar la conexión a la base de datos
const Usuario = require('./Model'); // Importar el modelo

// Importar el módulo de rutas de autenticación
const authRoutes = require('./auth'); // Importar las rutas del archivo auth.js

// Middleware para manejar solicitudes JSON
app.use(express.json()); // Procesa las solicitudes con cuerpo JSON

// Middleware para leer datos de formularios
app.use(express.urlencoded({ extended: true })); // Procesa datos de formularios

// Línea mágica para servir archivos estáticos como HTML, CSS y JS
app.use(express.static(path.join(__dirname)));

// Conectar a la base de datos
connectDB();

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
}); 

// Ruta principal con el formulario de login
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');  // Formulario HTML
});

// Ruta para manejar el login
app.post('/login', async (req, res) => {
  const { usuario, clave } = req.body;
  
  try {
    // Buscar al usuario en la base de datos por el nombre de usuario
    const usuarioencontrado = await Usuario.findOne({ usuario });

    if (!usuarioencontrado) {
      return res.send('Credenciales incorrectas.'); // Usuario no encontrado
    }

    // Verificar si la contraseña proporcionada coincide con la almacenada en la base de datos (en texto plano)
    if (usuarioencontrado.clave === clave) {
      // Si la contraseña es válida
      res.send(`¡Bienvenido a RELOAD, ${usuarioencontrado.usuario}!`); // Mensaje de bienvenida
    } else {
      // Si la contraseña es incorrecta
      res.send('Credenciales incorrectas.');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Error en la base de datos');
  }
});

// Rutas de autenticación (registro de usuario)
app.use('/auth', authRoutes);