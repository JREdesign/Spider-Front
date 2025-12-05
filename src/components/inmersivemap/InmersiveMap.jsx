import { useState, useEffect } from "react";
import * as BABYLON from "@babylonjs/core";
import CreateDomes from "./Domes.jsx";
import Lights from "./Lights.jsx";
import LoadMiniMap from "./MiniMap.jsx";
import CreateCamera from "./Camera.jsx";
import LoadMap from "./Map.jsx";
import LoadText from "./LoadText.jsx";
// import InspectorSetup from "./InspectorSetup.jsx";
import ArrowPointingDoor from "./ArrowPointingDoor.jsx";
import ThroughDoor from "./ThroughDoor.jsx";
import LoadIcosahedron from "./TruncatedIcosahedron.jsx";
import LoadFonts from "./LoadFonts.jsx";
import MapInstructions from "./MapInstructions.jsx";
import LoadCommonText from "./LoadCommonText.jsx";
import ArrowsGoBack from "./ArrowsGoBack.jsx";

const InmersiveMap = () => {
  const [scene, setScene] = useState(null);
  const [selectedMeshId, setSelectedMeshId] = useState(null);
  const [fontData, setFontData] = useState(null);
  const [fontDataBold, setFontDataBold] = useState(null);

  const handleMeshSelection = (meshId) => {
    setSelectedMeshId(meshId);
  };

  useEffect(() => {
    const initializeScene = async () => {
      await waitForResources();
      const canvas = document.getElementById("renderCanvas");
      const engine = new BABYLON.Engine(canvas, true);
      const scene = await createScene(engine, canvas);
      setScene(scene);
      engine.runRenderLoop(() => {
        scene.render();
      });

      return () => {
        engine.dispose();
        scene.dispose();
      };
    };

    initializeScene();
  }, []);

  useEffect(() => {
    const fetchFonts = async () => {
      const fonts = await LoadFonts();
      if (fonts) {
        setFontData(fonts.fontData);
        setFontDataBold(fonts.fontDataBold);
      }
    };

    fetchFonts();
  }, []);

  useEffect(() => {
    if (scene && fontData && fontDataBold) {
      LoadText(scene, selectedMeshId, fontData, fontDataBold);
    }
  }, [selectedMeshId, scene, fontData, fontDataBold]);

  const waitForResources = async () => {
    return new Promise((resolve) => {
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", resolve);
      } else {
        resolve();
      }
    });
  };

  const createScene = async (engine, canvas) => {
    const scene = new BABYLON.Scene(engine);
    Lights(scene);
    LoadMiniMap(scene);
    CreateDomes(scene);
    // InspectorSetup(scene);

    const camera = CreateCamera(scene, canvas);
    ThroughDoor(scene, camera);
    LoadMap(scene, camera, handleMeshSelection);
    MapInstructions(scene); 
    LoadCommonText(scene);
    ArrowsGoBack(scene,camera);
    ArrowPointingDoor(scene, camera);
    LoadIcosahedron(scene, camera);
    await LoadText(scene, selectedMeshId, fontData, fontDataBold);

    return scene;
  };

  return (
    <section>
      <canvas
        id="renderCanvas"
        className="rounded-lg shadow-lg my-8 mx-auto relative container"
        tabIndex="0"
      />
    </section>
  );
};

export default InmersiveMap;
