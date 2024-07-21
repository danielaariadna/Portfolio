// Lista de IDs de los modales de proyectos en orden
const projectModals = ['port', 'modal5', 'htb', 'hyh', 'vet', 'art', 'eda', 'redWan'];
let currentProjectIndex = 0; // Índice del modal actual de proyectos

// Lista de IDs de los modales de logros personales en orden
const entryModals = ['ing', 'pila', 'cyber', 'rally', 'cacic', 'mip'];
let currentEntryIndex = 0; // Índice del modal actual de logros personales

// Función que aplica el estilo a la opción seleccionada y elimina el estilo de la previamente seleccionada
function seleccionar(link) {
    var opciones = document.querySelectorAll('#links a');
    opciones.forEach(opcion => opcion.className = ""); // Limpiar la clase de todas las opciones
    link.className = "seleccionado"; // Aplicar la clase 'seleccionado' a la opción clickeada

    // Hacer desaparecer el menú una vez que se ha seleccionado una opción en modo responsive
    var x = document.getElementById("nav");
    x.className = "";
}

// Función que muestra el menú en modo responsive
function responsiveMenu() {
    var x = document.getElementById("nav");
    if (x.className === "") {
        x.className = "responsive"; // Cambiar la clase a 'responsive' para mostrar el menú
    } else {
        x.className = ""; // Restaurar la clase vacía para ocultar el menú
    }
}

// Función para abrir un modal de proyecto y mostrar la primera imagen del carrusel
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
    mostrarPrimeraImagen(modalId); // Mostrar la primera imagen del carrusel al abrir el modal
    currentProjectIndex = projectModals.indexOf(modalId);
    currentEntryIndex = entryModals.indexOf(modalId);
}

// Función para cerrar un modal de proyecto y resetear el carrusel
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
    resetearCarrusel(modalId); // Reiniciar el carrusel al cerrar el modal
}

// Función para cambiar al siguiente o anterior proyecto en el carrusel
function cambiarProyect(n) {
    closeModal(projectModals[currentProjectIndex]);
    currentProjectIndex = (currentProjectIndex + n + projectModals.length) % projectModals.length;
    openModal(projectModals[currentProjectIndex]);
}

// Función para cambiar al siguiente o anterior logro personal en el carrusel
function cambiarEntrada(n) {
    closeModal(entryModals[currentEntryIndex]);
    currentEntryIndex = (currentEntryIndex + n + entryModals.length) % entryModals.length;
    openModal(entryModals[currentEntryIndex]);
}

// Función para mostrar la primera imagen del carrusel de un modal
function mostrarPrimeraImagen(modalId) {
    let carousel = document.querySelector(`#${modalId} .carousel-inner`);
    let primerImagen = carousel.querySelector('img');
    if (primerImagen) {
        primerImagen.classList.add('active'); // Mostrar la primera imagen
    }
}

// Función para resetear el carrusel al cerrar un modal
function resetearCarrusel(modalId) {
    let carousel = document.querySelector(`#${modalId} .carousel-inner`);
    let imagenes = carousel.querySelectorAll('img');
    imagenes.forEach(img => img.classList.remove('active')); // Ocultar todas las imágenes
}

// Función para cambiar de imagen en el carrusel de un modal
function cambiarImagen(n, modalId) {
    let carousel = document.querySelector(`#${modalId} .carousel-inner`);
    let imagenes = carousel.querySelectorAll('img');
    let currentIndex = Array.from(imagenes).findIndex(img => img.classList.contains('active'));
    let newIndex = (currentIndex + n + imagenes.length) % imagenes.length; // Calcular el nuevo índice

    imagenes[currentIndex].classList.remove('active'); // Ocultar la imagen actual
    imagenes[newIndex].classList.add('active'); // Mostrar la nueva imagen
}

// Evento para cerrar el modal haciendo clic fuera del contenido
window.onclick = function(event) {
    var modals = document.getElementsByClassName('modal');
    for (var i = 0; i < modals.length; i++) {
        if (event.target == modals[i]) {
            modals[i].style.display = "none";
            closeModal(modals[i].id); // Llamar a closeModal para ocultar imágenes
        }
    }
}

// Inicializar el carrusel con la primera imagen activa al cargar el DOM
document.addEventListener('DOMContentLoaded', function () {
    let modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        mostrarPrimeraImagen(modal.id);
    });
});
