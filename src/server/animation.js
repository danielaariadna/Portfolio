document.addEventListener('DOMContentLoaded', function () {
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
});
