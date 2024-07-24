let nombre = document.querySelector("#nombre");
let apellido = document.querySelector("#apellido");
let telefono = document.querySelector("#telefono");
let direccion = document.querySelector("#direccion");
let contrasena = document.querySelector("#contrasena");
let confirmaContrasena = document.querySelector("#confirmarcontrasena");
let form = document.querySelector("#form-validation");

function letras(event, elemento) {
    let regex = /^[a-zA-Zá\s]+$/;
    if (!regex.test(event.key)) {
        event.preventDefault();
    }
}

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

function validarFormulario(event) {
    event.preventDefault();
    let isValid = true;

    let inputs = [nombre, apellido, telefono, direccion, contrasena, confirmaContrasena];
    
    inputs.forEach(input => {
        if (input.value.trim() === "") {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });

    if (!contraigual(contrasena, confirmaContrasena)) {
        isValid = false;
    }

    if (isValid) {
        alert("Rejistro completado con éxito");
        form.submit(); 
    } else {
        alert("Por favor completa todos los campos correctamente.");
    }
}

nombre.addEventListener("keypress", (event) => letras(event, nombre));
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
