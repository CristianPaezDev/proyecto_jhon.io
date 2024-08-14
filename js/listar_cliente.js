import solicitud from "./ajax.js"

const $template = document.getElementById("users").content;
const fragmento = document.createDocumentFragment();
const table = document.querySelector("content-table");



const listar = async () => {
    const data = await solicitud('cliente');

    data.forEach((element) => {
        $template.querySelector("tr").id = `user_${element.id}`;
        $template.querySelector(".first_name").textContent = element.first_name;
        $template.querySelector(".last_name").textContent = element.last_name;
        $template.querySelector(".phone").textContent = element.phone;
        $template.querySelector(".address").textContent = element.address;
        $template.querySelector(".type_id").textContent = element.type_id;

        $template.querySelector(".edit").setAttribute("data-id", element.id);
        $template.querySelector(".delete").setAttribute("data-id", element.id);

        let clone = document.importNode($template, true);
        fragmento.appendChild(clone);
    });
    table.querySelector('tbody').appendChild(fragmento)
}
addEventListener("DOMContentLoaded", (event) => {
    documentos();
    listar();
    if (!politicas.checked) {
      button.setAttribute("disabled", "");
    }
  });