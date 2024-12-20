
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
      <img src="${product.thumbnail}" alt="${product.title}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary">US$${product.price}</h6>
        <p class="card-text">${product.description}</p>
        <button class="btn btn-outline-secondary">Agregar al carrito</button>
      </div>
      </div>
      `;
      
      //evento del boton agregar al carrito
      const botonAgregar = cardDiv.querySelector("button");

      botonAgregar.addEventListener("click",()=>{
          agregarAlCarrito(product);
      });
      cardContainer.appendChild(cardDiv);
    });
}) //el error puede ir solo el mensaje
.catch((error)=>console.log("Esto es en caso que  no funcione la api",error));
}
    function agregarAlCarrito(product){
    //mete el producto que selecciono en un localStorage
      let cart = JSON.parse(localStorage.getItem("cart")) || []; //si no encuentra el cart que me devuelva un element vacio
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      Swal.fire({
        title: `${product.title} ha sido agregado al carrito`,
        text: "",
        icon: "success",
        
    });
    }

    //carga inicial productos
    fetchProductos();

});
