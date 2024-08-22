import solicitud from "./ajax.js";

const $template = document.getElementById("users").content;
const fragmento = document.createDocumentFragment();
const tableBody = document.querySelector("#tbody");

const normalizeProviderData = (provider) => {
    return {
        id: provider.id,
        first_name: provider.nombre || "",
        last_name: provider.apellido || "",
        phone: provider.telefono || "",
        address: provider.direccion || "",
        brands: provider.marcas ? provider.marcas.map(id => marcasMap[id] || id).join(', ') : "No asignadas"
    };
};

const listar = async () => {
    try {
        // Cargar marcas antes de listar proveedores
        await cargarMarcas();

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
            clone.querySelector(".id").textContent = element.id;
            clone.querySelector(".first_name").textContent = element.first_name;
            clone.querySelector(".last_name").textContent = element.last_name;
            clone.querySelector(".phone").textContent = element.phone;
            clone.querySelector(".address").textContent = element.address;
            clone.querySelector(".brands").textContent = element.brands;

            clone.querySelector(".edit").setAttribute("data-id", element.id);
            clone.querySelector(".delete").setAttribute("data-id", element.id);

            fragmento.appendChild(clone);
        });

        tableBody.appendChild(fragmento);
    } catch (error) {
        console.error('Error al listar los proveedores:', error.message || error);
    }
};

// Mapeo de marcas
const marcasMap = {};

const cargarMarcas = async () => {
    try {
        const response = await fetch('http://localhost:3000/marca');
        if (!response.ok) {
            throw new Error('Error al cargar las marcas');
        }
        const marcas = await response.json();
        marcas.forEach(marca => {
            marcasMap[marca.id] = marca.nombre;
        });
    } catch (error) {
        console.error('Error al cargar las marcas:', error.message || error);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    listar();
});

document.addEventListener('click', async (event) => {
    if (event.target.classList.contains('edit')) {
        const row = event.target.closest('tr');
        const id = row.querySelector('.id').textContent.trim();

        localStorage.setItem('editProveedorId', id);
        window.location.href = 'editarProveedor.html';
    }

    if (event.target.classList.contains('delete')) {
        const row = event.target.closest('tr');
        const id = row.querySelector('.id').textContent.trim();

        const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este proveedor?');
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:3000/proveedor/${id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Error al eliminar el proveedor');
                }

                row.remove(); // Eliminar la fila de la tabla
                console.log('Proveedor eliminado exitosamente');
            } catch (error) {
                console.error('Error al eliminar el proveedor:', error.message || error);
            }
        }
    }
});
