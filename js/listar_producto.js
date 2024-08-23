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
        supplier_id: product.proveedor || product.Proveedor || "",
        description: product.descripcion || product.Descripcion || "",
    };
};

const listar = async () => {
    try {
        // Obtener datos de productos, proveedores y marcas
        const [data, proveedores, marcas] = await Promise.all([
            solicitud('producto'),
            solicitud('proveedor'),
            solicitud('marca')
        ]);

        if (data.error || proveedores.error || marcas.error) {
            throw new Error(data.error || proveedores.error || marcas.error);
        }

        if (!Array.isArray(data) || !Array.isArray(proveedores) || !Array.isArray(marcas)) {
            throw new Error('Formato de datos inesperado');
        }

        // Mapear ID de proveedores a sus nombres
        const proveedorMap = proveedores.reduce((map, proveedor) => {
            map[proveedor.id] = proveedor.nombre;
            return map;
        }, {});

        // Mapear ID de marcas a sus nombres
        const marcaMap = marcas.reduce((map, marca) => {
            map[marca.id] = marca.nombre;
            return map;
        }, {});

        // Normalizar y procesar los datos de productos
        const products = data.map(normalizeProductData);

        products.forEach((element) => {
            console.log(element);
            const clone = document.importNode($template, true);
            clone.querySelector(".id").textContent = element.id;
            clone.querySelector(".nombre").textContent = element.name;
            clone.querySelector(".tipo").textContent = element.type;
            clone.querySelector(".cantidad").textContent = element.quantity;
            clone.querySelector(".marca").textContent = marcaMap[element.brand] || "Desconocido";
            clone.querySelector(".precio").textContent = element.price;
            clone.querySelector(".fech_venc").textContent = element.expiration_date;
            clone.querySelector(".descripcion").textContent = element.description;
            
            // Reemplazar el ID del proveedor con el nombre
            clone.querySelector(".proveedor").textContent = proveedorMap[element.supplier_id] || "Desconocido";

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

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('edit')) {
        const row = event.target.closest('tr');
        const id = row.querySelector('.id').textContent.trim();

        localStorage.setItem('editProductoId', id);
        window.location.href = 'editarProducto.html'; 
    }
});
