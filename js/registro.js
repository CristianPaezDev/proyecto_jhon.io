import is_letters from "./letras.js"
import is_empty from "./is_empty.js";
import valid from "./valid.js";
import solicitud, { enviar } from "./ajax.js";

const form = document.querySelector("#form-validation");
const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const telefono = document.querySelector("#telefono");
const direccion = document.querySelector("#direccion");
const contrasena = document.querySelector("#contrasena");
const confirmaContrasena = document.querySelector("#confirmarcontrasena");




function numeros(event, element) {
    let regex = /^\d{0,10}$/;
    let newValue = element.value + event.key;
    if (!regex.test(newValue)) {
        event.preventDefault();
    }
}

function contraigual(contrasena, confirmaContrasena) {
    if (contrasena.value !== confirmaContrasena.value) {
        contrasena.classList.add('error');
        confirmaContrasena.classList.add('error');
        alert("Contraseñas no iguales");
        return false;
    } else {
        contrasena.classList.remove('error');
        confirmaContrasena.classList.remove('error');
        return true;
    }
}


form.addEventListener('submit', (event) => {
    let response = valid(event, "form [required]");

    const data = {
        nombre: nombre.value,
        apellido: apellido.value,
        telefono: telefono.value,
        direccion: direccion.value,
        contrasena: contrasena.value,
        confirmaContrasena: confirmaContrasena.value
    }
    console.log(data);

    if(response){
        fetch('http://localhost:3000/cliente',{
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((json) => {
            nombre.value = "";
            apellido.value = "";
            telefono.value = "";
            direccion.value = "";
            contrasena.value = "";
            confirmaContrasena.value = "";
        });
    }
})

nombre.addEventListener("blur", (event) => {
    is_empty(event, nombre)
})

nombre.addEventListener('keypress', (event) => {
    is_letters(event, nombre);
})

apellido.addEventListener('keypress', function (event){
    is_letters(event, apellido);
})

apellido.addEventListener('blur', function (event){
    is_letters(event, apellido);
})

telefono.addEventListener('keypress', function(event) {
    numeros(event, telefono);
});
contrasena.addEventListener('keypress', function(event) {
    numeros(event, contrasena);
});
confirmaContrasena.addEventListener('keypress', function(event) {
    numeros(event, confirmaContrasena);
});

