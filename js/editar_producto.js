import solicitud, { enviar } from "./ajax.js";

document.addEventListener('DOMContentLoaded', async () => {
    // Obtener el ID del cliente a editar
    const productoId = localStorage.getItem('editProductoId');
    console.log('ID del cliente:', productoId);

    if (productoId) {
        try {
            const tipo = document.querySelector("#tipo");
            const proveedor = document.querySelector("#proveedor");
            const fragmento = document.createDocumentFragment();
            // Obtener los datos del cliente desde el servidor
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

            const cliente = await solicitud(`producto/${productoId}`);

            if (cliente) {
                console.log(cliente.tipo)
                console.log(cliente.proveedor)
                // Llenar los campos del formulario con los datos del cliente
                document.getElementById('nombre').value = cliente.nombre || cliente.Nombre;
                document.getElementById('tipo').value = cliente.tipo || cliente.Tipo;
                document.getElementById('cantidad').value = cliente.cantidad || cliente.Cantidad;
                document.getElementById('marca').value = cliente.marca || cliente.Marca;
                document.getElementById('precio').value = cliente.precio || cliente.Precio;
                document.getElementById('fech_venc').value = cliente.fech_venc || cliente.Fech_venc;
                document.getElementById('descripcion').value = cliente.descripcion || cliente.Descripcion;
                document.getElementById('proveedor').value = cliente.proveedor || cliente.Proveedor;
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

    const productoActualizado = {
        id: document.getElementById('user_id').value,
        nombre: document.getElementById('nombre').value,
        tipo: document.getElementById('tipo').value,
        cantidad: document.getElementById('cantidad').value,
        marca: document.getElementById('marca').value,
        precio: document.getElementById('precio').value,
        fech_venc: document.getElementById('fech_venc').value,
        descripcion: document.getElementById('descripcion').value,
        proveedor: document.getElementById('proveedor').value
    };

    try {
        // Enviar la solicitud de actualización usando la función `enviar`
        await enviar(`producto/${productoActualizado.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productoActualizado)
        });

        // Redirigir de nuevo a la lista de clientes
            window.location.href = 'producto.html';
    } catch (error) {
        console.error('Error al editar el cliente:', error);
    }
});
