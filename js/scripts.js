
document.addEventListener("DOMContentLoaded", ()=>{
var cardContainer=document.getElementById('card');

function fetchProductos(){
fetch("https://dummyjson.com/products?limit=20")
.then((response)=>response.json()) //me traigo todo lo que tiene esa api ( datos y encabezados)
.then((data)=>{
      var productos = data.products; //guardo todo lo que me devuelve el json que se llame products

    //limpio el contenedor, lo dejo sin nada
    cardContainer.innerHTML = "";

    productos.forEach(product => {
      var cardDiv=document.createElement('div');

      cardDiv.className='col-md-3 d-flex';
      //agrega una card por cada json obtenido en la peticion
      cardDiv.innerHTML=`
      <div class="card mt-4">
      <img src="${product.imagenUrl}" alt="${product.nombre}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${product.nombre}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary">US$${product.precio}</h6>
        <p class="card-text">${product.descripcion}</p>
        <p class="card-text">Stock: ${product.cantidadEnStock}</p> 
        <button class="btn btn-outline-secondary" data-product-id="${product.id}">Agregar al carrito</button> </div>
      </div>
      </div>
      `;
      
      //evento del boton agregar al carrito
      const botonAgregar = cardDiv.querySelector("button");

      botonAgregar.addEventListener("click",()=>{
                // Al agregar al carrito, probablemente querrás el ID de tu producto, no el objeto completo de dummyjson
                // Si tu carrito en localStorage va a almacenar IDs y cantidades, no el objeto completo
                // O si quieres el objeto completo, asegúrate de que tenga todos los campos relevantes de tu entidad Producto
                agregarAlCarrito(product); // Pasas el objeto 'Producto' de tu backend
            });
            cardContainer.appendChild(cardDiv);
        });
    })
    .catch((error)=>console.log("Error al obtener productos de tu backend:",error));
}

// Consideración para agregarAlCarrito:
// Si tu carrito solo necesita el ID del producto y la cantidad,
// podrías modificar agregarAlCarrito para que reciba el ID y la cantidad en lugar del objeto completo.
// O si el carrito almacena el objeto Producto, asegúrate de que tu `agregarAlCarrito` y el carrito de `localStorage`
// estén preparados para manejar los campos `id`, `nombre`, `precio`, `cantidadEnStock`, `descripcion`, `imagenUrl` de tu `Producto.java`.
// Actualmente, estás guardando el objeto 'product' tal cual viene de la API. Si cambia la estructura, tu carrito
// podría tener datos inconsistentes si no lo actualizas.

function agregarAlCarrito(product){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Aquí puedes decidir si guardar el objeto Producto completo de tu backend
    // o solo su ID y una cantidad predeterminada (e.g., 1)
    
    // Opción 1: Guardar el objeto completo (con la estructura de tu Producto.java)
    cart.push(product); 
    
    // Opción 2: Guardar solo el ID y una cantidad (más común para carritos)
    // let itemEnCarrito = {
    //     id: product.id,
    //     nombre: product.nombre,
    //     precio: product.precio,
    //     cantidad: 1 // O la cantidad que el usuario elija
    // };
    // cart.push(itemEnCarrito);

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.nombre} ha sido agregado al carrito`); // <--- CAMBIO: title a nombre
}

    //carga inicial productos
    fetchProductos();

});
