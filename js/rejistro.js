let nombre = document.querySelector("#nombre")
let apellido = document.querySelector("#apellido")
let telefono = document.querySelector("#telefono")
let contrasena = document.querySelector("#contrasena")
let confirmaContrasena = document.querySelector("#confirmarcontrasena")

function letras(event, elemento) {
    let regex = /^[a-zA-Zá\s]+$/;
    if (regex.test(event.key)) {
        console.log("Bien");
    }
    else{
        event.preventDefault()
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
    if(contrasena.value === confirmaContrasena.value){
        alert("Contraseñas iguales");
        return true;
    }else{
        alert("Contraseñas no iguales");
        return false;
    }
}



nombre.addEventListener("keypress", letras)

apellido.addEventListener("keypress", letras)

telefono.addEventListener('keypress', function(event) {
    numeros(event, telefono);
});

contrasena.addEventListener('keypress', function(event) {
    numeros(event, contrasena);
});

confirmaContrasena.addEventListener('keypress', function(event) {
    numeros(event, confirmaContrasena);
});







// function contrasenaValida(event, element) {
//     let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*s).{8,15}$/;
  
//     if (regex.test(element.value)) {
//       alert("Contraseña válida");
//     } else {
//       alert("Contraseña no válida. Debe contener al menos una minúscula, una mayúscula, un número, un carácter especial (que no sea 's') y tener entre 8 y 15 caracteres.");
//     }
//   }
  
//   contrasena.addEventListener('input', function(event) {
//     contrasenaValida(event, contrasena);
//   });