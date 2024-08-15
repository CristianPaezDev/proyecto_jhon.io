const is_letters = (event, element) => {
  const letras = /^[a-zA-ZÀ-ÿ\s]*$/;

  if (!letras.test(event.key)) {
    event.preventDefault();
  }

  // Evaluar el valor del campo después de la entrada
  if (element.value === "") {
    element.classList.remove("bien");
    element.classList.add("error");
  } else if (letras.test(element.value)) {
    element.classList.remove("error");
    element.classList.add("bien");
  } else {
    element.classList.remove("bien");
    element.classList.add("error");
  }
}

export default is_letters;
