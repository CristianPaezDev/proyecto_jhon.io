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
    const empleados = await solicitud("empleado");
  
    if (!empleados || empleados.error) {
      alert("Error al obtener la lista de empleados. Por favor, intente nuevamente.");
      return;
    }
  
    const empleadoEncontrado = empleados.find(
      (empleado) =>
        (empleado.Nombre === username || empleado.nombre === username) &&
        (empleado.Contrasena === password || empleado.contrasena === password)
    );
  
    if (empleadoEncontrado) {
      window.localStorage.setItem("isEmpleado", "true");
      window.location.href = "venta.html";
    } else {
      alert("Usuario o contraseña incorrectos.");
    }
  } catch (error) {
    console.error("Error al intentar iniciar sesión:", error);
    alert("Hubo un problema con el inicio de sesión. Intente nuevamente.");
  }
  
});
