import * as BABYLON from "@babylonjs/core";
import techList from "./techList";
import { animateCameraPosition } from "./AnimationUtils";
import LoadTechText from "./LoadTechText"; // Importar LoadTechText

const DEG_TO_RAD = Math.PI / 180;

const CreateCylinders = async (scene, TetraObject, tetra, camera) => {
  for (let i = 0; i < TetraObject.face.length; i++) {
    // Obtener los vértices de la cara actual
    const faceVertices = TetraObject.face[i];

    // Crear un vector que contenga los vértices de la cara actual
    const faceVerticesVector = faceVertices.map(
      (index) =>
        new BABYLON.Vector3(
          TetraObject.vertex[index][0],
          TetraObject.vertex[index][1],
          TetraObject.vertex[index][2]
        )
    );

    // Calcular el centro de la cara actual
    const center = faceVerticesVector
      .reduce((acc, cur) => acc.add(cur), BABYLON.Vector3.Zero())
      .scale(1 / faceVertices.length);

    // Calcular la normal de la cara actual
    const v1 = faceVerticesVector[1].subtract(faceVerticesVector[0]);
    const v2 = faceVerticesVector[2].subtract(faceVerticesVector[0]);
    const normal = BABYLON.Vector3.Cross(v1, v2).normalize();

    // Multiplicar la normal por un factor para extenderla desde el centro de la cara
    const radius = 44; // Radio del cilindro
    const position = center.subtract(normal.scale(radius)); // Resta en lugar de sumar
    const distanceToCenter = position.subtract(center).length(); // Distancia al centro
    const newPosition = center.add(
      normal.scale(radius + distanceToCenter * 0.1)
    ); // Ajustar posición

    // Crear un cilindro en la posición calculada
    const cylinderName = techList[i % techList.length]; // Nombre de la tecnología
    const cylinder = BABYLON.MeshBuilder.CreateCylinder(
      cylinderName, // Usar el nombre de la tecnología como nombre de la mesh
      { diameter: 20, height: 3, tessellation: 8 },
      scene
    );
    cylinder.position = newPosition;

    // Rotar el cilindro para que su eje Y apunte en la dirección opuesta de la normal de la cara
    const angle = Math.acos(BABYLON.Vector3.Dot(normal, BABYLON.Axis.Y));
    const axis = BABYLON.Vector3.Cross(normal, BABYLON.Axis.Y);
    cylinder.rotationQuaternion = BABYLON.Quaternion.RotationAxis(axis, -angle); // Cambiar el signo de la rotación

    // Crear y asignar el material con la imagen
    const material = new BABYLON.StandardMaterial(
      `material_${cylinderName}`,
      scene
    );
    material.diffuseTexture = new BABYLON.Texture(
      `./techlist/${cylinderName}.png`,
      scene
    );
    cylinder.material = material;

    cylinder.parent = tetra;
    cylinder.isPickable = true;

    // Añadir acción para animar la cámara al hacer clic en el cilindro
    cylinder.actionManager = new BABYLON.ActionManager(scene);
    cylinder.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPickTrigger,
        async function () {
          // Animar la posición de la cámara
          await animateCameraPosition(
            camera,
            new BABYLON.Vector3(-98.65, -963.34, -4458), // target
            new BABYLON.Vector3(
              10 * DEG_TO_RAD,
              609.08 * DEG_TO_RAD,
              2 * DEG_TO_RAD
            ), // rotation
            new BABYLON.Vector3(5000, 0, -2500), // position
            1000 // Duración de la animación en milisegundos
          );

          // Llamar a LoadTechText para crear el texto
          LoadTechText(scene, cylinderName);
        }
      )
    );
  }
};

export default CreateCylinders;
