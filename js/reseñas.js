document.addEventListener("DOMContentLoaded", () => {
    const reseñasTable = document.getElementById('reseniasTb');

    function fetchProductos() {
        fetch("https://dummyjson.com/products?limit=20")
            .then((response) => response.json()) // Trae todos los datos de la API
            .then((data) => {
                var productos = data.products; // Guardo todo lo que tiene la respuesta en productos

                productos.forEach(product => {
                    const reseñas = product.reviews; // Accedo a las reseñas del producto

                    // Iterar sobre las reseñas
                    reseñas.forEach(review => {
                        const row = document.createElement('tr'); // Crear una fila para cada reseña

                        //Nombre del producto y su imagen
                        const nombreImagenCelda = document.createElement('td');
                        
                        // Crea un contenedor para el nombre e imagen
                        const contenedor = document.createElement('div');
                        contenedor.style.display = 'flex';
                        contenedor.style.alignItems = 'center';
                        
                    
                        const nombrePCelda = document.createElement('span');
                        nombrePCelda.textContent = product.title;
                        contenedor.appendChild(nombrePCelda);

                        // Crea y agrega la imagen del producto
                        const imagen = document.createElement('img');
                        imagen.src = product.thumbnail;
                        imagen.alt = `Imagen de ${product.title}`;
                        imagen.style.width = '50px';
                        imagen.style.height = 'auto';
                        imagen.style.marginLeft = '10px';
                        contenedor.appendChild(imagen);

                        // Agregar el contenedor (nombre + imagen) a la celda
                        nombreImagenCelda.appendChild(contenedor);
                        row.appendChild(nombreImagenCelda);

                        //Comentario de la reseña
                        const comentarioCelda = document.createElement('td');
                        comentarioCelda.textContent = review.comment; // Comentario de la reseña
                        row.appendChild(comentarioCelda);

                        //ver de ponerlo con el coment con estrellas
                        /*const calificacionCelda = document.createElement('td');
                        calificacionCelda.textContent = review.rating; // Calificación
                        row.appendChild(calificacionCelda);*/

                        //Fecha de la reseña
                        const fechaCelda = document.createElement('td');
                        const fecha = new Date(review.date); // Convertir la fecha a formato legible
                        fechaCelda.textContent = fecha.toLocaleDateString();
                        row.appendChild(fechaCelda);

                        //Nombre del revisor
                        const nombreRevisorCelda = document.createElement('td');
                        nombreRevisorCelda.textContent = review.reviewerName; // Nombre del revisor
                        row.appendChild(nombreRevisorCelda);

                        //Correo del revisor
                        const mailRevisorCelda = document.createElement('td');
                        mailRevisorCelda.textContent = review.reviewerEmail; 
                        row.appendChild(mailRevisorCelda);

                        reseñasTable.appendChild(row);
                    });
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Llamar a la función para cargar los productos y reseñas al cargar la página
    fetchProductos();
});
