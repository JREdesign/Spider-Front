import * as BABYLON from "@babylonjs/core";


const Lights = (scene) => {
    const light = new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(0, 0.12, 0.11),
      scene
    );
  
    const lightMiniMap = new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(0, 0, 0.43),
      scene
    );
    lightMiniMap.intensity = 0.35; // Reducir la intensidad a la mitad
  };
  
  export default Lights;
  