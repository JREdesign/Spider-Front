import * as BABYLON from "@babylonjs/core";
import handleMeshClick from "./handleMeshClick"; // Importar la función handleMeshClick
import provinces from "./provincesArray.jsx";
import "@babylonjs/loaders/glTF";

const DEG_TO_RAD = Math.PI / 180;

const originalPositions = {}; // Objeto para almacenar las posiciones originales de las mallas
const originalRotations = {}; // Objeto para almacenar las rotaciones originales de las mallas
const originalMaterials = {};
const originalCameraTarget = {}; // Objeto para almacenar la rotación original de la cámara
const originalCameraRotation = {}; // Objeto para almacenar la rotación original de la cámara
const originalCameraPosition = {}; // Objeto para almacenar la rotación original de la cámara



const LoadMap = (scene, camera, onMeshSelection) => {
  const stdMat = new BABYLON.StandardMaterial("stdMat", scene);
  stdMat.emissiveColor = new BABYLON.Color3(0.6, 0.6, 0.6);
  stdMat.diffuseTexture = new BABYLON.Texture("./textures/marmol3.jpg", scene);
  const orangeMaterial = new BABYLON.StandardMaterial("orangeMaterial", scene);
  orangeMaterial.diffuseColor = new BABYLON.Color3(1, 0.5, 0);

  try {
    // Cargar el contenedor de activos del mapa
    const map = BABYLON.SceneLoader.LoadAssetContainer(
      "/models/",
      "map.glb",
      scene,
      function (container) {
        const [meshes] = container.meshes;
  
        // Configurar escala, posición, rotación, id y nombre de la malla del mapa
        meshes.scaling = new BABYLON.Vector3(25, 25, 25);
        meshes.position = new BABYLON.Vector3(300, -135, 1200);
        meshes.rotation = new BABYLON.Vector3(
          20.3 * DEG_TO_RAD,
          29.3 * DEG_TO_RAD,
          0
        );
        meshes.id = "principalMap";
        meshes.name = "principalMap";
  
        container.addAllToScene();
  
        // Asignar material a cada malla y crear caja para cada una
        container.meshes.forEach((mesh, index) => {
          mesh.material = stdMat;
  
          const uniqueId = provinces[index] || "mesh_" + index; // Usar el nombre de la provincia como ID, o si no está definido, usar un ID genérico
          mesh.id = uniqueId;
  
          if (!originalPositions[mesh.id]) {
            originalPositions[mesh.id] = mesh.position.clone();
          }
  
          if (!originalRotations[mesh.id]) {
            originalRotations[mesh.id] = mesh.rotation.clone();
          }
  
          // Crear una caja para cada malla y posicionarla en el centro de la malla
          if (mesh.id === "MADRID" || mesh.id === "BARCELONA" || mesh.id === "ASTURIAS") {
            BABYLON.SceneLoader.LoadAssetContainer(
              "/models/",
              "map_pointer.glb",
              scene,
              function (container) {
                const [modelMesh] = container.meshes;
          
                // Posición inicial
                const startPosition = new BABYLON.Vector3(-115, 96.5, 1120);
                modelMesh.position = startPosition;
                
                const displacementVector = new BABYLON.Vector3(-40, 20, -100); // Vector de desplazamiento en el eje Z
                const centerPosition = mesh.getBoundingInfo().boundingBox.centerWorld;
                const endPosition = centerPosition.add(displacementVector); // Calcula la nueva posición sumando el desplazamiento al centro
          
                // Escala, rotación, id y nombre del modelo
                modelMesh.scaling = new BABYLON.Vector3(7, 7, 15); // Ajusta la escala según sea necesario
                modelMesh.rotation = new BABYLON.Vector3(
                  20.3 * DEG_TO_RAD,
                  29.3 * DEG_TO_RAD,
                  0
                );
                modelMesh.id = "pointer_" + mesh.id; // Asigna un ID único al modelo
                modelMesh.name = "pointer_" + mesh.id; // Asigna un nombre único al modelo
          
                // Crear animación de posición
                const animation = new BABYLON.Animation(
                  "movePointer",
                  "position",
                  30,
                  BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                  BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
                );
          
                // Crear los fotogramas clave para la animación
                const keys = [
                  {
                    frame: 0,
                    value: startPosition,
                  },
                  {
                    frame: 30, // Pausa en la startPosition durante 1 segundo (30 fps * 1 segundo)
                    value: startPosition,
                  },
                  {
                    frame: 80, // Punto medio de la animación
                    value: endPosition,
                  },
                  {
                    frame: 140, // Pausa en la endPosition durante 2 segundos (30 fps * 2 segundos)
                    value: endPosition,
                  },
                  {
                    frame: 190, // Volver a la posición inicial
                    value: startPosition,
                  }
                ];
          
                animation.setKeys(keys);
          
                // Añadir la animación al modelo
                modelMesh.animations.push(animation);
          
                // Iniciar la animación
                scene.beginAnimation(modelMesh, 0, 190, true); // El tercer parámetro 'true' hace que la animación se repita
          
                // Agrega el modelo al escenario
                container.addAllToScene();
              }
            );
          }
          
         
          
          mesh.actionManager = new BABYLON.ActionManager(scene);
          mesh.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
              BABYLON.ActionManager.OnPickTrigger,
              (event) => {
                const meshId = mesh.id;
  
                const isPositionChanged = !mesh.position.equals(
                  originalPositions[meshId]
                );
  
                if (isPositionChanged) {
                  onMeshSelection(null);
                } else {
                  onMeshSelection(meshId);
                }
  
  
                handleMeshClick(
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
                );
              }
            )
          );
        });
      }
    );
    originalCameraTarget[camera.id] = camera.target.clone();
    originalCameraRotation[camera.id] = camera.rotation.clone();
    originalCameraPosition[camera.id] = camera.position.clone();
  } catch (error) {
    console.error("Error cargando mapa:", error);
  }

  return null;
};

export default LoadMap;
