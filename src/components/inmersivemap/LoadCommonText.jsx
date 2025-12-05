import * as BABYLON from "@babylonjs/core";
import earcut from "earcut";
import LoadFonts from "./LoadFonts.jsx"; // Importar la función LoadFonts

let fontData, fontDataBold;

// Cargar fuentes una vez al inicio
const loadFonts = async () => {
  const fonts = await LoadFonts();
  fontData = fonts.fontData;
  fontDataBold = fonts.fontDataBold;
};

const DEG_TO_RAD = Math.PI / 180;

const createTextTech = (scene, text, font, position, rotation, size) => {
  const LoadCommonText = BABYLON.MeshBuilder.CreateText(
    "LoadCommonText",
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
  LoadCommonText.position = position;
  LoadCommonText.rotation = rotation;
  return LoadCommonText;
};

const LoadCommonText = async (scene) => {
  // Verificar si las fuentes se han cargado
  if (!fontData || !fontDataBold) {
    await loadFonts();
  }

  if (!fontData || !fontDataBold) {
    console.error("Fuentes no cargadas");
    return;
  }

  try {
    createTextTech(
      scene,
      "Total de trabajos:\nProvincia con\n más ofertas:\nOfertas para junior: \nOfertas en inglés: \nOfertas en remoto:",

      fontDataBold,
      new BABYLON.Vector3(4050, -450, -3000),
      new BABYLON.Vector3(
        15.8 * DEG_TO_RAD,
        227.4 * DEG_TO_RAD,
        0 * DEG_TO_RAD
      ),
      36
    );

    createTextTech(
      scene,
      "             Total de ofertas\n\nApuesta más por los juniors\n\nTecnología más demandada",

      fontDataBold,
      new BABYLON.Vector3(-110, -300, -600),
      new BABYLON.Vector3(
        13.5 * DEG_TO_RAD,
        178 * DEG_TO_RAD,
        27 * DEG_TO_RAD
      ),
      18
    );


  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
};

export default LoadCommonText;