import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { GLTFLoader } from 'GLTFLoader';
import { RectAreaLightHelper } from 'RectAreaLightHelper'
import { RectAreaLightUniformsLib } from 'RectAreaLightUniformsLib';
import { TextGeometry } from 'TextGeometry';
import { FontLoader } from 'FontLoader'
const scene = new THREE.Scene();
const canvasWidth = 650;
const canvasHeight = 200;
const camera = new THREE.PerspectiveCamera(75, canvasWidth / canvasHeight, 0.1, 1000);
camera.position.z = 10;
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(canvasWidth, canvasHeight);	
renderer.setClearColor(0x000000, 0);
const container = document.querySelector('#canvas-container')
container.id = 'canvas-container';
container.appendChild(renderer.domElement);
const loader = new GLTFLoader();
let isRotating = false;
let rotationAxis = 'y';
let rotationSpeed = Math.PI / 30;
let rotationAngle = 0;
let targetModelIndex = 0;
const modelInstances = [];
let lastKeyPressTime = 0;
const keyPressThreshold = 100;
let isExplosionGifPlaying = false;
let isExplosionInProgress = false;
const modelPath = '/assets/models/q.glb';
loader.load(modelPath, (gltf) => {
  const model = gltf.scene;
  const scale = 0.5;

  const numInstances = 5;
  const spacing = 5;
  for (let i = 0; i < numInstances; i++) {
    const modelInstance = model.clone();
    modelInstance.scale.set(scale, scale, scale);
    modelInstance.rotateX(Math.PI / 2);
    const offset = i * spacing;
    modelInstance.position.x = offset - ((numInstances - 1) * spacing) / 2;

    scene.add(modelInstance);
    modelInstances.push(modelInstance);
  }
	document.addEventListener('keydown', handleKeydown);
	function handleKeydown(event) {
    if (isExplosionGifPlaying) return;

    if (event.key === 'q') {
      const currentTime = Date.now();
      if (currentTime - lastKeyPressTime < keyPressThreshold) {
				isExplosionGifPlaying = true;
				isExplosionInProgress = true;
				playSecretSound();
				setTimeout(() => showExplosionGif(), 1000);
        return;
      }
      lastKeyPressTime = currentTime;

      if (!isRotating) {
        isRotating = true;
        targetModelIndex = Math.floor(Math.random() * numInstances);
        const axisChoice = Math.random() < 0.5 ? 'x' : 'y';
        rotationAxis = axisChoice;
      }
			playLogoSound()
    }
  }
  function animate() {
    requestAnimationFrame(animate);
    if (isRotating && !isExplosionGifPlaying) {
      const targetModel = modelInstances[targetModelIndex];
      if (rotationAxis === 'y') {
        targetModel.rotation.y += rotationSpeed;
      } else {
        targetModel.rotation.x += rotationSpeed;
      }
      rotationAngle += rotationSpeed;

      if (rotationAngle >= 2 * Math.PI) {
        isRotating = false;
        rotationAngle = 0;
      }
    }

    renderer.render(scene, camera);
  }
  animate();
}, undefined, (error) => {
  console.error('Ошибка при загрузке модели:', error);
});
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);


function showExplosionGif() {
  isExplosionGifPlaying = true;
	isExplosionInProgress = true;
  setTimeout(() => playSecretSound2(), 1500);
	const explosionGif = document.createElement('img');
  explosionGif.src = 'https://dangettosir.github.io/W.O.R.D.S/assets/media/explosion.gif';
	explosionGif.style.position = 'fixed';
  explosionGif.style.top = '0';
  explosionGif.style.left = '0';
  explosionGif.style.width = '100%';
  explosionGif.style.height = '100%';
  explosionGif.style.zIndex = '9999';
  document.body.appendChild(explosionGif);
  document.body.style.pointerEvents = 'none'


  setTimeout(() => {
    document.body.removeChild(explosionGif);
    document.body.style.pointerEvents = 'auto';
    isExplosionGifPlaying = false;
		isExplosionInProgress = false;
  }, 6000);

  setTimeout(() => {
    playSecretSound3();
    fadeToWhite();
  }, 4500);
}

function fadeToWhite() {
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(255, 255, 255, 0)';
  overlay.style.zIndex = '9999';
  document.body.appendChild(overlay);

  let opacity = 0;
  const fadeInterval = setInterval(() => {
    opacity += 0.05;
    overlay.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;

    if (opacity >= 1) {
      clearInterval(fadeInterval);
      setTimeout(() => {
        document.body.removeChild(overlay);
      }, 4000);
    }
  }, 50);
}

function playLogoSound() {
	const correctSoundFile = "https://dangettosir.github.io/W.O.R.D.S/assets/media/logosounds.mp3";
	const audio = new Audio(correctSoundFile);
	audio.play();
}
function playSecretSound() {
	const correctSoundFile = "https://dangettosir.github.io/W.O.R.D.S/assets/media/pre-secret.mp3";
	const audio = new Audio(correctSoundFile);
	audio.play();
}
function playSecretSound2() {
	const correctSoundFile = "https://dangettosir.github.io/W.O.R.D.S/assets/media/secret.mp3";
	const audio = new Audio(correctSoundFile);
	audio.play();
}
function playSecretSound3() {
	const correctSoundFile = "https://dangettosir.github.io/W.O.R.D.S/assets/media/after-secret.mp3";
	const audio = new Audio(correctSoundFile);
	audio.play();
}
