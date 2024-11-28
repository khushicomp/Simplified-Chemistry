// Scene Setup
const container = document.getElementById('3d-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Lighting
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

// Initialize the GLTFLoader
const loader = new THREE.GLTFLoader();

// Variables to store models
let beaker, burette;

// Load Models (Beaker and Burette)
loader.load('beaker[1].glb', function (gltf) {
    beaker = gltf.scene;
    beaker.position.set(0, -1, 0);  // Adjust position as necessary
    beaker.scale.set(0.3, 0.3, 0.3);  // Scale down the model
    scene.add(beaker);
}, undefined, function (error) {
    console.error('An error happened while loading the beaker model:', error);
});

loader.load('burette.glb', function (gltf) {
    burette = gltf.scene;
    burette.position.set(1, 1, 0);  // Adjust position as necessary
    burette.scale.set(0.3, 0.3, 0.3);  // Scale down the model
    scene.add(burette);
}, undefined, function (error) {
    console.error('An error happened while loading the burette model:', error);
});

// Camera Position
camera.position.z = 5;

// Render Loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Solution Logic
let solutionVolume = 0;
const resultElement = document.getElementById('result');

document.getElementById('add-solution').addEventListener('click', function () {
    const inputAmount = parseFloat(document.getElementById('solution-amount').value);

    if (inputAmount + solutionVolume > 50) {
        resultElement.textContent = "You can't add more than 50mL of solution.";
        return;
    }

    solutionVolume += inputAmount;
    resultElement.textContent = `Added ${inputAmount}mL of EDTA solution. Total: ${solutionVolume}mL.`;

    if (solutionVolume >= 25) {
        resultElement.textContent += ' Hardness level determined: Water is moderately hard.';
    }
});