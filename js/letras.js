export function letras(event, elemento) {
    let regex = /^[a-zA-Zá\s]+$/;   

    if (elemento.value === ""){
        elemento.classList.add("error")
    }else{
        if (!regex.test(event.key)) {
            event.preventDefault()
            elemento.classList.remove("bien")
            elemento.classList.add("error")
        }
        else{
            elemento.classList.remove("error")
            elemento.classList.add("bien")
        }
    }
}
