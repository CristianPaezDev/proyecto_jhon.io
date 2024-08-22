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

                // Marcar las marcas seleccionadas
                if (marcas && Array.isArray(marcas)) {
                    marcas.forEach(marca => {
                        const checkbox = document.getElementById(`marca-${marca.id}`);
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
