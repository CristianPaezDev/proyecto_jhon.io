import solicitud from "./ajax.js";

const $template = document.getElementById("users").content;
const fragmento = document.createDocumentFragment();
const tableBody = document.querySelector("#tbody");

const normalizeClientData = (client) => {
    return {
        id: client.id,
        first_name: client.Nombre || client.nombre || "",
        last_name: client.Apellido || client.apellido || "",
        phone: client.Telefono || client.telefono || "",
        address: client.Direccion || client.direccion || "",
        // type_id: client.Contrasena || client.contrasena || ""  
    };
};

const listar = async () => {
    try {
        const data = await solicitud('cliente');
        
        // console.log('Datos recibidos:', data);  

        if (data.error) {
            throw new Error(data.error);
        }

        if (!Array.isArray(data)) {
            throw new Error('Formato de datos inesperado');
        }

        const clients = data.map(normalizeClientData);

        clients.forEach((element) => {
            const clone = document.importNode($template, true);
            clone.querySelector("tr").id = `user_${element.id}`;
            clone.querySelector(".id").textContent = element.id; 
            clone.querySelector(".first_name").textContent = element.first_name;
            clone.querySelector(".last_name").textContent = element.last_name;
            clone.querySelector(".phone").textContent = element.phone;
            clone.querySelector(".address").textContent = element.address;
            // clone.querySelector(".type_id").textContent = element.type_id;  

            clone.querySelector(".edit").setAttribute("data-id", element.id);
            clone.querySelector(".delete").setAttribute("data-id", element.id);

            fragmento.appendChild(clone);
        });

        tableBody.appendChild(fragmento);
    } catch (error) {
        console.error('Error al listar los clientes:', error.message || error);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    listar();
});


document.addEventListener('click', (event) => {
    if (event.target.classList.contains('edit')) {
        const row = event.target.closest('tr');
        const id = row.querySelector('.id').textContent.trim();

        // Guardar el ID en el localStorage
        localStorage.setItem('editClientId', id);

        // Redirigir a la página de edición
        window.location.href = 'editarCliente.html';
    }
});

