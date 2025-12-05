// LoadIcosahedron.js
import * as BABYLON from "@babylonjs/core";
import React from 'react';
import Tetrah from './Tetrah';
import createCylinders from './CreateCylinders';

const LoadIcosahedron = (scene, camera) => {
  const material = new BABYLON.StandardMaterial("material", scene);
  material.diffuseColor = new BABYLON.Color3(1, 1, 1); // Color del material
  material.alpha = 0.5; // Opacidad del material
  material.emissiveColor = new BABYLON.Color3(0.5, 0.5, 1); // Color de emisión del material
  material.specularColor = new BABYLON.Color3(0, 0, 0); // Color especular del material
  material.backFaceCulling = true; // No ocultar las caras traseras del material
  material.wireframe = false; // Mostrar el dodecaedro en modo alámbrico

  // Cambiar el color de los bordes
  material.edgesColor = new BABYLON.Color4(1, 0, 0, 1); // Color rojo para los bordes

  // Asignar el material al dodecaedro
  let TetraObject = Tetrah(); // Get the Tetrah object from the Tetrah component

  let tetra = BABYLON.MeshBuilder.CreatePolyhedron(
    "Tetra",
    { custom: TetraObject, size: 52 },
    scene
  );
  tetra.position = new BABYLON.Vector3(5000, -200, -5000);
  tetra.scaling = new BABYLON.Vector3(10, 10, 10);

  tetra.material = material;

  let rotating = false;
  let rightDir = new BABYLON.Vector3();
  let upDir = new BABYLON.Vector3();
  const sensitivity = 0.005;

  scene.onPointerObservable.add((pointerInfo) => {
    if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERDOWN) {
      if (pointerInfo.pickInfo.pickedMesh === tetra) {
        rotating = true;
        scene.activeCamera.detachControl();
      }
    } else if (
      pointerInfo.type === BABYLON.PointerEventTypes.POINTERUP &&
      rotating
    ) {
      rotating = false;
      scene.activeCamera.attachControl();
    } else if (
      pointerInfo.type === BABYLON.PointerEventTypes.POINTERMOVE &&
      rotating
    ) {
      const matrix = scene.activeCamera.getWorldMatrix();
      rightDir.copyFromFloats(matrix.m[0], matrix.m[1], matrix.m[2]);
      upDir.copyFromFloats(matrix.m[4], matrix.m[5], matrix.m[6]);

      tetra.rotateAround(
        tetra.position,
        rightDir,
        pointerInfo.event.movementY * -1 * sensitivity
      );
      tetra.rotateAround(
        tetra.position,
        upDir,
        pointerInfo.event.movementX * -1 * sensitivity
      );
    }
  });



  // Llamar a la función para crear los cilindros
  createCylinders(scene, TetraObject, tetra, camera);
};

export default LoadIcosahedron;
