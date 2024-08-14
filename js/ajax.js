import { URL } from "./config.js";

const solicitud = async (endpoint) => {
    try {
        let solicitud = await fetch(`${URL}/${endpoint}`);
        let data = await solicitud.json();
        return data;
    } catch (error){
        return error;
    }
};

export const enviar = async (endpoint, options) =>{
    try {
        let solicitud = await fetch(`${URL}/${endpoint}`, options);
        let data = await solicitud.json();
        return data;
    } catch (error){
        return error;
    }
};

export default solicitud