// global constants
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const gui = new dat.GUI();
const guiValues = new makeGuiValues();

// create elements
const camControls = new THREE.OrbitControls( camera );
const ambientLight = new THREE.AmbientLight( 0x404040 );
const light = new THREE.DirectionalLight(0xffffff, 0.75);
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);

// config
gui.close();
gui.add(guiValues, 'addHelpers');
gui.add(guiValues, 'orbitCam');
gui.addColor(guiValues, 'color');
camControls.enableDamping = true;
camControls.enabled = false;
camera.position.z = 8;
light.position.x = 16;
light.position.y = 16;
light.position.z = 16;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// add lighting
scene.add(light);
scene.add(ambientLight);

// add meshes renderer
scene.add(cube);

// animation
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  setFromGui();
  camControls.update();
	renderer.render(scene, camera);
}

function setFromGui() {
  const color = new THREE.Color(guiValues.color[0] / 255, guiValues.color[1] / 255, guiValues.color[2] / 255);
  if (!cube.material.color.equals(color)) {
    cube.material.color.setRGB(guiValues.color[0] / 255, guiValues.color[1] / 255, guiValues.color[2] / 255);
  }
  if (camControls.enabled !== guiValues.orbitCam) {
    camControls.enabled = guiValues.orbitCam;
  }
}

animate();

// add renderer to dom
document.body.appendChild(renderer.domElement);
window.onresize = onResize;

// gui functions 
function makeGuiValues() {
  this.color = [ 0, 255, 0 ];
  this.orbitCam = true;
  this.addHelpers = addHelpers;
};

function addHelpers() {
  const lightHelper = new THREE.DirectionalLightHelper(light, 4);
  scene.add(lightHelper);
}

// other functions
function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}