const is_empty = (event, element) => { 
    if (element.value === "") {
      element.classList.remove("bien");
      element.classList.add("error");
    } else {
      element.classList.remove("error");
      element.classList.add("bien");
    }
  }
  
  export default is_empty;