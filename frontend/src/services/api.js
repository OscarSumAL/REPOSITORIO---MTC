import axios from 'axios';

const api = axios.create({
    baseURL: `${window.location.origin}/api`, // Detecta automáticamente la URL base
    withCredentials: true, // Para enviar cookies de sesión
});

export default api;
