// BARRA DE BUSQUEDA :

buscarInput.addEventListener('input', () => {
    const valorBusqueda = buscarInput.value.toLowerCase();

    // fetch para obtener los datos del archivo "productos.json"
    fetchProductos()
        .then(productos => {
            // Filtrar productos 
            const resultadosFiltrados = productos.filter(producto =>
                producto.nombre.toLowerCase().includes(valorBusqueda)
            );

            // Mostrar u ocultar el div de resultados según resultados 
            if (valorBusqueda && resultadosFiltrados.length > 0) {
                // Si HAY resultados de búsqueda, mostrar el div y construir el contenido
                resultadosBusquedaDiv.style.display = 'block';
                mostrarResultadosBusqueda(resultadosFiltrados);
            } else {
                // Si NO HAY resultados de búsqueda, ocultar el div
                resultadosBusquedaDiv.style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error al cargar los datos del archivo "productos.json"', error);
        });
});



// Función para cargar los productos desde "productos.json" utilizando una promesa
function fetchProductos() {
    return new Promise((resolve, reject) => {
        fetch('../DATA/productos.json')
            .then(response => response.json())
            .then(productos => {
                resolve(productos); // Resuelve la promesa con los datos de los productos
            })
            .catch(error => {
                reject(error); // Rechaza la promesa en caso de error
            });
    });
}

// Función para construir el contenido de los resultados de búsqueda
function mostrarResultadosBusqueda(resultados) {
    resultadosBusquedaDiv.innerHTML = ''; // Limpiar el contenido anterior

    // Recorrer los resultados y crear elementos para mostrarlos en el div de resultados
    resultados.forEach(producto => {
        const resultadoElemento = document.createElement('div');
        resultadoElemento.classList.add('resultado-item'); // Agregar una clase para los estilos de cada resultado

        resultadoElemento.addEventListener('click', () => {
            // Redireccionar a la vista del producto al hacer clic en el resultado
            window.location.href = '../vistas/Producto' + producto.id + '.html';
        });


        // Crear el div para la foto del producto
        const fotoElemento = document.createElement('div');
        fotoElemento.classList.add('foto-elemento');
        fotoElemento.style.backgroundImage = `url(${producto.image})`; // Establecer la imagen como fondo del div

        resultadoElemento.appendChild(fotoElemento); // Agregar el div de la foto del producto al contenedor

        const infoElemento = document.createElement('div'); // Crear un contenedor para la información del producto
        infoElemento.classList.add('info-elemento');

        const nombreElemento = document.createElement('span');
        nombreElemento.textContent = producto.nombre;
        // resultadoElemento.appendChild(nombreElemento);
        infoElemento.appendChild(nombreElemento);

        const precioElemento = document.createElement('span');
        precioElemento.classList.add('precio-elemento');
        precioElemento.textContent = '- $ ' + producto.precio.toFixed(2); 
        infoElemento.appendChild(precioElemento);

        resultadoElemento.appendChild(infoElemento); // Agregar el contenedor de información al contenedor principal

        resultadosBusquedaDiv.appendChild(resultadoElemento);
    });

}


// ----------------------------------------------------------------------------
// Carrito
// ----------------------------------------------------------------------------


let botonesAgregar = document.querySelectorAll(".buybuttonprod");

let productosEnCarrito = [];

// Declarar una variable global para almacenar los datos de productos
let productosData;

// Función para cargar los productos desde "productos.json" utilizando una promesa
async function fetchProductos() {
    try {
        const response = await fetch('../DATA/productos.json');
        const productos = await response.json();

        // Almacena los datos de productos en la variable global
        productosData = productos;

        // Agregar EventListener a los botones
        botonesAgregar.forEach((boton) => {
            boton.addEventListener("click", () => agregarAlCarrito(boton.dataset.id));
        });

        return productos; // Resuelve la promesa con los datos de los productos
    } catch (error) {
        console.error('Error al cargar los datos del archivo "productos.json"', error);
    }
}


// Funcion que actualiza el icono del carrito 
function actualizarIconoCarrito() {
    const iconoCarrito = document.querySelector('.favbutton img');
    if (productosEnCarrito.length > 0) {
        iconoCarrito.src = '../img/bag-check-fill.svg';
    } else {
        iconoCarrito.src = '../img/bag.svg';
    }
}

// Ejecutar la función fetchProductos una vez que la página ha cargado
document.addEventListener('DOMContentLoaded', () => {
    // Obtener el carrito almacenado en SessionStorage
    const carritoGuardado = sessionStorage.getItem('carrito');
    if (carritoGuardado) {
        productosEnCarrito = JSON.parse(carritoGuardado);
        actualizarIconoCarrito();
    }

    fetchProductos();
});


function agregarAlCarrito(id) {

    const idBoton = parseInt(id);// cada boton de agregar al carrito contiene el id del producto
    const productoAgregado = productosData.find(producto => producto.id === idBoton);

    // check si hay dos productos igules en el carrito para aumentar la cantidad del mismo
    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    sessionStorage.setItem('carrito', JSON.stringify(productosEnCarrito));

    actualizarIconoCarrito();
    // console.log check
    console.log(productosEnCarrito);

}
