const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes'); // Importar rutas de proyectos

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Para parsear JSON

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ MongoDB conectado exitosamente'))
.catch((err) => {
    console.error('----------------------------------------------------');
    console.error('❌ Error al conectar a MongoDB:');
    console.error(`- Mensaje: ${err.message}`);
    console.error('----------------------------------------------------');
    console.error('🤔 POSIBLES SOLUCIONES:');

    if (err.message.includes('authentication failed')) {
        console.error('-> ¡FALLÓ LA AUTENTICACIÓN! El problema es casi seguro tu usuario o contraseña.');
        console.error('   1. Revisa que la contraseña en tu archivo .env sea la correcta.');
        console.error('   2. Si tu contraseña tiene caracteres especiales (@, #, $, etc.), ¡debes codificarla!');
        console.error('      Visita https://www.urlencoder.org/ para codificar tu contraseña y usa el resultado.');
    } else if (err.message.includes('querySrv ENOTFOUND')) {
        console.error('-> ¡DIRECCIÓN NO ENCONTRADA! La dirección de tu clúster en .env parece ser incorrecta.');
        console.error('   1. Asegúrate de haber copiado la cadena de conexión completa desde MongoDB Atlas.');
        console.error('   2. Verifica que no haya espacios o caracteres extraños en la línea de MONGO_URI.');
    } else {
        console.error('-> Revisa tu archivo `backend/.env` y verifica que:');
        console.error('   1. La cadena de conexión MONGO_URI sea la correcta desde Atlas.');
        console.error('   2. Hayas reemplazado <TU_CONTRASEÑA_REAL> con tu contraseña real (y codificada si es necesario).');
        console.error('   3. Tu dirección IP actual esté permitida en MongoDB Atlas (Network Access > Add IP Address).');
    }
    console.error('----------------------------------------------------');
});


// Rutas
app.get('/api', (req, res) => {
  res.send('API de Chance funcionando correctamente!');
});

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes); // Usar rutas de proyectos

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
