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
// Agregar items al carrito.html
// ----------------------------------------------------------------------------




const productosEnCarrito = JSON.parse(sessionStorage.getItem('carrito'));
console.log(productosEnCarrito);

const ContenedorCarritoVacio = document.getElementById('carrito-vacio');
const ContenedorCarritoProductos = document.getElementById('carrito-productos');
const ContenedorCarritoAcciones = document.getElementById('carrito-acciones');
const ContenedorCarritoComprado = document.getElementById('carrito-comprado');
const botonVaciar = document.querySelector('#btnlimpiar');
const Total = document.querySelector('#total');
const botonComprar = document.querySelector('#btnbuy');


let botonesEliminar = document.querySelectorAll('btn');
const BtnPagar = document.getElementById('btnbuy');
const BtnLimpiar = document.getElementById('btnlimpiar');

function CargarProductosEnCarrito(){

    ContenedorCarritoProductos.innerHTML = '';

    if (productosEnCarrito && productosEnCarrito.length > 0) {
        ContenedorCarritoVacio.classList.add("disabled");
        ContenedorCarritoProductos.classList.remove("disabled");
        ContenedorCarritoAcciones.classList.remove("disabled");
        ContenedorCarritoComprado.classList.add("disabled");
        BtnLimpiar.classList.remove("disabled");
        BtnPagar.classList.remove("disabled");
    
        productosEnCarrito.forEach(producto => {
    
            const div = document.createElement("div");
            div.classList.add("carrito-productos");
            div.innerHTML = `
                <div class="producto-item" style = "border: 1px solid black;">
                    <div class="producto-foto">
                        <img src="${producto.imagecart}" alt="${producto.nombre}">
                    </div>
                    <div class="producto-data">
                        <p>
                            ${producto.nombre}
                        </p>
                        <p>
                            TAMAÑO : ${producto.size}
                        </p>
                        <p>
                            CANTIDAD : ${producto.cantidad}
                        </p>
                    </div>
                    <div class="producto-precio">
                        <div style="display: flex;">
                            <p id="preciounitprod">$${producto.precio}</p>
                            <button type="button" class="btn" id="${producto.id}">
                                <img src="../img/x-lg.svg" alt="">
                            </button>
                        </div>
                    </div>
                </div>`;
    
                ContenedorCarritoProductos.append(div);
        });
    
    } else {
        ContenedorCarritoVacio.classList.remove("disabled");
        ContenedorCarritoProductos.classList.add("disabled");
        ContenedorCarritoAcciones.classList.add("disabled");
        ContenedorCarritoComprado.classList.add("disabled");
        BtnLimpiar.classList.add("disabled");
        BtnPagar.classList.add("disabled");
    }

    ActualizarBotonesEliminar();
    ActualizarTotal();
    ActualizarCantProductos();

}

CargarProductosEnCarrito();


function ActualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll('.btn'); 

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click",eliminarDelCarrito);
    });

}

function eliminarDelCarrito(e) {
    const idBoton = +e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    if (index !== -1) {

        if (productosEnCarrito[index].cantidad > 1) {
            // Si la cantidad del producto es mayor a 1 reducimos la cantidad en 1
            productosEnCarrito[index].cantidad--;
        }else {
            // Si la cantidad es igual a 1, eliminamos el producto completamente del carrito
            productosEnCarrito.splice(index,1);
        }
        sessionStorage.setItem('carrito', JSON.stringify(productosEnCarrito));

        CargarProductosEnCarrito();
    }
}

botonVaciar.addEventListener("click", vaciarCarrito); 

function vaciarCarrito(){

    productosEnCarrito.length = 0;
    sessionStorage.setItem('carrito', JSON.stringify(productosEnCarrito));
    CargarProductosEnCarrito();

}

function ActualizarTotal (){
    const total = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    Total.innerText = 'TOTAL : $' + total;
}

function ActualizarCantProductos() {
    const cantidadProductos = productosEnCarrito.reduce((total, producto) => total + producto.cantidad, 0);
    const cantproductosElemento = document.getElementById('cantproductos');
    cantproductosElemento.textContent = `Cantidad de productos: ${cantidadProductos}`;
}


botonComprar.addEventListener("click", ComprarCarrito); 

function ComprarCarrito(){

    productosEnCarrito.length = 0;
    sessionStorage.setItem('carrito', JSON.stringify(productosEnCarrito));
        ContenedorCarritoVacio.classList.add("disabled");
        ContenedorCarritoProductos.classList.add("disabled");
        ContenedorCarritoAcciones.classList.add("disabled");
        ContenedorCarritoComprado.classList.remove("disabled");
        BtnLimpiar.classList.add("disabled");
        BtnPagar.classList.add("disabled");

}

