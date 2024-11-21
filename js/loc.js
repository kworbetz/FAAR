import * as THREE from "https://cdn.skypack.dev/three";
import * as LocAR from "./lib/main.js";

const camera = new THREE.PerspectiveCamera(
  80,
  window.innerWidth / window.innerHeight,
  0.001,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const locar = new LocAR.LocationBased(scene, camera);

window.addEventListener("resize", (e) => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

const cam = new LocAR.WebcamRenderer(renderer);

let firstLocation = true;

const deviceOrientationControls = new LocAR.DeviceOrientationControls(camera);

locar.on("gpsupdate", (pos, distMoved) => {
  if (firstLocation) {
    alert(
      `Got the initial location: longitude ${pos.coords.longitude}, latitude ${pos.coords.latitude}`
    );

    const model = new THREE.GLTFLoader();
    loader.load("assets/Kevyn_2.glb", (gltf) => {
      const model = gltf.scene;
      model.scale.set(1, 1, 1);
      locar.add(model, pos.coords.longitude, pos.coords.latitude);
    });

    console.log(
      `adding at ${pos.coords.longitude + model.lonDis},${
        pos.coords.latitude + model.latDis
      }`
    );
    locar.add(
      mesh,
      pos.coords.longitude + model.lonDis,
      pos.coords.latitude + model.latDis
    );
  }
  firstLocation = false;
});

locar.startGps();

renderer.setAnimationLoop(animate);

function animate() {
  cam.update();
  deviceOrientationControls.update();
  renderer.render(scene, camera);
}
