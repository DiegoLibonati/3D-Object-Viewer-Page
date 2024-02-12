import * as dat from "lil-gui";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { MeshGui, TextGui } from "../entities/entities";

export const createGui = (
  gui: dat.GUI,
  prop: THREE.Mesh<TextGeometry, any, THREE.Object3DEventMap> ,
  objects: MeshGui[] | TextGui[],
  folderName: string
) => {
  const folderMesh = gui.addFolder(folderName);

  for (const property of objects) {
    if (property.key === "color") {
      folderMesh
        .addColor(
          property.name ? prop[property.name as keyof typeof prop] : prop,
          property.key
        )
        .name(property.description);
      continue;
    }

    const p = property as MeshGui

    folderMesh
      .add(
        p.name ? prop[p.name as keyof typeof prop] : prop,
        p.key
      )
      .min(p?.min)
      .max(p?.max)
      .step(p?.step)
      .name(p.description);

    
  }

  return folderMesh;
};
