import * as BABYLON from "@babylonjs/core";

// Función para mover un objeto a una posición específica con una animación
export const moveObjectToPosition = (mesh, targetPosition, duration) => {
  const initialPosition = mesh.position.clone(); // Posición inicial del objeto
  const startTime = Date.now(); // Tiempo inicial de la animación

  // Función de actualización que se llamará en cada cuadro de animación
  const updatePosition = () => {
    const currentTime = Date.now(); // Tiempo actual
    const deltaTime = currentTime - startTime; // Tiempo transcurrido desde el inicio de la animación

    // Calcular el progreso de la animación (un valor entre 0 y 1)
    const progress = Math.min(deltaTime / duration, 1);

    // Interpolar la posición del objeto entre la posición inicial y la posición objetivo
    const newPosition = BABYLON.Vector3.Lerp(
      initialPosition,
      targetPosition,
      progress
    );

    // Actualizar la posición del objeto
    mesh.position.copyFrom(newPosition);

    // Si la animación no ha terminado, continuar actualizando la posición en el próximo cuadro de animación
    if (progress < 1) {
      requestAnimationFrame(updatePosition);
    }
  };

  // Iniciar la animación llamando a la función de actualización por primera vez
  requestAnimationFrame(updatePosition);
};

// Función para animar la rotación de un objeto
export const animateRotation = (mesh, targetRotation, duration) => {
  const initialRotation = mesh.rotation.clone(); // Rotación inicial de la malla
  const startTime = Date.now(); // Tiempo inicial de la animación

  // Función de actualización que se llamará en cada cuadro de animación
  const updateRotation = () => {
    const currentTime = Date.now(); // Tiempo actual
    const deltaTime = currentTime - startTime; // Tiempo transcurrido desde el inicio de la animación

    // Calcular el progreso de la animación (un valor entre 0 y 1)
    const progress = Math.min(deltaTime / duration, 1);

    // Interpolar la rotación de la malla entre la rotación inicial y la rotación objetivo
    const newRotation = BABYLON.Vector3.Lerp(
      initialRotation,
      targetRotation,
      progress
    );

    // Actualizar la rotación de la malla
    mesh.rotation.copyFrom(newRotation);

    // Si la animación no ha terminado, continuar actualizando la rotación en el próximo cuadro de animación
    if (progress < 1) {
      requestAnimationFrame(updateRotation);
    }
  };

  // Iniciar la animación llamando a la función de actualización por primera vez
  requestAnimationFrame(updateRotation);
};


  
  export const animateCameraPosition = (
    camera,
    newTarget,
    newRotation,
    newPosition,
    duration
  ) => {
    const initialTarget = camera.target.clone(); // Posición inicial de la cámara
    const initialRotation = camera.rotation.clone(); // Rotación inicial de la cámara
    const initialPosition = camera.position.clone(); // Rotación inicial de la cámara
    const startTime = Date.now(); // Tiempo inicial de la animación
  
    // Función de actualización que se llamará en cada cuadro de animación
    const updateTransformation = () => {
      const currentTime = Date.now(); // Tiempo actual
      const deltaTime = currentTime - startTime; // Tiempo transcurrido desde el inicio de la animación
  
      // Calcular el progreso de la animación (un valor entre 0 y 1)
      const progress = Math.min(deltaTime / duration, 1);
  
      // Interpolar los valores de destino entre los valores iniciales y los nuevos
      const interpolatedTarget = BABYLON.Vector3.Lerp(
        initialTarget,
        newTarget,
        progress
      );
      const interpolatedRotation = BABYLON.Vector3.Lerp(
        initialRotation,
        newRotation,
        progress
      );
      const interpolatedPosition = BABYLON.Vector3.Lerp(
        initialPosition,
        newPosition,
        progress
      );
  
      // Actualizar la posición, rotación y target de la cámara
      camera.setTarget(interpolatedTarget);
      camera.rotation.copyFrom(interpolatedRotation);
      camera.position.copyFrom(interpolatedPosition);
  
      // Si la animación no ha terminado, continuar actualizando en el próximo cuadro de animación
      if (progress < 1) {
        requestAnimationFrame(updateTransformation);
      }
    };
  
    // Iniciar la animación llamando a la función de actualización por primera vez
    requestAnimationFrame(updateTransformation);
  };
  