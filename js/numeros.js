const numeros = (event) => {
  const input = event.target;
  // Permitir solo números
  if (event.keyCode < 48 || event.keyCode > 57) {
      event.preventDefault();
  }
  
  // Limitar a 10 dígitos
  if (input.value.length >= 10 && event.keyCode !== 8 && event.keyCode !== 46) {
      event.preventDefault();
  }
}

export default numeros;
