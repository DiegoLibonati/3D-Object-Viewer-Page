export const createGui = (gui, prop, objects, folderName) => {
  const folderMesh = gui.addFolder(folderName);

  for (let property of objects) {
    if (property.key === "color") {
      folderMesh
        .addColor(property.name ? prop[property.name] : prop, property.key)
        .name(property.description);
      continue;
    }

    folderMesh
      .add(property.name ? prop[property.name] : prop, property.key)
      .min(property?.min)
      .max(property?.max)
      .step(property?.step)
      .name(property.description);
  }

  return folderMesh;
};
