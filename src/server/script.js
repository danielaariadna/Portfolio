const projectModals = ['port', 'modal5', 'htb', 'hyh','vet','art','eda','redWan']; // IDs de los modales en orden
let currentProjectIndex = 0; // Índice del modal actual
const entryModals = ['ing', 'pila', 'cyber', 'rally','cacic','mip'];
let currentEntryIndex=0;

//Función que me aplica el estilo a la opciòn seleccionada y quita la previamente seleccionada
function seleccionar(link) {
    var opciones = document.querySelectorAll('#links  a');
    opciones[0].className = "";
    opciones[1].className = "";
    opciones[2].className = "";
    opciones[3].className = "";
    opciones[4].className = "";
    link.className = "seleccionado";

    //Hacemos desaparecer el menu una vez que se ha seleccionado una opcion
    //en modo responsive
    var x = document.getElementById("nav");
    x.className = "";
}

//función que muestra el menu responsive
function responsiveMenu() {
    var x = document.getElementById("nav");
    if (x.className === "") {
        x.className = "responsive";
    } else {
        x.className = "";
    }
}


/* CARRUSEL DE IMAGENES EN LOGROS PERSONALES */


//CARRUSEL PROYECTOS
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
    mostrarPrimeraImagen(modalId); // Mostrar la primera imagen del carrusel al abrir el modal
    currentProjectIndex = projectModals.indexOf(modalId);
    currentEntryIndex=entryModals.indexOf(modalId);
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
    resetearCarrusel(modalId); // Reiniciar el carrusel al cerrar el modal
}
function cambiarProyect(n) {
    closeModal(projectModals[currentProjectIndex]);
    currentProjectIndex = (currentProjectIndex + n + projectModals.length) % projectModals.length;
    openModal(projectModals[currentProjectIndex]);
}
function cambiarEntrada(n) {
    closeModal(entryModals[currentEntryIndex]);
    currentEntryIndex = (currentEntryIndex + n + entryModals.length) % entryModals.length;
    openModal(entryModals[currentEntryIndex]);
}
function mostrarPrimeraImagen(modalId) {
    let carousel = document.querySelector(`#${modalId} .carousel-inner`);
    let primerImagen = carousel.querySelector('img');
    if (primerImagen) {
        primerImagen.classList.add('active'); // Mostrar la primera imagen
    }
}

function resetearCarrusel(modalId) {
    let carousel = document.querySelector(`#${modalId} .carousel-inner`);
    let imagenes = carousel.querySelectorAll('img');
    imagenes.forEach(img => img.classList.remove('active')); // Ocultar todas las imágenes
}

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