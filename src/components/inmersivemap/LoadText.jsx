import * as BABYLON from "@babylonjs/core";
import earcut from "earcut";
import {
  getLocationTotalJobs,
  getCompanyWithMostJuniorOffers,
  getMostRepeatedTechnology,
} from "./StatsUtils";

const DEG_TO_RAD = Math.PI / 180;

let fontDataBold = null;
let fontData = null;
let infoText = "";

const createTextMesh = (infoText, scene, text, font, position, rotation, scaling, size) => {
  const textMesh = BABYLON.MeshBuilder.CreateText(
    infoText,
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
  textMesh.scaling = scaling;
  return textMesh;
};

let textMesh = null;
let textTotalJobs = null;
let textCompany = null;
let textTechnology = null;

const LoadText = async (scene, selectedMeshId, fontData, fontDataBold) => {
  if (selectedMeshId === null) {
    if (textMesh) {
      textMesh.dispose();
      textMesh = null;
    }
    if (textTotalJobs) {
      textTotalJobs.dispose();
      textTotalJobs = null;
    }
    if (textCompany) {
      textCompany.dispose();
      textCompany = null;
    }
    if (textTechnology) {
      textTechnology.dispose();
      textTechnology = null;
    }

    return;
  }

  if (!fontData || !fontDataBold) {
    console.error("Fuentes no cargadas");
    return;
  }

  try {
    const provincia = `${selectedMeshId}`;

    if (!textMesh) {
      textMesh = createTextMesh(
        "locationText",
        scene,
        provincia,
        fontDataBold,
        new BABYLON.Vector3(-450, -80, -600),
        new BABYLON.Vector3(
          13 * DEG_TO_RAD,
          216 * DEG_TO_RAD,
          0 * DEG_TO_RAD
        ),
        new BABYLON.Vector3(1, 1, 4),
        33
      );
    } else {
      textMesh.text = provincia;
    }

    const mostRepeatedTechnology = await getMostRepeatedTechnology(selectedMeshId);
    const totalJobs = await getLocationTotalJobs(selectedMeshId);
    const companyWithMostJuniorOffers = await getCompanyWithMostJuniorOffers(selectedMeshId);
    const totalJobsResult = totalJobs !== null ? totalJobs.toString() : "N/A";

    if (!textTotalJobs) {
      textTotalJobs = createTextMesh(
        "totalJobsText",
        scene,
        totalJobsResult,
        fontData,
        new BABYLON.Vector3(-30, -138, -500),
        new BABYLON.Vector3(
          13.5 * DEG_TO_RAD,
          178 * DEG_TO_RAD,
          27 * DEG_TO_RAD
        ),
        new BABYLON.Vector3(1, 1, 1),
        18
      );
    } else {
      textTotalJobs.text = totalJobsResult;
    }

    if (!textCompany) {
      textCompany = createTextMesh(
        "CompanyJRText",
        scene,
        companyWithMostJuniorOffers,
        fontData,
        new BABYLON.Vector3(-62, -205, -500),
        new BABYLON.Vector3(
          13.5 * DEG_TO_RAD,
          178 * DEG_TO_RAD,
          27 * DEG_TO_RAD
        ),
        new BABYLON.Vector3(1, 1, 1),
        18
      );
    } else {
      textCompany.text = companyWithMostJuniorOffers;
    }

    if (!textTechnology) {
      textTechnology = createTextMesh(
        "RepTechText",
        scene,
        `${mostRepeatedTechnology.technology} (${mostRepeatedTechnology.count})`,
        fontData,
        new BABYLON.Vector3(-100, -280, -500),
        new BABYLON.Vector3(
          13.5 * DEG_TO_RAD,
          178 * DEG_TO_RAD,
          27 * DEG_TO_RAD
        ),
        new BABYLON.Vector3(1, 1, 1),
        18
      );
    } else {
      textTechnology.text = `${mostRepeatedTechnology.technology} (${mostRepeatedTechnology.count})`;
      textCompany.text = companyWithMostJuniorOffers;
      textTotalJobs.text = totalJobsResult;
    }
  } catch (error) {
    console.error(error);
  }
};

export default LoadText;