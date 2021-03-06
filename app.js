const THREE = require('three');

function makeInstance(geometry, color, x) {
  const material = new THREE.MeshPhongMaterial({ color });

  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  cube.position.x = x;

  return cube;
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const cubes = [
  makeInstance(geometry, 0x44aa88, 0),
  makeInstance(geometry, 0x8844aa, -2),
  makeInstance(geometry, 0xaa8844, 2)
];

//create a blue LineBasicMaterial
const points = [];
points.push(new THREE.Vector3(-10, 0, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(10, 0, 0));

const LineGeo = new THREE.BufferGeometry().setFromPoints(points);

const LineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });

const Line = new THREE.Line(LineGeo, LineMaterial);
scene.add(Line);

const color = 0xffffff;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

const animate = function () {
  requestAnimationFrame(animate);

  cubes.forEach((cube, ndx) => {
    cube.rotation.x += 0.05;
    cube.rotation.y += 0.05;
  });
  renderer.render(scene, camera);
};

animate();
