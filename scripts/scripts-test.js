import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { GLTFLoader } from 'GLTFLoader';
import { RectAreaLightHelper } from 'RectAreaLightHelper'
import { RectAreaLightUniformsLib } from 'RectAreaLightUniformsLib';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 50; 

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); 
document.body.appendChild(renderer.domElement);



const loader = new GLTFLoader();


const modelPath = '/assets/models/q.glb'; 
loader.load(modelPath, (gltf) => {
  const model = gltf.scene;
  

  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  model.position.x -= center.x;
  model.position.y -= center.y;
  model.position.z -= center.z;
  model.rotateX(Math.PI / 2);
  scene.add(model);
}, undefined, (error) => {
  console.error('Ошибка при загрузке модели:', error);
});


const ambientLight = new THREE.AmbientLight(0xffffff); 
scene.add(ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);


function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}


animate();
