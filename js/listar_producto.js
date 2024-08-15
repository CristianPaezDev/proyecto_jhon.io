import solicitud from "./ajax.js";

const $template = document.getElementById("products").content;
const fragmento = document.createDocumentFragment();
const tableBody = document.querySelector("#tbody");

const normalizeProductData = (product) => {
    return {
        id: product.id,
        name: product.nombre || product.Nombre || "",
        type: product.tipo || product.Tipo || "",
        quantity: product.cantidad || product.Cantidad || "",
        brand: product.marca || product.Marca || "",
        price: product.precio || product.Precio || "",
        expiration_date: product.fech_venc || product.Fech_venc || "",
        supplier: product.proveedor || product.Proveedor || "",
        description: product.descripcion || product.Descripcion || "",
    };
};

const listar = async () => {
    try {
        const data = await solicitud('producto');

        if (data.error) {
            throw new Error(data.error);
        }

        if (!Array.isArray(data)) {
            throw new Error('Formato de datos inesperado');
        }

        const products = data.map(normalizeProductData);

        products.forEach((element) => {
            console.log(element);
            const clone = document.importNode($template, true);
            clone.querySelector(".id").textContent = element.id;
            clone.querySelector(".nombre").textContent = element.name;
            clone.querySelector(".tipo").textContent = element.type;
            clone.querySelector(".cantidad").textContent = element.quantity;
            clone.querySelector(".marca").textContent = element.brand;
            clone.querySelector(".precio").textContent = element.price;
            clone.querySelector(".fech_venc").textContent = element.expiration_date;
            clone.querySelector(".descripcion").textContent = element.description;
            clone.querySelector(".proveedor").textContent = element.supplier;

            clone.querySelector(".edit").setAttribute("data-id", element.id);
            clone.querySelector(".delete").setAttribute("data-id", element.id);

            fragmento.appendChild(clone);
        });

        tableBody.appendChild(fragmento);
    } catch (error) {
        console.error('Error al listar los productos:', error.message || error);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    listar();
});
