import * as BABYLON from "@babylonjs/core";

const DEG_TO_RAD = Math.PI / 180;

const LoadMiniMap = (scene) => {
  try {
    const miniMap = BABYLON.SceneLoader.LoadAssetContainer(
      "/models/",
      "map.glb",
      scene,
      function (container) {
        const [meshes] = container.meshes;
        const [materials] = container.materials;

        // container.materials = logoMat;
        meshes.scaling = new BABYLON.Vector3(25, 25, 25);
        meshes.position = new BABYLON.Vector3(-1250, 250, -1900);
        meshes.rotation = new BABYLON.Vector3(
          15.8 * DEG_TO_RAD,
          207.1 * DEG_TO_RAD,
          0
        );
        // meshes.rotationQuaternion = rotationQuaternion;
        meshes.id = "minimap";
        meshes.name = "minimap";

        // Asignar controladores de clic a las mallas específicas

        container.addAllToScene();
      }
    );

    const glassMaterial = new BABYLON.StandardMaterial("glassMaterial", scene);
glassMaterial.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.25); // Color más claro para el vidrio
glassMaterial.specularColor = new BABYLON.Color3(1, 1, 1); // Reflejos blancos
glassMaterial.alpha = 0.3; // Más transparente
glassMaterial.reflectionTexture = new BABYLON.CubeTexture("/textures/skybox", scene);
glassMaterial.reflectionFresnelParameters = new BABYLON.FresnelParameters();
glassMaterial.reflectionFresnelParameters.bias = 0.1;
glassMaterial.emissiveColor = new BABYLON.Color3(0, 0, 0.1); // Leve auto-iluminación

// Crear el marco de cristal
const glass = BABYLON.MeshBuilder.CreateBox("glass", { height: 1100, width: 400, depth: 1, radius:30 }, scene);
glass.position = new BABYLON.Vector3(-1250, 250, -1900);
glass.scaling = new BABYLON.Vector3(3.7, 1.1, 1);

glass.rotation = new BABYLON.Vector3(
  15.8 * DEG_TO_RAD,
  207.1 * DEG_TO_RAD,
  0
);
glass.material = glassMaterial;



  } catch (error) {
    console.error("Error:", error);
  }
};
export default LoadMiniMap;
