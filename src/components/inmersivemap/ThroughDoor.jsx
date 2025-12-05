import * as BABYLON from "@babylonjs/core";
import "@babylonjs/core/Rendering/outlineRenderer";
import { animateCameraPosition } from "./AnimationUtils";

const DEG_TO_RAD = Math.PI / 180;



const ThroughDoor = (scene, camera) => {

  const orangeMaterial = new BABYLON.StandardMaterial("orangeMaterial", scene);
  orangeMaterial.diffuseColor = new BABYLON.Color3(1, 0.5, 0);
  orangeMaterial.alpha = 1;

  const glassMaterial = new BABYLON.StandardMaterial("glassMaterial", scene);
  glassMaterial.alpha = 1; 

  
  BABYLON.SceneLoader.LoadAssetContainer(
    "/models/",
    "arrow.glb",
    scene,
    function (container) {
      const [meshes] = container.meshes;

      // Ajustar la escala, posición y rotación de la flecha
      meshes.scaling = new BABYLON.Vector3(1000, 1000, 1000);
      meshes.position = new BABYLON.Vector3(1700, -445, -900);
      meshes.rotation = new BABYLON.Vector3(
        317.5 * DEG_TO_RAD,
        76.6 * DEG_TO_RAD,
        78.8 * DEG_TO_RAD
      );
      meshes.id = "ArrowDoor";
      meshes.name = "ArrowDoor";

      // Agregar la flecha a la escena
      container.addAllToScene();

      container.meshes.forEach((mesh, index) => {
        const animation = new BABYLON.Animation(
          "arrowRotation",
          "rotation.x",
          30,
          BABYLON.Animation.ANIMATIONTYPE_FLOAT,
          BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
        );

        const keys = [
          {
            frame: 0,
            value: 300 * DEG_TO_RAD,
          },
          {
            frame: 30,
            value: 324 * DEG_TO_RAD,
          },
          {
            frame: 60,
            value: 300 * DEG_TO_RAD,
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
                new BABYLON.Vector3(-5130, -612.34, -8022), // target
                new BABYLON.Vector3(
                  6.33 * DEG_TO_RAD,
                  540.08 * DEG_TO_RAD,
                  2 * DEG_TO_RAD
                ), // rotation
                new BABYLON.Vector3(5200, 0, -2500), // position
                2500 // Duración de la animación en milisegundos
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
        );

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
        );
      });
    }
  );
};

export default ThroughDoor;