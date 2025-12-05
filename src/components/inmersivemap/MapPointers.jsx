import * as BABYLON from "@babylonjs/core";

const DEG_TO_RAD = Math.PI / 180;

const MapPointers = async (scene, meshPosition) => {
  try {
    BABYLON.SceneLoader.LoadAssetContainer(
      "/models/",
      "map_pointer.glb",
      scene,
      function (container) {
        const [meshes] = container.meshes;

        meshes.position = meshPosition;
        meshes.scaling = new BABYLON.Vector3(5.5, 5.5, 11);
        meshes.rotation = new BABYLON.Vector3(
          20.3 * DEG_TO_RAD,
          319.7 * DEG_TO_RAD,
          0
        );
        meshes.id = "pointer";
        meshes.name = "pointer";
        container.addAllToScene();
      }
    );
  } catch (error) {
    console.error("Error:", error);
  }
};

export default MapPointers;
