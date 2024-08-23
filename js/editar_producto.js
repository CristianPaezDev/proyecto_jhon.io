import solicitud, { enviar } from "./ajax.js";

// Función para cargar las marcas asociadas a un proveedor
const cargarMarcasPorProveedor = async (proveedorId) => {
    try {
        // Obtener los datos del proveedor para encontrar las marcas asociadas
        const proveedor = await solicitud(`proveedor/${proveedorId}`);
        const marcasData = await solicitud(`marca`);

        // Limpiar el select de marcas
        const marcaSelect = document.getElementById('marca');
        marcaSelect.innerHTML = '<option value="">Seleccione...</option>';


        // Llenar el select de marcas con las marcas asociadas al proveedor
        proveedor.marcas.forEach(marcaId => {
            const marca = marcasData.find(m => m.id === marcaId);
            if (marca) {
                let option = document.createElement("option");
                option.value = marca.nombre;
                option.textContent = marca.nombre;
                marcaSelect.appendChild(option);
            }
        });
    } catch (error) {
        console.error('Error al cargar las marcas por proveedor:', error);
    }
};


document.addEventListener('DOMContentLoaded', async () => {
    // Obtener el ID del producto a editar
    const productoId = localStorage.getItem('editProductoId');
    console.log('ID del producto:', productoId);

    if (productoId) {
        try {
            const tipo = document.querySelector("#tipo");
            const proveedor = document.querySelector("#proveedor");
            const marca = document.querySelector("#marca");
            
            // Obtener los tipos, proveedores y marcas del servidor
            const tiposData = await solicitud("tipo");
            const proveedoresData = await solicitud("proveedor");
            // const marcasData = await solicitud("marca");
            
            // Llenar los campos tipo
            tipo.innerHTML = '<option value="">Seleccione...</option>';
            tiposData.forEach(element => {
                let option = document.createElement("option");
                option.value = element.nombre;
                option.textContent = element.nombre;
                tipo.appendChild(option);
            });

            // Llenar los campos proveedor
            proveedor.innerHTML = '<option value="">Seleccione...</option>';
            proveedoresData.forEach(element => {
                let option = document.createElement("option");
                option.value = element.id;
                option.textContent = element.nombre;
                proveedor.appendChild(option);
            });

            // Obtener los datos del producto desde el servidor
            const producto = await solicitud(`producto/${productoId}`);

            if (producto) {
                // Llenar los campos del formulario con los datos del producto
                document.getElementById('nombre').value = producto.nombre || '';
                document.getElementById('tipo').value = producto.tipo || '';
                document.getElementById('cantidad').value = producto.cantidad || '';
                document.getElementById('precio').value = producto.precio || '';
                document.getElementById('fech_venc').value = producto.fech_venc || '';
                document.getElementById('descripcion').value = producto.descripcion || '';
                document.getElementById('proveedor').value = producto.proveedor || '';
                document.getElementById('user_id').value = producto.id || '';
                setTimeout(() => {
                    document.getElementById('marca').value = producto.marca || '';      
                }, 100);
                

                // Cargar marcas asociadas al proveedor seleccionado
                await cargarMarcasPorProveedor(producto.proveedor);
            }

            // Manejar el cambio de proveedor para actualizar las marcas
            proveedor.addEventListener('change', async () => {
                const proveedorId = proveedor.value;
                await cargarMarcasPorProveedor(proveedorId);
            });

        } catch (error) {
            console.error('Error al obtener los datos del producto:', error);
        }
    }
});


// Manejar la edición del producto
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

    //toISOString() convierte un objeto Date a una cadena, La t separa la fecha de la hora en un array 
    const fet = new Date(fech_venc.value).toISOString().split('T')[0];
    const act = new Date().toISOString().split('T')[0];

    if (fet <= act) {
        alert("No puedes ingresar una fecha menor o igual a la de hoy");
        isFormValid = false;
    }


    try {
        // Enviar la solicitud de actualización usando la función `enviar`
        await enviar(`producto/${productoActualizado.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productoActualizado)
        });

        // Redirigir de nuevo a la lista de productos
        window.location.href = 'producto.html';
    } catch (error) {
        console.error('Error al editar el producto:', error);
    }
});
