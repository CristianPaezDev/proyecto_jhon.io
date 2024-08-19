import solicitud, { enviar } from  "./ajax.js";
import is_empty from "./is_empty.js";
import numeros from "./numeros.js";

const empleado = document.querySelector("#empleado");
const cliente = document.querySelector("#cliente");
const producto = document.querySelector("#producto");
const descripcion = document.querySelector("#descripcion");
const precio = document.querySelector("#precio");
const cantidad = document.querySelector("#cantidad");
const tbody = document.querySelector("#tbody");
const template = document.querySelector("#users");

const empleados = () => {
    const fragmento = document.createDocumentFragment();
    let option = document.createElement("option");
    option.value = "";
    option.textContent = "Seleccione...";
    fragmento.appendChild(option);

    solicitud("empleado")
        .then((data) => {
            data.forEach(element => {
                let option = document.createElement("option");
                option.value = element.id;
                option.textContent = element.nombre;
                fragmento.appendChild(option);
            });
            empleado.appendChild(fragmento);
        });
}

const clientes = () => {
    const fragmento = document.createDocumentFragment();
    let option = document.createElement("option");
    option.value = "";
    option.textContent = "Seleccione...";
    fragmento.appendChild(option);

    solicitud("cliente")
        .then((data) => {
            data.forEach(element => {
                let option = document.createElement("option");
                option.value = element.id;
                option.textContent = element.nombre;
                fragmento.appendChild(option);
            });
            cliente.appendChild(fragmento);
        });
}


const productos = () => {
    const fragmento = document.createDocumentFragment();
    let option = document.createElement("option");
    option.value = "";
    option.textContent = "Seleccione...";
    fragmento.appendChild(option);

    solicitud("producto")
        .then((data) => {
            data.forEach(element => {
                let option = document.createElement("option");
                option.value = element.id;
                option.textContent = element.nombre;
                option.dataset.descripcion = element.descripcion; 
                option.dataset.precio = element.precio;  
                fragmento.appendChild(option);
            });
            producto.appendChild(fragmento);
        });

    producto.addEventListener("change", (event) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        descripcion.value = selectedOption.dataset.descripcion || "";
        precio.value = selectedOption.dataset.precio || "";
    });
};

document.querySelector(".agg").addEventListener("click", (event) => {
    event.preventDefault();

    if (producto.value === "" || cantidad.value === "" || parseInt(cantidad.value) <= 0) {
        alert("Debe seleccionar un producto y una cantidad válida.");
        return;
    }

    const clone = template.content.cloneNode(true);
    clone.querySelector(".nom_producto").textContent = producto.options[producto.selectedIndex].textContent;
    clone.querySelector(".codigo").textContent = producto.value;
    clone.querySelector(".pre_producto").textContent = precio.value;
    clone.querySelector(".cant_producto").textContent = cantidad.value;
    clone.querySelector(".total").textContent = (parseFloat(precio.value) * parseInt(cantidad.value)).toFixed(2);

    tbody.appendChild(clone);

    // Limpiar los campos después de añadir el producto
    producto.value = "";
    descripcion.value = "";
    precio.value = "";
    cantidad.value = "";
});

productos();
empleados();
clientes();

empleado.addEventListener("change", () => is_empty(empleado));
cliente.addEventListener("change", () => is_empty(cliente));
producto.addEventListener("change", () => is_empty(producto));

cantidad.addEventListener("blur", (event) => {
    is_empty(cantidad);
});

cantidad.addEventListener("keypress", numeros);
