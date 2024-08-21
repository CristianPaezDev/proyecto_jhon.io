import solicitud, { enviar } from "./ajax.js";

document.addEventListener('DOMContentLoaded', async () => {
    // Obtener el ID del cliente a editar
    const empleadoId = localStorage.getItem('editEmpleadoId');
    console.log('ID del cliente:', empleadoId);

    if (empleadoId) {
        try {
            // Obtener los datos del cliente desde el servidor
            const cliente = await solicitud(`empleado/${empleadoId}`);

            if (cliente) {
                // Llenar los campos del formulario con los datos del cliente
                document.getElementById('nombre').value = cliente.nombre || cliente.Nombre;
                document.getElementById('apellido').value = cliente.apellido || cliente.Apellido;
                document.getElementById('telefono').value = cliente.telefono || cliente.Telefono;
                document.getElementById('direccion').value = cliente.direccion || cliente.Direccion;
                document.getElementById('contrasena').value = cliente.contrasena || cliente.Contrasena;
                // document.getElementById('confirmarcontrasena').value = cliente.confirmarcontrasena || cliente.Confirmarcontrasena;
                document.getElementById('user_id').value = cliente.id;
            }
        } catch (error) {
            console.error('Error al obtener los datos del cliente:', error);
        }
    }
});

// Manejar la edición del cliente
document.getElementById('form-validation').addEventListener('submit', async (event) => {
    event.preventDefault();

    const empleadoActualizado = {
        id: document.getElementById('user_id').value,
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        telefono: document.getElementById('telefono').value,
        direccion: document.getElementById('direccion').value,
        contrasena: document.getElementById('contrasena').value,
        // confirmarcontrasena: document.getElementById('confirmarcontrasena').value,
    };

    try {
        // Enviar la solicitud de actualización usando la función `enviar`
        await enviar(`empleado/${empleadoActualizado.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(empleadoActualizado)
        });

        // Redirigir de nuevo a la lista de clientes
            window.location.href = 'empleado.html';
    } catch (error) {
        console.error('Error al editar el cliente:', error);
    }
});
