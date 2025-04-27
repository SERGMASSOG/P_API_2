// Cargar las variables de entorno desde el archivo .env
require('dotenv').config();

const mongoose = require('mongoose');

// Función para conectar a la base de datos de MongoDB
const connectDB = async () => {
  try {
    // Usar la variable de entorno MONGO_URI para la conexión
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Conexión exitosa a MongoDB');
  } catch (err) {
    console.error('Error al conectar a MongoDB:', err);
    process.exit(1); // Salir del proceso si no se puede conectar
  }
};

module.exports = connectDB; 