import solicitud from "./ajax.js";

const $template = document.getElementById("users").content;
const fragmento = document.createDocumentFragment();
const tableBody = document.querySelector("#tbody");

const normalizeProviderData = (provider) => {
    return {
        id: provider.id,
        first_name: provider.Nombre || provider.nombre || "",
        last_name: provider.Apellido || provider.apellido || "",
        phone: provider.Telefono || provider.telefono || "",
        address: provider.Direccion || provider.direccion || "",
    };
};

const listar = async () => {
    try {
        const data = await solicitud('proveedor');

        if (data.error) {
            throw new Error(data.error);
        }

        if (!Array.isArray(data)) {
            throw new Error('Formato de datos inesperado');
        }

        const providers = data.map(normalizeProviderData);

        providers.forEach((element) => {
            const clone = document.importNode($template, true);
            clone.querySelector("tr").id = `user_${element.id}`;
            clone.querySelector(".id").textContent = element.id; // Añadido para mostrar el ID
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
        console.error('Error al listar los proveedores:', error.message || error);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    listar();
});

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('edit')){
        const row = event.target.closest('tr');
        const id = row.querySelector('.id').textContent.trim();

        localStorage.setItem('editProveedorId', id);
        window.location.href = 'editarProveedor.html';
    }
})
