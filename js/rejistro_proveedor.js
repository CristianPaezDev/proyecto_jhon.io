import is_letters from "./letras.js";
import is_empty from "./is_empty.js";
import numeros from "./numeros.js";
import solicitud from "./ajax.js"; // Para realizar la solicitud de marcas

const form = document.querySelector("#form-validation");
const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const telefono = document.querySelector("#telefono");
const direccion = document.querySelector("#direccion");
const marcasContainer = document.getElementById('marcas-container');

// Cargar las marcas al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const marcas = await solicitud('marca'); // Ajusta la URL según sea necesario

    if (marcas && Array.isArray(marcas)) {
      marcas.forEach(marca => {
        const div = document.createElement('div');
        div.className = 'marcas-item';
      
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `marca-${marca.nombre}`;
        checkbox.value = marca.id;
        checkbox.name = 'marcas';
      
        const label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.textContent = marca.nombre;
      
        div.appendChild(checkbox);
        div.appendChild(label);
        marcasContainer.appendChild(div);      
      });      
    }
  } catch (error) {
    console.error('Error al obtener las marcas:', error);
  }
});

// Validación y envío del formulario
form.addEventListener("submit", (event) => {
  const requiredFields = form.querySelectorAll("[required]");
  const emptyFields = [];
  let isFormValid = true;

  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      emptyFields.push(field.name || field.id || field.placeholder || "Campo sin nombre");
      isFormValid = false;
    }
  });

  if (emptyFields.length > 0) {
    alert(`Por favor, complete los siguientes campos:\n${emptyFields.join(", ")}`);
    isFormValid = false;
  }

  if (!isFormValid) {
    event.preventDefault();
    return;
  }

});

document.getElementById('form-validation').addEventListener('submit', async (event) => {
  event.preventDefault();

  // Obtener las marcas seleccionadas
  const marcasSeleccionadas = Array.from(document.querySelectorAll('input[name="marcas"]:checked'))
    .map(checkbox => checkbox.value);

  if(marcasSeleccionadas.length === 0){
    alert("Debes seleccionar al menos una marca para enviar el formulario")
    return
  }

  // Construir el objeto de datos a enviar
  const data = {
    nombre: nombre.value,
    apellido: apellido.value,
    telefono: telefono.value,
    direccion: direccion.value,
    marcas: marcasSeleccionadas
  };

  console.log(data);

  fetch("http://localhost:3000/proveedor", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      // Limpiar los campos del formulario
      nombre.value = "";
      apellido.value = "";
      telefono.value = "";
      direccion.value = "";
      // Limpiar los checkboxes de marcas
      document.querySelectorAll('input[name="marcas"]:checked').forEach(checkbox => {
        checkbox.checked = false;
      });
    })
    .catch((error) => console.error("Error al enviar los datos:", error));

    window.location.href = 'proveedor.html'; 

})

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

// Validación en los eventos keypress
nombre.addEventListener("keypress", (event) => {
  is_letters(event, nombre);
});

apellido.addEventListener("keypress", (event) => {
  is_letters(event, apellido);
});

telefono.addEventListener("keypress", numeros);
