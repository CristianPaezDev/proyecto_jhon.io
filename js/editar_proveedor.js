import solicitud, { enviar } from "./ajax.js";

document.addEventListener('DOMContentLoaded', async () => {
    // Obtener el ID del proveedor a editar
    const proveedorId = localStorage.getItem('editProveedorId');
    console.log('ID del proveedor:', proveedorId);

    if (proveedorId) {
        try {
            // Obtener los datos del proveedor desde el servidor
            const proveedor = await solicitud(`proveedor/${proveedorId}`);

            if (proveedor) {
                // Llenar los campos del formulario con los datos del proveedor
                document.getElementById('nombre').value = proveedor.nombre || proveedor.Nombre;
                document.getElementById('apellido').value = proveedor.apellido || proveedor.Apellido;
                document.getElementById('telefono').value = proveedor.telefono || proveedor.Telefono;
                document.getElementById('direccion').value = proveedor.direccion || proveedor.Direccion;
                document.getElementById('user_id').value = proveedor.id;

                // Obtener las marcas disponibles
                const marcas = await solicitud('marca');

                // Crear los checkboxes para las marcas
                const marcasContainer = document.getElementById('marcas-container');
                marcasContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar los checkboxes

                if (marcas && Array.isArray(marcas)) {
                    marcas.forEach(marca => {
                        const div = document.createElement('div');
                        div.className = 'marcas-item';

                        const checkbox = document.createElement('input');
                        checkbox.type = 'checkbox';
                        checkbox.id = `marca-${marca.id}`;
                        checkbox.value = marca.id;
                        checkbox.name = 'marcas';

                        const label = document.createElement('label');
                        label.htmlFor = checkbox.id;
                        label.textContent = marca.nombre;

                        div.appendChild(checkbox);
                        div.appendChild(label);
                        marcasContainer.appendChild(div);

                        // Marcar las marcas seleccionadas
                        if (proveedor.marcas && proveedor.marcas.includes(marca.id)) {
                            checkbox.checked = true;
                        }
                    });
                }
            }
        } catch (error) {
            console.error('Error al obtener los datos del proveedor:', error);
        }
    }
});

// Manejar la edición del proveedor
document.getElementById('form-validation').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Obtener las marcas seleccionadas
    const marcasSeleccionadas = Array.from(document.querySelectorAll('input[name="marcas"]:checked'))
        .map(checkbox => checkbox.value);

    // Verificar si al menos una marca ha sido seleccionada
    if (marcasSeleccionadas.length === 0) {
        alert("Debes seleccionar al menos una marca antes de guardar los cambios.");
        return; // Detener el envío del formulario
    }

    const proveedorActualizado = {
        id: document.getElementById('user_id').value,
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        telefono: document.getElementById('telefono').value,
        direccion: document.getElementById('direccion').value,
        marcas: marcasSeleccionadas
    };

    try {
        // Enviar la solicitud de actualización usando la función `enviar`
        await enviar(`proveedor/${proveedorActualizado.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(proveedorActualizado)
        });

        // Redirigir de nuevo a la lista de proveedores
        window.location.href = 'proveedor.html';
    } catch (error) {
        console.error('Error al editar el proveedor:', error);
    }
});
