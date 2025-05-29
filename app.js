// app.js - Three.js scene setup

// 1. Scene Setup
const scene = new THREE.Scene();

// 2. Camera Setup
const camera = new THREE.PerspectiveCamera(
  75, // Field of view
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1, // Near clipping plane
  1000 // Far clipping plane
);
camera.position.z = 30; // Adjusted for a potentially larger atom model view

// 3. Renderer Setup
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: document.getElementById('atomCanvas') // Use existing canvas
});
renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement); // Not needed if using existing canvas

// 4. Lighting
// Ambient light
const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); // Brighter white light
directionalLight.position.set(5, 5, 5); // Position the light
scene.add(directionalLight);

// 5. Basic Render Call (for testing)
function render() {
  renderer.render(scene, camera);
}
render(); // Call it once to see the initial setup

// 6. Handle Window Resize
window.addEventListener('resize', () => {
  // Update camera aspect ratio
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  // Update renderer size
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Re-render the scene after resize
  // render(); // Note: render() is not called here in the original, animate loop handles it
});

// Add OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
// controls.autoRotate = true; // Optional: if you want auto-rotation

// 7. Define Atom Properties
const nucleusRadius = 0.5;
const electronRadius = 0.1;
const shell1Radius = 1.5;
const shell2Radius = 2.5;

// 8. Create Nucleus
const nucleusGeometry = new THREE.SphereGeometry(nucleusRadius, 32, 32);
const nucleusMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 }); // Red
const nucleusMesh = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
scene.add(nucleusMesh);

// 9. Create Electrons & Store Orbit Properties
const electrons = [];
const electronGeometry = new THREE.SphereGeometry(electronRadius, 16, 16);
const electronMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff }); // Blue

// Shell 1 (2 electrons)
const shell1Planes = ['xy', 'xz'];
for (let i = 0; i < 2; i++) {
  const electron = new THREE.Mesh(electronGeometry, electronMaterial);
  electron.orbitRadius = shell1Radius;
  electron.angle = Math.random() * 2 * Math.PI;
  electron.speed = 0.01 + Math.random() * 0.01;
  electron.orbitPlane = shell1Planes[i]; // Assign a plane
  scene.add(electron);
  electrons.push(electron);
}

// Shell 2 (4 electrons)
const shell2Planes = ['xy', 'xy', 'xz', 'yz']; // Two in XY, one XZ, one YZ
for (let i = 0; i < 4; i++) {
  const electron = new THREE.Mesh(electronGeometry, electronMaterial);
  electron.orbitRadius = shell2Radius;
  electron.angle = Math.random() * 2 * Math.PI;
  electron.speed = 0.005 + Math.random() * 0.005; // Slower for outer shell
  electron.orbitPlane = shell2Planes[i]; // Assign a plane
  scene.add(electron);
  electrons.push(electron);
}

// 10. Animation Loop
function animate() {
  controls.update(); // Update controls in the animation loop for damping

  // Update electron positions
  electrons.forEach(electron => {
    electron.angle += electron.speed;

    switch (electron.orbitPlane) {
      case 'xy':
        electron.position.set(
          Math.cos(electron.angle) * electron.orbitRadius,
          Math.sin(electron.angle) * electron.orbitRadius,
          0
        );
        break;
      case 'xz':
        electron.position.set(
          Math.cos(electron.angle) * electron.orbitRadius,
          0,
          Math.sin(electron.angle) * electron.orbitRadius
        );
        break;
      case 'yz':
        electron.position.set(
          0,
          Math.cos(electron.angle) * electron.orbitRadius,
          Math.sin(electron.angle) * electron.orbitRadius
        );
        break;
    }
  });

  // Render the scene
  renderer.render(scene, camera);
}

// Start the animation loop (replacing the single render() call)
// render(); // Remove this
renderer.setAnimationLoop(animate);

// The rest of the commented out 2D canvas code follows...

// Carbon atom properties
// const nucleusColor = 'black';
// const nucleusRadius = 20;

// const shellColors = ['gray', 'lightgray'];
// const shellRadii = [80, 150]; // Inner and outer shell radii

// const electronColor = 'blue';
// const electronRadius = 5;

// const electronsInShells = [2, 4]; // 2 electrons in the first shell, 4 in the second

// Initial angles and angular speeds for electrons
// We need 2 + 4 = 6 electrons in total
// let electronAngles = [0, Math.PI, 0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
// let electronSpeeds = [0.02, 0.02, 0.01, 0.01, 0.01, 0.01]; // Slower for outer shell

// Function to draw the nucleus
// function drawNucleus(context) {
//   context.beginPath();
//   context.arc(canvas.width / 2, canvas.height / 2, nucleusRadius, 0, 2 * Math.PI);
//   context.fillStyle = nucleusColor;
//   context.fill();
// }

// Function to draw a shell (orbit)
// function drawShell(context, radius) {
//   context.beginPath();
//   context.arc(canvas.width / 2, canvas.height / 2, radius, 0, 2 * Math.PI);
//   context.strokeStyle = shellColors[shellRadii.indexOf(radius)]; // Use different colors for shells
//   context.stroke();
// }

// Function to draw an electron
// function drawElectron(context, centerX, centerY, orbitRadius, angle, electronRadius) {
//   const x = centerX + orbitRadius * Math.cos(angle);
//   const y = centerY + orbitRadius * Math.sin(angle);
//   context.beginPath();
//   context.arc(x, y, electronRadius, 0, 2 * Math.PI);
//   context.fillStyle = electronColor;
//   context.fill();
// }

// Animation loop
// function animate() {
//   // Clear the canvas
//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   const centerX = canvas.width / 2;
//   const centerY = canvas.height / 2;

//   // Draw nucleus
//   drawNucleus(ctx);

//   // Draw shells
//   drawShell(ctx, shellRadii[0]); // Inner shell
//   drawShell(ctx, shellRadii[1]); // Outer shell

//   // Update and draw electrons
//   let electronIndex = 0;
//   // First shell electrons
//   for (let i = 0; i < electronsInShells[0]; i++) {
//     electronAngles[electronIndex] += electronSpeeds[electronIndex];
//     drawElectron(ctx, centerX, centerY, shellRadii[0], electronAngles[electronIndex], electronRadius);
//     electronIndex++;
//   }

//   // Second shell electrons
//   for (let i = 0; i < electronsInShells[1]; i++) {
//     electronAngles[electronIndex] += electronSpeeds[electronIndex];
//     drawElectron(ctx, centerX, centerY, shellRadii[1], electronAngles[electronIndex], electronRadius);
//     electronIndex++;
//   }

//   // Request next frame
//   requestAnimationFrame(animate);
// }

// Start the animation
// animate();
