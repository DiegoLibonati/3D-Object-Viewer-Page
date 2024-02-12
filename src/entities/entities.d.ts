import { GLTF } from "three/addons/loaders/GLTFLoader.js";

// Types

export type TextGui = {
  name: string;
  key: string;
  description: string;
};

export type MeshGui = {
  name: string;
  key: string;
  min: number;
  max: number;
  step: number;
  description: string;
};

export type MeshGuiColor = {
  description: string;
  name: string;
  key: string;
};

export type MaterialGui = {
  name: string;
  key: string;
  min: number;
  max: number;
  step: number;
  description: string;
};

export type ObjectModel = {
  name: string;
  params?: number[];
  model: GLTF | null;
};
