import is_letters from "./letras.js";
import is_empty from "./is_empty.js";
import valid from "./valid.js";
import numeros from "./numeros.js";

const form = document.querySelector("#form-validation");
const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const telefono = document.querySelector("#telefono");
const direccion = document.querySelector("#direccion");
const contrasena = document.querySelector("#contrasena");
const confirmaContrasena = document.querySelector("#confirmarcontrasena");

document
  .getElementById("form-validation")
  .addEventListener("submit", function (event) {
    // Obtener los valores de los campos de contraseña
    const contrasena = document.getElementById("contrasena").value;
    const confirmarContrasena = document.getElementById(
    "confirmarcontrasena"
    ).value;

    // Comparar las contraseñas
    if (contrasena !== confirmarContrasena) {
      event.preventDefault(); // Evitar el envío del formulario
    alert("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.");
    }
});

const cantidad = (elemento) => {
  let valor = elemento.value.length === 10;
  if (valor) {
    elemento.classList.remove("error");
    elemento.classList.add("correcto");
  } else {
    elemento.classList.remove("correcto");
    elemento.classList.add("error");
  }
};

form.addEventListener("submit", (event) => {
  let response = valid(event, "form [required]");

  const data = {
    nombre: nombre.value,
    apellido: apellido.value,
    telefono: telefono.value,
    direccion: direccion.value,
    contrasena: contrasena.value,
    confirmaContrasena: confirmaContrasena.value,
  };
  console.log(data);

  if (response) {
    fetch("http://localhost:3000/cliente", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
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
});

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
  cantidad(telefono);
  numeros(event, telefono);
});

contrasena.addEventListener("blur", (event) => {
  is_empty(event, contrasena);
});

confirmaContrasena.addEventListener("blur", (event) => {
  is_empty(event, confirmaContrasena);
});

nombre.addEventListener("keypress", (event) => {
  is_letters(event, nombre);
});

apellido.addEventListener("keypress", (event) => {
  is_letters(event, apellido);
});

telefono.addEventListener("keypress", numeros);

contrasena.addEventListener("keypress", numeros);

confirmaContrasena.addEventListener("keypress", numeros);
