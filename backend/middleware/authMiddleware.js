
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // RUTA CORREGIDA

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Obtener token del header ('Bearer TOKEN')
            token = req.headers.authorization.split(' ')[1];

            // Verificar el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Obtener el usuario del token y adjuntarlo al objeto req
            // Excluimos la contraseña del objeto de usuario
            req.user = await User.findById(decoded.id).select('-password');

            next(); // Continuar con la siguiente función de middleware
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'No autorizado, el token falló' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'No autorizado, no se encontró un token' });
    }
};

module.exports = { protect };