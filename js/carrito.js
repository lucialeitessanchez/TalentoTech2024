document.addEventListener("DOMContentLoaded", () => {
    const carritoItemsStorage = JSON.parse(localStorage.getItem('cart')) || [];
    const carritoTable = document.getElementById('carritoitems');
    const totalGeneral = document.getElementById('total');
    const finalizarCompraBtn = document.getElementById('finalizarCompra');
    let total = 0;

    // Agrupar productos por ID
    const groupedItems = carritoItemsStorage.reduce((acc, item) => {
        if (!acc[item.id]) {
            acc[item.id] = { ...item, cantidad: 0 }; // Inicializa con cantidad 0
        }
        acc[item.id].cantidad += 1; // Incrementa la cantidad del producto
        return acc;
    }, {});

    // Recorrer los productos agrupados
    Object.values(groupedItems).forEach(item => {
        const row = document.createElement('tr');

        // Nombre del producto
        const nombreCelda = document.createElement('td');
        nombreCelda.textContent = item.title;
        row.appendChild(nombreCelda);

        // Precio unitario del producto
        const precioCelda = document.createElement('td');
        precioCelda.textContent = `US$${item.price}`;
        row.appendChild(precioCelda);

        // Cantidad
        const cantidadCelda = document.createElement('td');
        cantidadCelda.textContent = item.cantidad;
        row.appendChild(cantidadCelda);

        // Subtotal (cantidad * precio unitario)
        const subtotal = item.price * item.cantidad;
        const subtotalCelda = document.createElement('td');
        subtotalCelda.textContent = `US$${subtotal}`;
        row.appendChild(subtotalCelda);

        // Agregar fila a la tabla
        carritoTable.appendChild(row);

        // Sumar al total general
        total += subtotal;
    });

    // Mostrar total general
    totalGeneral.textContent = `US$${total}`;


    //boton limpiar carrito
    document.getElementById('limpiarCarrito').addEventListener('click',()=>
    {
        localStorage.removeItem('cart'); //me elimina completamente el carrito
        window.location.href='productos.html';
    }
    );

    // Función para verificar si el carrito está vacío
    function verificarCarrito() {
        const carritoItemsStorage = JSON.parse(localStorage.getItem('cart')) || [];
        if (carritoItemsStorage.length === 0) {
            finalizarCompraBtn.disabled = true; // Deshabilitar botón si el carrito está vacío
        } else {
            finalizarCompraBtn.disabled = false; // Habilitar botón si el carrito tiene elementos
        }
    }

    // Verificar el carrito al cargar la página
    verificarCarrito();

    //Simulacion de la compra y las acciones del boton
    finalizarCompraBtn.addEventListener('click', () => {
        // Desactivar el botón mientras carga
        finalizarCompraBtn.disabled = true;

        // Mostrar el spinner y el texto "Pagando..."
        const spinner = finalizarCompraBtn.querySelector('.spinner-grow');
        const statusText = finalizarCompraBtn.querySelector('span[role="status"]');
        spinner.style.display = "inline-block"; //el spinner visible
        statusText.textContent = "Pagando...";

        // Simular tiempo de carga (4 segundos)
        setTimeout(() => {
            // Ocultar el spinner y habilitar el botón
            spinner.style.display = "none";
            finalizarCompraBtn.disabled = false;
            statusText.textContent = "Finalizado";
        }, 4000);

          // Mostrar alerta de operación exitosa con SweetAlert2
          Swal.fire({
            title: "Compra exitosa",
            text: "Gracias por su compra",
            icon: "success",
            confirmButtonText: "Listo"
            
        });
        //limpiar carrito
        localStorage.removeItem('cart');
        
    });
    
    function volverIndex(){
    //Redirigir al inicio despues de 4 segundos 
    setTimeout(()=>{
        window.location.href = 'index.html';
    },8000);
    }
});
