import * as BABYLON from "@babylonjs/core";
import { animateCameraPosition } from "./AnimationUtils";

const DEG_TO_RAD = Math.PI / 180;

const createArrow = (scene, camera, meshParams, animationParams, cameraParams) => {
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
      meshes.scaling = new BABYLON.Vector3(...meshParams.scaling);
      meshes.position = new BABYLON.Vector3(...meshParams.position);
      meshes.rotation = new BABYLON.Vector3(...meshParams.rotation);
      meshes.id = meshParams.id;
      meshes.name = meshParams.name;

      // Agregar la flecha a la escena
      container.addAllToScene();

      container.meshes.forEach((mesh) => {
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
            value: animationParams.start * DEG_TO_RAD,
          },
          {
            frame: 30,
            value: animationParams.middle * DEG_TO_RAD,
          },
          {
            frame: 60,
            value: animationParams.end * DEG_TO_RAD,
          },
        ];

        animation.setKeys(keys);
        mesh.animations.push(animation);
        scene.beginAnimation(mesh, 0, 60, true);
        mesh.actionManager = new BABYLON.ActionManager(scene);
        mesh.actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            () => {
              animateCameraPosition(
                camera,
                new BABYLON.Vector3(...cameraParams.target),
                new BABYLON.Vector3(...cameraParams.rotation),
                new BABYLON.Vector3(...cameraParams.position),
                cameraParams.duration
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

const ArrowsGoBack = (scene, camera) => {
  try {
    createArrow(scene, camera,
      {
        scaling: [200, 200, 200],
        position: [4800, -65, -2455],
        rotation: [340 * DEG_TO_RAD, 292 * DEG_TO_RAD, 0],
        id: "ArrowGoBack1",
        name: "ArrowGoBack1"
      },
      {
        start: 292,
        middle: 324,
        end: 292
      },
      {
        target: [0, 0, 0],
        rotation: [6.88 * DEG_TO_RAD, 375.95 * DEG_TO_RAD, 0],
        position: [0, 0, 0.5],
        duration: 2000
      }
    );

    createArrow(scene, camera,
      {
        scaling: [150, 150, 150],
        position: [4930, -59, -2600],
        rotation: [0, 184.6 * DEG_TO_RAD, 0],
        id: "ArrowGoBack2",
        name: "ArrowGoBack2"
      },
      {
        start: 184.6,
        middle: 150,
        end: 184.6
      },
      {
        target: [4721.87, -112.22, -8032.84],
        rotation: [1.16 * DEG_TO_RAD, 544.08 * DEG_TO_RAD, -2 * DEG_TO_RAD],
        position: [5200, 0, -2500],
        duration: 2000
      }
    );
  } catch (error) {
    console.error("Error:", error);
  }
};

export default ArrowsGoBack;