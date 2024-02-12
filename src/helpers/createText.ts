import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { Font } from "three/examples/jsm/loaders/FontLoader.js";

export const createText = (material: THREE.MeshStandardMaterial, text: string, font: Font):  THREE.Mesh<TextGeometry, any, THREE.Object3DEventMap> => {

  const textGeometry = new TextGeometry(text, {
    font: font,
    size: 0.5,
    height: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });

  textGeometry.center();

  return new THREE.Mesh(textGeometry, material);
};
