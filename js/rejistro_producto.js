import is_letters from "./letras.js";
import is_empty from "./is_empty.js";
import valid from "./valid.js";
import numeros from "./numeros.js";
import solicitud, { enviar } from  "./ajax.js";

const form = document.querySelector("#form-validation");
const nombre = document.querySelector("#nombre");
const tipo = document.querySelector("#tipo");
const cantidad = document.querySelector("#cantidad");
const marca = document.querySelector("#marca");
const precio = document.querySelector("#precio");
const fech_venc = document.querySelector("#fech_venc");
const proveedor = document.querySelector("#proveedor");
const descripcion = document.querySelector("#descripcion");

const tipos = () => {
    const fragmento = document.createDocumentFragment();
    let option = document.createElement("option");
    option.value = "";
    option.textContent = "Seleccione...";
    fragmento.appendChild(option);

    solicitud("tipo")
        .then((data) => {
            data.forEach(element => {
                let option = document.createElement("option");
                option.value = element.id;
                option.textContent = element.nombre;
                fragmento.appendChild(option);
            });
            tipo.appendChild(fragmento);
        });
}

const proveedores = () => {
    const $fragmento = document.createDocumentFragment();
    let option = document.createElement("option");
    option.value = "";
    option.textContent = "Seleccione...";
    $fragmento.appendChild(option);

    solicitud("proveedor")
        .then((data) => {
            data.forEach(element => {
                let option = document.createElement("option");
                option.value = element.id;
                option.textContent = element.nombre;
                $fragmento.appendChild(option);
            });
            proveedor.appendChild($fragmento);
        });
}


tipos();
proveedores();

form.addEventListener('submit', (event) => {
    const requiredFields = form.querySelectorAll("[required]");
    const emptyFields = [];
    let isFormValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            emptyFields.push(field.name || field.id || field.placeholder || 'Campo sin nombre');
            isFormValid = false;
        }
    });

    if (emptyFields.length > 0) {
        alert(`Por favor, complete los siguientes campos:\n${emptyFields.join(', ')}`);
        isFormValid = false;
    }

    if (!isFormValid) {
        event.preventDefault();
        return;
    }

    const data = {
        nombre: nombre.value,
        tipo: tipo.value,
        cantidad: cantidad.value,
        marca: marca.value,
        precio: precio.value,
        fech_venc: fech_venc.value,
        proveedor: proveedor.value,
        descripcion: descripcion.value,
    };

    console.log(data);

    fetch('http://localhost:3000/producto', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(json => {
        nombre.value = "";
        tipo.value = "";
        cantidad.value = "";
        marca.value = "";
        precio.value = "";
        fech_venc.value = "";
        proveedor.value = "";
        descripcion.value = "";
    })
    .catch(error => console.error('Error al enviar los datos:', error));
});

// Validación en los eventos blur
nombre.addEventListener("blur", (event) => {
    is_letters(event, nombre);
});

tipo.addEventListener("blur", (event) => {
    is_letters(event, tipo);
});

cantidad.addEventListener("blur", (event) => {
    is_empty(event, cantidad);
});

marca.addEventListener("blur", (event) => {
    is_empty(event, marca);
});

precio.addEventListener("blur", (event) => {
    is_empty(event, precio);
});

fech_venc.addEventListener("blur", (event) => {
    is_empty(event, fech_venc);
});


descripcion.addEventListener("blur", (event) => {
    is_empty(event, descripcion);
});

// Validación en los eventos keypress
nombre.addEventListener("keypress", (event) => {
    is_letters(event, nombre);
});

tipo.addEventListener("keypress", (event) => {
    is_letters(event, tipo);
});

// proveedor.addEventListener("keypress", (event) => {
//     is_letters(event, proveedor);
// });

cantidad.addEventListener("keypress", numeros);

precio.addEventListener("keypress", numeros);
