// ArrowPointingDoor.js

import * as BABYLON from "@babylonjs/core";
import { animateCameraPosition } from "./AnimationUtils";

const DEG_TO_RAD = Math.PI / 180;

const ArrowPointingDoor = (scene, camera) => {
  const orangeMaterial = new BABYLON.StandardMaterial("orangeMaterial", scene);
  orangeMaterial.diffuseColor = new BABYLON.Color3(1, 0.5, 0);
  orangeMaterial.alpha = 1;

  const glassMaterial = new BABYLON.StandardMaterial("glassMaterial", scene);
  glassMaterial.alpha = 1;
  try {
    BABYLON.SceneLoader.LoadAssetContainer(
      "/models/",
      "arrow.glb",
      scene,
      function (container) {
        const [meshes] = container.meshes;

        // Ajustar la escala, posición y rotación de la flecha
        meshes.scaling = new BABYLON.Vector3(350, 350, 350);
        meshes.position = new BABYLON.Vector3(270, -120, 200);
        meshes.rotation = new BABYLON.Vector3(
          15.8 * DEG_TO_RAD,
          193.6 * DEG_TO_RAD,
          0
        );
        meshes.id = "ArrowPointingDoor";
        meshes.name = "ArrowPointingDoor";

        // Agregar la flecha a la escena
        container.addAllToScene();

        container.meshes.forEach((mesh, index) => {
          const animation = new BABYLON.Animation(
            "arrowRotation",
            "rotation.y",
            30,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
          );

          const keys = [
            {
              frame: 0,
              value: 193.6 * DEG_TO_RAD,
            },
            {
              frame: 30,
              value: 230 * DEG_TO_RAD,
            },
            {
              frame: 60,
              value: 193.6 * DEG_TO_RAD,
            },
          ];

          animation.setKeys(keys);
          mesh.animations.push(animation);
          scene.beginAnimation(mesh, 0, 60, true);
          mesh.actionManager = new BABYLON.ActionManager(scene);
          mesh.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
              BABYLON.ActionManager.OnPickTrigger,
              (event) => {
                // Animar la posición y rotación de la cámara
                animateCameraPosition(
                  camera,
                  new BABYLON.Vector3(465.31, -3.36, -4.31), //target
                  new BABYLON.Vector3(8.79 * DEG_TO_RAD, 477 * DEG_TO_RAD, 0), //rotation
                  new BABYLON.Vector3(444, 0, 0), //position
                  2000 // Duración de la animación en milisegundos
                );

            
              }
            )
          );

          mesh.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
              BABYLON.ActionManager.OnPointerOverTrigger,
              (ev) => {
                let mesh = ev.meshUnderPointer;
                if (mesh) {
                  mesh.material = orangeMaterial;
                }
              }
            )
          )
  
          mesh.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
              BABYLON.ActionManager.OnPointerOutTrigger,
              (ev) => {
                let mesh = ev.meshUnderPointer;
                if (mesh) {
                  mesh.material = glassMaterial;
                  
                }
              }
            )
          )
        });
      }
    );
  } catch (error) {
    console.error("Error:", error);
  }
};

export default ArrowPointingDoor;