import * as BABYLON from "@babylonjs/core";
const DEG_TO_RAD = Math.PI / 180;

const CreateDomes = (scene) => {
  try {
    // Crear los domos 360
    const domeAula = new BABYLON.PhotoDome(
      "domeAula1",
      "./360/aula.jpg",
      {
        resolution: 32,
        size: 6000
      },
      scene
    );

    const domeHall = new BABYLON.PhotoDome(
      "domeHall",
      "./360/hall.jpg",
      {
        resolution: 32,
        size: 6000
      },
      scene
    );

    domeHall.position = new BABYLON.Vector3(4500, 0, -4000);
    domeHall.rotation = new BABYLON.Vector3(0, 112.6*DEG_TO_RAD, 0);

  } catch (error) {
    console.error("Error:", error);
  }
};

export default CreateDomes;
