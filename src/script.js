import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { createText } from "./helpers/createText";
import * as dat from "lil-gui";
import { generateIndex } from "./helpers/generateIndex";
import { objects } from "./constants/objects";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { createGui } from "./helpers/createGui";
import { objectsMaterialGui } from "./constants/objectsMaterialGui";
import { objectsMeshGui } from "./constants/objectsMeshGui";
import { objectsTextGui } from "./constants/objectsTextGui";

// Global Variables

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector(".webgl");

// Img Arrows
const rightKeyboard = document.getElementById("right");
const leftKeyboard = document.getElementById("left");

// Input File
const inputFile = document.getElementById("input-file");

// Modal
const modalContainer = document.querySelector(".alert_container");
const modalText = document.querySelector(".alert_container_wrapper h2");
const buttonModal = document.querySelector(".alert_container_button");

buttonModal.addEventListener("click", () => {
  modalContainer.style.display = "none";
});

// Model
const loaderGLTF = new GLTFLoader();

// Texture - CubeMap
const cubeTextureLoader = new THREE.CubeTextureLoader();

const enviromentMapTexture = cubeTextureLoader.load([
  "/textures/environmentMaps/1/px.png",
  "/textures/environmentMaps/1/nx.png",
  "/textures/environmentMaps/1/py.png",
  "/textures/environmentMaps/1/ny.png",
  "/textures/environmentMaps/1/pz.png",
  "/textures/environmentMaps/1/nz.png",
]);

// Scene
const scene = new THREE.Scene();
scene.background = enviromentMapTexture;

// Fonts
const fontLoader = new FontLoader();
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  let text = createText(material, objects[index].name, font);

  text.geometry.center();
  text.position.y = 2;

  scene.add(text);

  let textFolder = createGui(gui, text, objectsTextGui, "Text");

  // Events
  ["keydown", "touchstart"].forEach((event) => {
    document.addEventListener(event, (e) => {
      const idKey = e.target.id;
      const eventType = e.type;
      const key = e.key;
      const keysAllowed = ["ArrowRight", "ArrowLeft"];
      const idsAllowed = ["right", "left"];

      if (!keysAllowed.includes(key) && eventType === "keydown") return;
      if (!idsAllowed.includes(idKey) && eventType === "touchstart") return;

      geometry.dispose();
      text.geometry.dispose();
      folderMesh.destroy();
      textFolder.destroy();
      scene.remove(mesh, text);

      if (objects[index].model) {
        scene.remove(objects[index].model.scene);
      }

      if (key === "ArrowRight" || idKey === "right") {
        index = generateIndex(index, objects.length, true, false);
        rightKeyboard.style.opacity = 0.5;
        rightKeyboard.style.transform = "scale(0.8) rotate(180deg)";
      } else {
        index = generateIndex(index, objects.length, false, true);
        leftKeyboard.style.opacity = 0.5;
        leftKeyboard.style.transform = "scale(0.8)";
      }

      text = createText(material, objects[index].name, font);

      textFolder = createGui(gui, text, objectsTextGui, "Text");

      text.position.y = 2;

      if (objects[index].model) {
        const gltf = objects[index].model;
        scene.add(gltf.scene, text);

        gltf.scene.traverse((obj) => {
          if (obj) {
            obj.material = material;
            obj.material.metalness = 0.766;
            obj.material.roughness = 0.041;
            obj.material.color.set("#fff");
          }
        });

        folderMesh = createGui(gui, gltf.scene, objectsMeshGui, "Mesh");

        return;
      }

      mesh = new THREE.Mesh(
        new THREE[objects[index].name](...objects[index].params),
        material
      );

      folderMesh = createGui(gui, mesh, objectsMeshGui, "Mesh");

      scene.add(mesh, text);
    });
  });
});

["keyup", "touchend"].forEach((event) => {
  document.addEventListener(event, () => {
    rightKeyboard.style.opacity = 1;
    leftKeyboard.style.opacity = 1;
    rightKeyboard.style.transform = "scale(1) rotate(180deg)";
    leftKeyboard.style.transform = "scale(1)";
  });
});

inputFile.addEventListener(
  "change",
  (e) => {
    const file = window.URL.createObjectURL(new Blob([e.target.files[0]]));
    loaderGLTF.load(
      file,
      (gltf) => {
        objects.push({
          name: e.target.files[0].name.split(".")[0],
          model: gltf,
        });
        modalText.innerHTML = `Your model ${e.target.files[0].name} was added. Use the arrows of your keyboard to find your custom model.`;
        modalContainer.style.display = "flex";
      },
      undefined,
      () => {
        modalText.innerHTML = `Error to load this class of model`;
        modalContainer.style.display = "flex";
      }
    );
  },
  false
);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Light
const light = new THREE.AmbientLight("#fff", 0.5);
const pointLight = new THREE.PointLight("#fff", 0.5);
pointLight.position.set(2, 3, 4);
scene.add(pointLight);
scene.add(light);

// First Mesh

let index = 0;
const geometry = new THREE[objects[index].name](...objects[index].params);
const material = new THREE.MeshStandardMaterial({
  envMap: enviromentMapTexture,
  metalness: 0.766,
  roughness: 0.041,
  color: "#fff",
});
let mesh = new THREE.Mesh(geometry, material);

// Folder
const folderMaterial = createGui(gui, material, objectsMaterialGui, "Material");
let folderMesh = createGui(gui, mesh, objectsMeshGui, "Mesh");

scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  1,
  100
);
camera.position.z = 10;
scene.add(camera);

// Render
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.render(scene, camera);

// Animation
const clock = new THREE.Clock();

const tick = () => {
  //const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  //Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
