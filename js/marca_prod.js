import is_letters from "./letras.js";

const form = document.querySelector("#form-validation");
const nombre = document.querySelector("#nombre");


form.addEventListener("submit", (event) => {
  // Prevenir el envío del formulario si el campo nombre está vacío
  let isFormValid = true;

  if (!nombre.value.trim()) {
    alert("Por favor, ingresa el nombre de la marca.");
    isFormValid = false;
  }

  if (!isFormValid) {
    event.preventDefault();
    return; // Detener el envío del formulario si no es válido
  }

  // Si el campo nombre está lleno, proceder con el envío
  const data = {
    nombre: nombre.value
  };

  console.log(data);

  fetch("http://localhost:3000/marca", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      // Limpiar el campo del formulario
      nombre.value = "";
    })
    .catch((error) => console.error("Error al enviar los datos:", error));
});

// Validación en los eventos blur
nombre.addEventListener("blur", (event) => {
  is_letters(event, nombre);
});

// Validación en los eventos keypress
nombre.addEventListener("keypress", (event) => {
  is_letters(event, nombre);
});
