// Scene Setup
const container = document.getElementById('3d-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Enable alpha for transparency
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setClearColor(0x000000, 0); // Black color with 0 opacity (fully transparent)
container.appendChild(renderer.domElement);

// Lighting
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

// Initialize the GLTFLoader
const loader = new THREE.GLTFLoader();

// Variables to store models
let beaker1, beaker2, beaker3, burette;

// Load Models (Beaker and Burette)
loader.load('beaker[1].glb', function (gltf) {
    beaker1 = gltf.scene;
    beaker1.position.set(-4.5, -1, 0); // Move Beaker1 to the left
    beaker1.scale.set(0.5, 0.5, 0.5); // Scale down the model
    scene.add(beaker1);
}, undefined, function (error) {
    console.error('An error happened while loading the first beaker model:', error);
});

loader.load('beaker[1].glb', function (gltf) {
    beaker2 = gltf.scene;
    beaker2.position.set(-3, -1, 0); // Move Beaker2 a bit further right
    beaker2.scale.set(0.5, 0.5, 0.5); // Scale down the model
    scene.add(beaker2);
}, undefined, function (error) {
    console.error('An error happened while loading the second beaker model:', error);
});

loader.load('beaker[1].glb', function (gltf) {
    beaker3 = gltf.scene;
    beaker3.position.set(-1.5, -1, 0); // Position Beaker3 to the right of Beaker2
    beaker3.scale.set(0.5, 0.5, 0.5); // Scale down the model
    scene.add(beaker3);
}, undefined, function (error) {
    console.error('An error happened while loading the third beaker model:', error);
});

loader.load('burette.glb', function (gltf) {
    burette = gltf.scene;
    burette.position.set(1.5, 0, 0); // Adjust position as necessary
    burette.scale.set(0.6, 0.6, 0.6); // Scale down the model
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
