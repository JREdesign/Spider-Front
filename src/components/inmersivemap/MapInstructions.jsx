import * as BABYLON from "@babylonjs/core";
import earcut from "earcut";
import LoadFonts from "./LoadFonts.jsx"; // Importar la función LoadFonts

const DEG_TO_RAD = Math.PI / 180;

let fontDataBold;

// Cargar fuentes una vez al inicio
const loadFonts = async () => {
  const fonts = await LoadFonts();
  fontDataBold = fonts.fontDataBold;
};

const MapInstructions = async (scene) => {
  try {
    await loadFonts(); // Esperar a que las fuentes estén cargadas

    BABYLON.SceneLoader.LoadAssetContainer(
      "/models/",
      "map_pointer.glb",
      scene,
      function (container) {
        const [meshes] = container.meshes;

        // Ajustar la escala, posición y rotación de la flecha
        meshes.scaling = new BABYLON.Vector3(11, 11, 22);
        meshes.position = new BABYLON.Vector3(-110, 100, 1080);
        meshes.rotation = new BABYLON.Vector3(
          20.3 * DEG_TO_RAD,
          319.70 * DEG_TO_RAD,
          0
        );
        meshes.id = "mapPointer";
        meshes.name = "mapPointer";

        // Agregar la flecha a la escena
        container.addAllToScene();

        const textMesh = BABYLON.MeshBuilder.CreateText(
          "TextInstructions",
          "Escuelas F5\nHaz click en el mapa!",
          fontDataBold,
          {
            size: 10,
            resolution: 16,
            depth: 6,
          },
          scene,
          earcut
        );

        // Ajustar el color del material del texto a blanco puro
        const stdMat = new BABYLON.StandardMaterial("stdMat", scene);
        stdMat.emissiveColor = new BABYLON.Color3(0.6, 0.6, 0.6);
        stdMat.diffuseTexture = new BABYLON.Texture(
          "./textures/marmol3.jpg",
          scene
        );
        textMesh.material = stdMat;

        textMesh.position = new BABYLON.Vector3(-150, 0, 1000);
        textMesh.scaling = new BABYLON.Vector3(3, 3, 1);
        textMesh.rotation = new BABYLON.Vector3(20.30*DEG_TO_RAD, 319.70*DEG_TO_RAD, 0);

        container.meshes.forEach(async (mesh, index) => {
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
              value: 319.70 * DEG_TO_RAD,
            },
            {
              frame: 30,
              value: 350 * DEG_TO_RAD,
            },
            {
              frame: 60,
              value: 319.70 * DEG_TO_RAD,
            },
          ];

          animation.setKeys(keys);
          mesh.animations.push(animation);
          scene.beginAnimation(mesh, 0, 60, true);
        });
      }
    );
  } catch (error) {
    console.error("Error:", error);
  }
};

export default MapInstructions;
