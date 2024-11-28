// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 3 / 2, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const container = document.getElementById('3d-container');
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Lighting
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

// Load Models (Beaker)
let loader;

// Ensure GLTFLoader is defined
if (THREE.GLTFLoader) {
    loader = new THREE.GLTFLoader();
} else {
    console.error("GLTFLoader is not loaded correctly!");
}

if (loader) {
    loader.load(
        'beaker[1].glb',
        function (gltf) {
            const beaker = gltf.scene;
            beaker.position.set(0, -1, 0);
            scene.add(beaker);
        },
        undefined,
        function (error) {
            console.error("Error loading beaker model:", error);
        }
    );
}

// Camera Position
camera.position.z = 5;

// Render Loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();