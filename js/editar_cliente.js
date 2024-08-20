document.addEventListener('DOMContentLoaded', () => {
    // Obtener el ID del cliente a editar
    const clientId = localStorage.getItem('editClientId');

    if (clientId) {
        // Aquí podrías hacer una solicitud a tu backend para obtener los datos del cliente
        // pero por ahora lo haremos estático simulando una base de datos

        const clientes = JSON.parse(localStorage.getItem('clientes')) || [];

        // Buscar el cliente por ID
        const cliente = clientes.find(cliente => cliente.id === clientId);

        if (cliente) {
            // Llenar los campos del formulario con los datos del cliente
            document.getElementById('nombre').value = cliente.nombre;
            document.getElementById('apellido').value = cliente.apellido;
            document.getElementById('telefono').value = cliente.telefono;
            document.getElementById('direccion').value = cliente.direccion;
            document.getElementById('user_id').value = cliente.id;
        }
    }
});

// Manejar la edición del cliente
document.getElementById('form-validation').addEventListener('submit', (event) => {
    event.preventDefault();

    const clienteActualizado = {
        id: document.getElementById('user_id').value,
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        telefono: document.getElementById('telefono').value,
        direccion: document.getElementById('direccion').value
    };

    // Simular actualización en el localStorage (en una aplicación real, harías una solicitud PUT o PATCH al servidor)
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const clienteIndex = clientes.findIndex(cliente => cliente.id === clienteActualizado.id);
    if (clienteIndex !== -1) {
        clientes[clienteIndex] = clienteActualizado;
        localStorage.setItem('clientes', JSON.stringify(clientes));
    }

    // Redirigir de nuevo a la lista de clientes
    window.location.href = 'cliente.html';
});
