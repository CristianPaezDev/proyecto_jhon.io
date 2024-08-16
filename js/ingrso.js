import solicitud from "./ajax.js";

document.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Por favor, complete ambos campos.");
    return;
  }

  try {
    // Solicita la lista de clientes desde el servidor
    const clientes = await solicitud("cliente");

    // Si hay un error en la solicitud, muestra una alerta
    if (clientes.error) {
      alert("Error al obtener la lista de clientes: " + clientes.error);
      return;
    }

    // Busca un cliente con el nombre de usuario y contraseña proporcionados
    const clienteEncontrado = clientes.find(
      (cliente) =>
        (cliente.Nombre === username || cliente.nombre === username) &&
        (cliente.Contrasena === password || cliente.contrasena === password)
    );

    // Si el cliente fue encontrado, redirige a la página de cliente
    if (clienteEncontrado) {
      window.location.href = "cliente.html";
    } else {
      alert("Usuario o contraseña incorrectos.");
    }
  } catch (error) {
    console.error("Error al intentar iniciar sesión:", error);
    alert("Hubo un problema con el inicio de sesión. Intente nuevamente.");
  }
});
