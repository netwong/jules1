// Get canvas and context
const canvas = document.getElementById('atomCanvas');
const ctx = canvas.getContext('2d');

// Carbon atom properties
const nucleusColor = 'black';
const nucleusRadius = 20;

const shellColors = ['gray', 'lightgray'];
const shellRadii = [80, 150]; // Inner and outer shell radii

const electronColor = 'blue';
const electronRadius = 5;

const electronsInShells = [2, 4]; // 2 electrons in the first shell, 4 in the second

// Initial angles and angular speeds for electrons
// We need 2 + 4 = 6 electrons in total
let electronAngles = [0, Math.PI, 0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
let electronSpeeds = [0.02, 0.02, 0.01, 0.01, 0.01, 0.01]; // Slower for outer shell

// Function to draw the nucleus
function drawNucleus(context) {
  context.beginPath();
  context.arc(canvas.width / 2, canvas.height / 2, nucleusRadius, 0, 2 * Math.PI);
  context.fillStyle = nucleusColor;
  context.fill();
}

// Function to draw a shell (orbit)
function drawShell(context, radius) {
  context.beginPath();
  context.arc(canvas.width / 2, canvas.height / 2, radius, 0, 2 * Math.PI);
  context.strokeStyle = shellColors[shellRadii.indexOf(radius)]; // Use different colors for shells
  context.stroke();
}

// Function to draw an electron
function drawElectron(context, centerX, centerY, orbitRadius, angle, electronRadius) {
  const x = centerX + orbitRadius * Math.cos(angle);
  const y = centerY + orbitRadius * Math.sin(angle);
  context.beginPath();
  context.arc(x, y, electronRadius, 0, 2 * Math.PI);
  context.fillStyle = electronColor;
  context.fill();
}

// Animation loop
function animate() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  // Draw nucleus
  drawNucleus(ctx);

  // Draw shells
  drawShell(ctx, shellRadii[0]); // Inner shell
  drawShell(ctx, shellRadii[1]); // Outer shell

  // Update and draw electrons
  let electronIndex = 0;
  // First shell electrons
  for (let i = 0; i < electronsInShells[0]; i++) {
    electronAngles[electronIndex] += electronSpeeds[electronIndex];
    drawElectron(ctx, centerX, centerY, shellRadii[0], electronAngles[electronIndex], electronRadius);
    electronIndex++;
  }

  // Second shell electrons
  for (let i = 0; i < electronsInShells[1]; i++) {
    electronAngles[electronIndex] += electronSpeeds[electronIndex];
    drawElectron(ctx, centerX, centerY, shellRadii[1], electronAngles[electronIndex], electronRadius);
    electronIndex++;
  }

  // Request next frame
  requestAnimationFrame(animate);
}

// Start the animation
animate();
