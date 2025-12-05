import * as BABYLON from "@babylonjs/core";
import {
  moveObjectToPosition,
  animateRotation,
  animateCameraPosition,
} from "./AnimationUtils";

const DEG_TO_RAD = Math.PI / 180;

const handleMeshClick = (
  mesh,
  event,
  stdMat,
  orangeMaterial,
  originalPositions,
  originalRotations,
  originalMaterials,
  camera,
  originalCameraTarget,
  originalCameraRotation,
  originalCameraPosition
) => {


  animateRotation(
    mesh,
    new BABYLON.Vector3(319.7 * DEG_TO_RAD, 0, 177.9 * DEG_TO_RAD),
    1000
  );

  // Mover el objeto a una posición específica
  moveObjectToPosition(mesh, new BABYLON.Vector3(6.56, -133.5, 32.36), 2000);

  // Cambiar el color de la malla
  if (mesh.material === orangeMaterial) {
    // Restaurar el material original de la malla
    mesh.material = stdMat;
  } else {
    // Almacenar el material original de la malla si aún no se ha almacenado
    if (!originalMaterials[mesh.id]) {
      originalMaterials[mesh.id] = mesh.material;
    }

    // Aplicar el material naranja solo a la malla seleccionada
    setTimeout(() => {
      mesh.material = orangeMaterial;
    }, 1950);   }

  const originalPosition = originalPositions[mesh.id];
  const originalRotation = originalRotations[mesh.id];

  // Verificar si la posición actual es diferente de la posición original
  if (originalPosition && !mesh.position.equals(originalPosition)) {
    // Mover la provincia a su posición original
    moveObjectToPosition(mesh, originalPosition, 2000);
  }

  // Verificar si la rotación actual es diferente de la rotación original
  if (originalRotation && !mesh.rotation.equals(originalRotation)) {
    // Rotar la provincia a su rotación original
    animateRotation(mesh, originalRotation, 1000);
  }

  // Verificar si la rotación actual de la cámara es diferente de la rotación original
  if (!camera.rotation.equals(originalCameraRotation[camera.id])) {
    // Animar la rotación de la cámara de regreso a su posición original
    animateCameraPosition(
      camera,
      originalCameraTarget[camera.id],
      originalCameraRotation[camera.id],
      originalCameraPosition[camera.id],
      2000 // Duración de la animación en milisegundos
    );
  } else {
    // Si la rotación de la cámara es la original, animarla a una posición predeterminada
    animateCameraPosition(
      camera,
      new BABYLON.Vector3(
        -33 ,
        9.13 ,
        -148.34 
      ),
      new BABYLON.Vector3(
        11.94 * DEG_TO_RAD,
        199.08 * DEG_TO_RAD,
        35 * DEG_TO_RAD
      ),
      new BABYLON.Vector3(
        -26.22 ,
        13.52,
        -128.74
      ), // Posición objetivo
      2000 // Duración de la animación en milisegundos
    );
  }
};

export default handleMeshClick;
