fetch('https://dummyjson.com/products')
.then(response=>response.json()) //me traigo todo lo que tiene esa api ( datos y encabezados)
.then(data=>console.log(data))//tengo todos los datos (solo extrae los datos)