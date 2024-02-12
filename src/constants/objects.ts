// Objects

import { ObjectModel } from "../entities/entities";

export const objects: ObjectModel[] = [
  {
    name: "BoxGeometry",
    params: [2, 2, 2],
    model: null,
  },
  {
    name: "ConeGeometry",
    params: [2, 2, 16, 16],
    model: null,
  },
  {
    name: "CapsuleGeometry",
    params: [1, 1, 4, 8],
    model: null,
  },
  {
    name: "CircleGeometry",
    params: [1, 32],
    model: null,
  },
  {
    name: "CylinderGeometry",
    params: [2, 2, 1, 32],
    model: null,
  },
  {
    name: "DodecahedronGeometry",
    params: [1, 0],
    model: null,
  },
  {
    name: "IcosahedronGeometry",
    params: [1, 0],
    model: null,
  },
  {
    name: "OctahedronGeometry",
    params: [1, 0],
    model: null,
  },
  {
    name: "PlaneGeometry",
    params: [1, 1],
    model: null,
  },
  {
    name: "RingGeometry",
    params: [1, 1.5, 32],
    model: null,
  },
  {
    name: "SphereGeometry",
    params: [1, 16, 32],
    model: null,
  },
  {
    name: "TetrahedronGeometry",
    params: [1, 0],
    model: null,
  },
  {
    name: "TorusGeometry",
    params: [1, 0.2, 8, 33],
    model: null,
  },
  {
    name: "TorusKnotGeometry",
    params: [1, 0.2, 8, 33],
    model: null,
  },
];
