import is_letters from "./letras.js";
import is_empty from "./is_empty.js";
import numeros from "./numeros.js";
import solicitud, { enviar } from "./ajax.js";

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
                option.value = element.nombre;
                option.textContent = element.nombre;
                fragmento.appendChild(option);
            });
            tipo.appendChild(fragmento);
        });
}

const proveedores = () => {
    const fragmento = document.createDocumentFragment();
    let option = document.createElement("option");
    option.value = "";
    option.textContent = "Seleccione...";
    fragmento.appendChild(option);

    solicitud("proveedor")
        .then((data) => {
            data.forEach(element => {
                let option = document.createElement("option");
                option.value = element.id;
                option.textContent = element.nombre;
                fragmento.appendChild(option);
            });
            proveedor.appendChild(fragmento);
        });
}

// Función para cargar las marcas según el proveedor seleccionado
const cargarMarcas = async (proveedorId) => {
    if (!proveedorId) return;

    try {
        // Obtener el proveedor con el ID seleccionado
        const proveedorData = await solicitud(`proveedor/${proveedorId}`);
        
        // Verifica si el proveedor tiene marcas
        if (proveedorData && proveedorData.marcas) {
            // Obtén las marcas de todos los proveedores
            const todasLasMarcas = await solicitud('marca');
            
            // Filtra las marcas correspondientes al proveedor
            const marcasFiltradas = todasLasMarcas.filter(marca => proveedorData.marcas.includes(marca.id));
            
            marca.innerHTML = '<option value="">Seleccione una marca</option>'; // Limpiar opciones anteriores
            
            marcasFiltradas.forEach(element => {
                let option = document.createElement("option");
                option.value = element.nombre;
                option.textContent = element.nombre;
                marca.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error al cargar las marcas:', error);
    }
};



proveedor.addEventListener("change", (event) => {
    const proveedorId = event.target.value;
    cargarMarcas(proveedorId);
});

// Ejecutar las funciones de carga inicial
tipos();
proveedores();

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    let isFormValid = true; 

    //toISOString() convierte un objeto Date a una cadena, La t separa la fecha de la hora en un array 
    const fet = new Date(fech_venc.value).toISOString().split('T')[0];
    const act = new Date().toISOString().split('T')[0];

    if (fet <= act) {
        alert("No puedes ingresar una fecha menor o igual a la de hoy");
        isFormValid = false;
    }

    const requiredFields = form.querySelectorAll("[required]");
    const emptyFields = [];

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
        return; // Si hay errores, no se envía el formulario
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

    window.location.href = 'producto.html';
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

cantidad.addEventListener("keypress", numeros);

precio.addEventListener("keypress", numeros);
