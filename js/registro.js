import {letras} from "./letras";

let form = document.querySelector("#form-validation");
let nombre = document.querySelector("#nombre");
let apellido = document.querySelector("#apellido");
let telefono = document.querySelector("#telefono");
let direccion = document.querySelector("#direccion");
let contrasena = document.querySelector("#contrasena");
let confirmaContrasena = document.querySelector("#confirmarcontrasena");



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

nombre.addEventListener('keypress', function (event){
    letras(event, nombre);
})

nombre.addEventListener('blur', function (event){
    letras(event, nombre);
})


apellido.addEventListener("keypress", (event) => letras(event, apellido));
telefono.addEventListener('keypress', function(event) {
    numeros(event, telefono);
});
contrasena.addEventListener('keypress', function(event) {
    numeros(event, contrasena);
});
confirmaContrasena.addEventListener('keypress', function(event) {
    numeros(event, confirmaContrasena);
});

form.addEventListener('submit', validarFormulario);
