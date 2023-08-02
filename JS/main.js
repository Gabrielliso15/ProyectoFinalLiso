// ----------------------------------------------------------------------------
// Control de sonido para el video banner principal
// ----------------------------------------------------------------------------



// Control del video banner

const videoPlayer = document.getElementById("videoPlayer");

const volumeRange = document.getElementById("volumeRange");

// Función para ajustar el volumen del video
function adjustVolume() {
    videoPlayer.volume = volumeRange.value;
}

// Establecer el volumen inicial al 20% 
videoPlayer.addEventListener("loadedmetadata", function () {
    videoPlayer.volume = 0.2;
    volumeRange.value = 0;
});

function toggleMute() {
    var volumeIcon = document.getElementById("volumeIcon");
    if (volumeIcon.classList.contains("fa-volume-mute")) {
        volumeIcon.classList.remove("fa-volume-mute");
        volumeIcon.classList.add("fa-volume-up");
        volumeRange.value = 0.2; // Establecer valor de la barra de volumen al 0.2
        videoPlayer.muted = false; // Desmutea el video
    } else {
        volumeIcon.classList.remove("fa-volume-up");
        volumeIcon.classList.add("fa-volume-mute");
        volumeRange.value = 0; // Establecer valor de la barra de volumen a 0
        videoPlayer.muted = true; // Mutea el video
    }

}

volumeRange.addEventListener("input", adjustVolume);


// ----------------------------------------------------------------------------
// js para la barra de busqueda y filtro
// ----------------------------------------------------------------------------



// Agregar EventListener para el input de búsqueda
buscarInput.addEventListener('input', () => {
    const valorBusqueda = buscarInput.value.toLowerCase(); 
    // fetch para obtener los datos del archivo "productos.json"
    fetchProductos()
        .then(productos => {
            // Filtrar productos 
            const resultadosFiltrados = productos.filter(producto =>
                producto.nombre.toLowerCase().includes(valorBusqueda)
            );

            // Mostrar / ocultar el div de resultados según si hay resultados de búsqueda o no
            if (valorBusqueda && resultadosFiltrados.length > 0) {
                // Si HAY resultados mostrar el div y construir el contenido
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
        fetch('./DATA/productos.json')
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
            window.location.href = './vistas/Producto' + producto.id + '.html';
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
// Construir la Seccion de productos destacados
// ----------------------------------------------------------------------------



// Cargando array de productos destacados : 

const ProductosDestacados =[
    {
        nombre: "Remera Nike Los Angeles Lakers - Unisex -.",
        precio: 16999,
        id: 3,
        image:"../img/camiseta1C.jpg",
    },
    {
        nombre: "Short Nike Miami Heat Swingman - Hombre -.",
        precio: 15399,
        id: 4,
        image:"../img/short1.jpg"
    },
    {
        nombre: "Campera Nike Thermaflex Milwaukee Bucks - Hombre -. ",
        precio: 32700,
        id: 5,
        image:"../img/campera1.jpg"
    },
    {
        nombre: "Buzo Adidas ONE BASKETBALL - Hombre -. ",
        precio: 49999,
        id: 6,
        image:"../img/buzo1.jpg"
    }

];



const contenedorProductos = document.querySelector('#contenedor-productos');


function CargarProductos() {

    ProductosDestacados.forEach(producto => {
        // Construccion de los productos destacados 
        const div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = ` 
                <div class="proddest">
                    <a style="color: black;" href="../vistas/Producto${producto.id }.html">
                        <div class="card" style="width: 19rem; margin-left: 10px; margin-right: 10px">
                            <img src="${producto.image}" class="card-img-top" alt="${producto.nombre}">
                            <div class="card-body">
                                <p style="margin: 0; font-weight: 550;"> 
                                    $${producto.precio}
                                </p>
                                <p class="card-text">${producto.nombre}</p>
                            </div>
                        </div>
                    </a>
                </div>
            `;
        contenedorProductos.append(div);
    })
}

CargarProductos();






