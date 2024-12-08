// Scene Setup
const container = document.getElementById('3d-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Set background color of the scene
renderer.setClearColor(0xe0f7fa); // Light blue background

// Lighting
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

// Initialize the GLTFLoader
const loader = new THREE.GLTFLoader();

// Variables to store models
let beaker1, beaker2, beaker3, burette;

// Load Models (Beakers and Burette)
loader.load('beaker[1].glb', function (gltf) {
    beaker1 = gltf.scene;
    beaker1.position.set(-5, -1, 0); // Move Beaker1 to the left
    beaker1.scale.set(0.3, 0.5, 0.5);

    // Make Beaker1 Transparent
    beaker1.traverse(function (child) {
        if (child.isMesh) {
            child.material.transparent = true;
            child.material.opacity = 0.5; // Adjust opacity
        }
    });

    scene.add(beaker1);
}, undefined, function (error) {
    console.error('Error loading Beaker1:', error);
});

loader.load('beaker[1].glb', function (gltf) {
    beaker2 = gltf.scene;
    beaker2.position.set(-3.5, -1, 0); // Position Beaker2 next to Beaker1
    beaker2.scale.set(0.4, 0.5, 0.5);

    // Make Beaker2 Transparent
    beaker2.traverse(function (child) {
        if (child.isMesh) {
            child.material.transparent = true;
            child.material.opacity = 0.5; // Adjust opacity
        }
    });

    scene.add(beaker2);
}, undefined, function (error) {
    console.error('Error loading Beaker2:', error);
});

loader.load('beaker[1].glb', function (gltf) {
    beaker3 = gltf.scene;
    beaker3.position.set(-2, -1, 0); // Position Beaker3 next to Beaker2
    beaker3.scale.set(0.5, 0.5, 0.5);

    // Make Beaker3 Transparent
    beaker3.traverse(function (child) {
        if (child.isMesh) {
            child.material.transparent = true;
            child.material.opacity = 0.5; // Adjust opacity
        }
    });

    scene.add(beaker3);
}, undefined, function (error) {
    console.error('Error loading Beaker3:', error);
});

loader.load('burette.glb', function (gltf) {
    burette = gltf.scene;
    burette.position.set(0, -0.5, -0.5); // Adjust position as necessary
    burette.scale.set(0.5, 0.6, 0.5);

    // Make Burette Transparent
    burette.traverse(function (child) {
        if (child.isMesh) {
            child.material.transparent = true;
            child.material.opacity = 0.5; // Adjust opacity
        }
    });

    scene.add(burette);
}, undefined, function (error) {
    console.error('Error loading Burette:', error);
});

// Camera Position
camera.position.z = 5;

// Render Loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Solution Logic Variables
let solutionVolume = 0;
let ebtVolume = 0;
let znso4Volume = 0;
let bufferVolume = 0;

// EDTA Logic
document.getElementById('add-solution').addEventListener('click', function () {
    const inputAmount = parseFloat(document.getElementById('solution-amount').value);
    if (isNaN(inputAmount) || inputAmount <= 0) {
        document.getElementById('result').textContent = "Please enter a valid amount for EDTA.";
        return;
    }
    if (inputAmount + solutionVolume > 50) {
        document.getElementById('result').textContent = "You can't add more than 50mL of EDTA.";
        return;
    }
    solutionVolume += inputAmount;
    document.getElementById('result').textContent = `Added ${inputAmount}mL of EDTA solution. Total: ${solutionVolume}mL.`;
});

// EBT Logic
document.getElementById('add-ebt').addEventListener('click', function () {
    const inputAmount = parseFloat(document.getElementById('ebt-amount').value);
    if (isNaN(inputAmount) || inputAmount <= 0) {
        document.getElementById('ebt-result').textContent = "Please enter a valid amount for EBT.";
        return;
    }
    if (inputAmount + ebtVolume > 20) {
        document.getElementById('ebt-result').textContent = "You can't add more than 20mL of EBT.";
        return;
    }
    ebtVolume += inputAmount;
    document.getElementById('ebt-result').textContent = `Added ${inputAmount}mL of EBT solution. Total: ${ebtVolume}mL.`;
});

// ZnSO₄ Logic
document.getElementById('add-znso4').addEventListener('click', function () {
    const inputAmount = parseFloat(document.getElementById('znso4-amount').value);
    if (isNaN(inputAmount) || inputAmount <= 0) {
        document.getElementById('znso4-result').textContent = "Please enter a valid amount for ZnSO₄.";
        return;
    }
    if (inputAmount + znso4Volume > 30) {
        document.getElementById('znso4-result').textContent = "You can't add more than 30mL of ZnSO₄.";
        return;
    }
    znso4Volume += inputAmount;
    document.getElementById('znso4-result').textContent = `Added ${inputAmount}mL of ZnSO₄ solution. Total: ${znso4Volume}mL.`;
});

// Buffer Logic
document.getElementById('add-buffer').addEventListener('click', function () {
    const inputAmount = parseFloat(document.getElementById('buffer-amount').value);
    if (isNaN(inputAmount) || inputAmount <= 0) {
        document.getElementById('buffer-result').textContent = "Please enter a valid amount for Buffer.";
        return;
    }
    if (inputAmount + bufferVolume > 40) {
        document.getElementById('buffer-result').textContent = "You can't add more than 40mL of Buffer.";
        return;
    }
    bufferVolume += inputAmount;
    document.getElementById('buffer-result').textContent = `Added ${inputAmount}mL of Buffer solution. Total: ${bufferVolume}mL.`;
});
// Get references to the buttons and modal elements
const viewProcedureBtn = document.getElementById('view-procedure-btn');
const procedureModal = document.getElementById('procedure-modal');
const closeModalBtn = document.getElementById('close-modal-btn');

// Show the procedure modal when the button is clicked
viewProcedureBtn.addEventListener('click', () => {
    procedureModal.style.display = 'block'; // Show the modal
});

// Hide the procedure modal when the close button is clicked
closeModalBtn.addEventListener('click', () => {
    procedureModal.style.display = 'none'; // Hide the modal
});

// Optionally close modal if the user clicks outside the modal
window.addEventListener('click', (event) => {
    if (event.target === procedureModal) {
        procedureModal.style.display = 'none';
    }
});
