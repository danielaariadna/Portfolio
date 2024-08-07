// Lista de IDs de los modales de proyectos en orden
const projectModals = ['port', 'redWan','eda', 'hyh', 'vet', 'art'];
let currentProjectIndex = 0; // Índice del modal actual de proyectos
var typed = new Typed('.typed', {
    strings: ['Daniela Ariadna Morales.'],
	stringsElement: '#cadenas-texto', // ID del elemento que contiene cadenas de texto a mostrar.
	typeSpeed: 75, // Velocidad en mlisegundos para poner una letra,
	startDelay: 600, // Tiempo de retraso en iniciar la animacion. Aplica tambien cuando termina y vuelve a iniciar,
	backSpeed: 50, // Velocidad en milisegundos para borrrar una letra,
	smartBackspace: true, // Eliminar solamente las palabras que sean nuevas en una cadena de texto.
	shuffle: false, // Alterar el orden en el que escribe las palabras.
	backDelay: 1500, // Tiempo de espera despues de que termina de escribir una palabra.
	loop: true, // Repetir el array de strings
	loopCount: false, // Cantidad de veces a repetir el array.  false = infinite
	showCursor: true, // Mostrar cursor palpitanto
	cursorChar: '|', // Caracter para el cursor
	contentType: 'html', // 'html' o 'null' para texto sin formato
  });
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
    // Inicializar Three.js
    const sceneContainer = document.getElementById('container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    function resize() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }

    window.addEventListener('resize', resize);
    resize(); // Ajusta el tamaño inicial

    sceneContainer.appendChild(renderer.domElement);

    // Ajustar el estilo del canvas
    const canvas = renderer.domElement;
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    // Color de fondo
    scene.background = new THREE.Color(0x000); // Color negro

    // Añadir partículas para representar las estrellas
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
        color: 0xFFFFFF,
        size: 0.1,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.8
    });

    const starsVertices = [];
    for (let i = 0; i < 3000; i++) {
        let x, y, z;
        x = (Math.random() - 0.5) * 100;
        y = (Math.random() - 0.5) * 100;
        z = (Math.random() - 0.5) * 100;
        starsVertices.push(x, y, z);
    }

    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Aumentar la intensidad de la luz puntual
    const pointLight = new THREE.PointLight(0xFFFFFF, 0.5); // Ajusta el valor según sea necesario
    scene.add(pointLight);

    // Posición de la luz puntual
    pointLight.position.set(0, 0, 0);

    camera.position.z = 60;

    const animate = function () {
        requestAnimationFrame(animate);

        // Movimiento de las estrellas
        stars.rotation.x += 0.0005;
        stars.rotation.y += 0.0005;

        renderer.render(scene, camera);
    };

    animate();

    // Inicializar el carrusel con la primera imagen activa al cargar el DOM
    let modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        mostrarPrimeraImagen(modal.id);
    });

    // Función para mostrar la primera imagen del carrusel
    function mostrarPrimeraImagen(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            const firstImage = modal.querySelector('.carousel-item:first-child');
            if (firstImage) {
                firstImage.classList.add('active');
            }
        }
    }
});

