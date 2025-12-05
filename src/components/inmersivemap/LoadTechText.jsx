import * as BABYLON from "@babylonjs/core";
import earcut from "earcut";
import LoadFonts from "./LoadFonts.jsx"; // Importar la función LoadFonts

import {
  getTotalTechs,
  getMostCommonLocation,
  getJuniorOffersByTechnology,
  getEnglishOffersByTechnology,
  getRemoteOffersByTechnology,
} from "./TechStatsUtils.jsx";

let fontData, fontDataBold;

// Cargar fuentes una vez al inicio
const loadFonts = async () => {
  const fonts = await LoadFonts();
  fontData = fonts.fontData;
  fontDataBold = fonts.fontDataBold;
};

const DEG_TO_RAD = Math.PI / 180;
const createTextMesh = (scene, text, font, position, rotation, size, name) => {
  let textMesh = scene.getMeshByName(name);
  if (textMesh) {
    textMesh.dispose(); // Eliminar el mesh antiguo
  }
  
  textMesh = BABYLON.MeshBuilder.CreateText(
    name,
    text,
    font,
    {
      size: size,
      resolution: 16,
      depth: 6,
    },
    scene,
    earcut
  );
  textMesh.position = position;
  textMesh.rotation = rotation;
  return textMesh;
};

const LoadTechText = async (scene, cylinderName) => {
  // Verificar si las fuentes se han cargado
  if (!fontData || !fontDataBold) {
    await loadFonts();
  }

  if (!fontData || !fontDataBold) {
    console.error("Fuentes no cargadas");
    return;
  }

  try {
    // Crear texto con el nombre del cilindro
    createTextMesh(
      scene,
      cylinderName,
      fontDataBold,
      new BABYLON.Vector3(4700, 30, -2600),
      new BABYLON.Vector3(
        15.8 * DEG_TO_RAD,
        227.4 * DEG_TO_RAD,
        0 * DEG_TO_RAD
      ),
      22,
      "cylinderTechText"
    );

    // Obtener los datos necesarios para el texto
    const [
      totalTechs,
      mostCommonLocationData,
      juniorOffers,
      englishOffers,
      remoteOffers,
    ] = await Promise.all([
      getTotalTechs(cylinderName),
      getMostCommonLocation(cylinderName),
      getJuniorOffersByTechnology(cylinderName),
      getEnglishOffersByTechnology(cylinderName),
      getRemoteOffersByTechnology(cylinderName),
    ]);

    console.log("Datos obtenidos:", {
      totalTechs,
      mostCommonLocationData,
      juniorOffers,
      englishOffers,
      remoteOffers,
    });

    // Crear texto con la información obtenida
    const techInfoText = `${totalTechs}\n${mostCommonLocationData.location} (${mostCommonLocationData.count})\n${juniorOffers}\n${englishOffers}\n${remoteOffers}`;
    createTextMesh(
      scene,
      techInfoText,
      fontDataBold,
      new BABYLON.Vector3(4250, -260, -2540),
      new BABYLON.Vector3(
        15.8 * DEG_TO_RAD,
        227.4 * DEG_TO_RAD,
        0 * DEG_TO_RAD
      ),
      26,
      "techTextInfo"
    );

    console.log("Texto actualizado:", techInfoText);
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
};



export default LoadTechText;