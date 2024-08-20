import is_letters from "./letras.js";
import is_empty from "./is_empty.js";
import numeros from "./numeros.js";

const form = document.querySelector("#form-validation");
const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const telefono = document.querySelector("#telefono");
const direccion = document.querySelector("#direccion");
// const contrasena = document.querySelector("#contrasena");
// const confirmaContrasena = document.querySelector("#confirmarcontrasena");

form.addEventListener('submit', (event) => {
    // Prevenir el envío del formulario si hay campos vacíos
    const requiredFields = form.querySelectorAll("[required]");
    const emptyFields = [];
    let isFormValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            emptyFields.push(field.name || field.id || field.placeholder || 'Campo sin nombre');
            isFormValid = false;
        }
    });

    // Validar contraseñas
    // const contrasenaValue = contrasena.value.trim();
    // const confirmaContrasenaValue = confirmaContrasena.value.trim();
    // if (contrasenaValue !== confirmaContrasenaValue) {
    //     alert("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.");
    //     isFormValid = false;
    // }

    if (emptyFields.length > 0) {
        // Mostrar alerta con los campos vacíos
        alert(`Por favor, complete los siguientes campos:\n${emptyFields.join(', ')}`);
        isFormValid = false;
    }

    if (!isFormValid) {
        event.preventDefault();
        return; // Detener el envío del formulario si no es válido
    }

    // Si todos los campos están llenos y las contraseñas coinciden, proceder con el envío
    const data = {
        nombre: nombre.value,
        apellido: apellido.value,
        telefono: telefono.value,
        direccion: direccion.value,
        // contrasena: contrasena.value,
        // confirmaContrasena: confirmaContrasena.value
    };

    console.log(data);

    fetch('http://localhost:3000/cliente', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(json => {
        // Limpiar los campos del formulario
        nombre.value = "";
        apellido.value = "";
        telefono.value = "";
        direccion.value = "";
        // contrasena.value = "";
        // confirmaContrasena.value = "";
    })
    .catch(error => console.error('Error al enviar los datos:', error));
});

// Validación en los eventos blur
nombre.addEventListener("blur", (event) => {
    is_letters(event, nombre);
});

apellido.addEventListener("blur", (event) => {
    is_letters(event, apellido);
});

direccion.addEventListener("blur", (event) => {
    is_empty(event, direccion);
});

telefono.addEventListener("blur", (event) => {
    is_empty(event, telefono);
});

// contrasena.addEventListener("blur", (event) => {
//     is_empty(event, contrasena);
// });

// confirmaContrasena.addEventListener("blur", (event) => {
//     is_empty(event, confirmaContrasena);
// });

// Validación en los eventos keypress
nombre.addEventListener("keypress", (event) => {
    is_letters(event, nombre);
});

apellido.addEventListener("keypress", (event) => {
    is_letters(event, apellido);
});

telefono.addEventListener("keypress", numeros);
// contrasena.addEventListener("keypress", numeros);
// confirmaContrasena.addEventListener("keypress", numeros);
