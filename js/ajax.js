import { URL } from "./config.js";

const solicitud = async (endpoint) => {
    try {
        let respuesta = await fetch(`${URL}/${endpoint}`);

        if (!respuesta.ok) {
            throw new Error(`HTTP error! Status: ${respuesta.status}`);
        }

        let data = await respuesta.json();
        return data;
    } catch (error) {
        console.error('Error en la solicitud:', error.message || error);
        return { error: error.message || 'Error desconocido' };
    }
};


export const enviar = async (endpoint, options) => {
    try {
        let respuesta = await fetch(`${URL}/${endpoint}`, options);
        
        if (!respuesta.ok) {
            throw new Error(`HTTP error! Status: ${respuesta.status}`);
        }
        
        let data = await respuesta.json();
        return data;
    } catch (error) {
        console.error('Error en la solicitud de envío:', error.message || error);
        return { error: error.message || 'Error desconocido' };
    }
};

export default solicitud;
