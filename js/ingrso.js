import solicitud from "./ajax.js"; 

const usuario = document.querySelector("#usuario");
const contrasena = document.querySelector("#contrasena");


document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault(); 


    if (!usuario || !contrasena) {
        alert("Por favor, complete ambos campos.");
        return;
    }

    try {
        // Obtener la lista de clientes desde el servidor.
        const clientes = await solicitud('cliente');

        // Buscar el cliente con el nombre y contraseña ingresados.
        const clienteEncontrado = clientes.find(cliente => 
            (cliente.nombre === usuario) && (cliente.contrasena === contrasena)
        );

        if (clienteEncontrado) {
            // Si el cliente es encontrado, redirigir a la página del cliente.
            window.location.href = "cliente.html";
        } else {
            // Si no se encuentra, mostrar un mensaje de error.
            alert("Usuario o contraseña incorrectos.");
        }
    } catch (error) {
        console.error("Error al intentar iniciar sesión:", error);
        alert("Hubo un problema con el inicio de sesión. Intente nuevamente.");
    }
});