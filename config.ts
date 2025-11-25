// Fix for missing types in current environment
const isProduction = (import.meta as any).env.PROD;

// CAMBIAR ESTO: Cuando tengas tu dominio real, reemplaza la URL de abajo.
// Ejemplo: 'https://api.midominio.com' o 'https://chance-backend.dominiotemporal.com'
const PROD_URL = 'https://tu-dominio-backend.com'; 

export const API_BASE_URL = isProduction ? PROD_URL : 'http://localhost:5000';