
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

// Agregar evento de escucha para el input de búsqueda
buscarInput.addEventListener('input', () => {
    const valorBusqueda = buscarInput.value.toLowerCase(); // Obtener el valor del input y convertirlo a minúsculas

    // Realizar una solicitud fetch para obtener los datos del archivo "productos.json"
    fetch('./DATA/productos.json')
        .then(response => response.json())
        .then(productos => {
            // Filtrar productos que coincidan con el criterio de búsqueda
            const resultadosFiltrados = productos.filter(producto =>
                producto.nombre.toLowerCase().includes(valorBusqueda)
            );

            // Mostrar u ocultar el div de resultados según si hay resultados de búsqueda o no
            if (valorBusqueda && resultadosFiltrados.length > 0) {
                // Si hay resultados de búsqueda, mostrar el div y construir el contenido
                resultadosBusquedaDiv.style.display = 'block';
                mostrarResultadosBusqueda(resultadosFiltrados);
            } else {
                // Si no hay resultados de búsqueda, ocultar el div
                resultadosBusquedaDiv.style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error al cargar los datos del archivo "productos.json"', error);
        });
});

// Función para construir el contenido de los resultados de búsqueda
function mostrarResultadosBusqueda(resultados) {
    resultadosBusquedaDiv.innerHTML = ''; // Limpiar el contenido anterior

    // Recorrer los resultados y crear elementos para mostrarlos en el div de resultados
    resultados.forEach(producto => {
        const resultadoElemento = document.createElement('div');
        resultadoElemento.classList.add('resultado-item'); // Agregar una clase para dar estilo a cada resultado

        resultadoElemento.addEventListener('click', () => {
            // Redireccionar a la página de detalles del producto al hacer clic en el resultado
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
        // resultadoElemento.appendChild(nombreElemento);
        infoElemento.appendChild(nombreElemento);

        const precioElemento = document.createElement('span');
        precioElemento.classList.add('precio-elemento');
        precioElemento.textContent = '- $ ' + producto.precio.toFixed(2); // Formatear el precio con dos decimales
        // resultadoElemento.appendChild(precioElemento);
        infoElemento.appendChild(precioElemento);

        resultadoElemento.appendChild(infoElemento); // Agregar el contenedor de información al contenedor principal

        resultadosBusquedaDiv.appendChild(resultadoElemento);
    });

}

// ----------------------------------------------------------------------------
