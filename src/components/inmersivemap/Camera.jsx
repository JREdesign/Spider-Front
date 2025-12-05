import * as BABYLON from "@babylonjs/core";


const CreateCamera =  (scene, canvas) => {
    const camera = new BABYLON.FreeCamera(
      "camera1",
      new BABYLON.Vector3(5, 0, -20),
      scene
    );

    // Establecer el objetivo de la cámara en el centro de la escena
    camera.setTarget(BABYLON.Vector3.Zero());

    // Ajustar la rotación de la cámara
    camera.rotation = new BABYLON.Vector3(6.88 * (Math.PI / 180), 375.95 * (Math.PI / 180), 0);

    // Adjuntar el control de la cámara al lienzo
    camera.attachControl(canvas, true);
    // camera.detachControl();

    return camera; 
    
  };
  

export default CreateCamera;
