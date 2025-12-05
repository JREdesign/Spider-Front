

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".toggle-button1");
  const apiUrl = window.apiUrl; // Accede a la variable desde window

  buttons.forEach((button1) => {
    button1.addEventListener("click", function () {
      toggleGraph(button1);
    });
  });

  async function toggleGraph(button1) {
    const graph = document.getElementById("graph1");

    if (graph) {
      graph.parentNode.removeChild(graph);
      button1.setAttribute("src", "./textures/on.png");
      button1.setAttribute("data-status", "on");
    } else {
      await fetchAndRenderGraph();
      button1.setAttribute("src", "./textures/off.png");
      button1.setAttribute("data-status", "off");
    }
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async function fetchAndRenderGraph() {
    const URI = `${apiUrl}/jobs/`;
    try {
      const response = await fetch(URI);
      if (response.status === 200) {
        const data = await response.json();
        const locationsCount = {};
        data.forEach((job) => {
          if (job.location) {
            let locationKey = job.location.toLowerCase();
            if (locationKey.includes("remoto") || locationKey.includes(",")) {
              locationKey = "remoto";
            }
            locationsCount[locationKey] =
              (locationsCount[locationKey] || 0) + 1;
          } else {
            console.warn("Job location is undefined", job);
          }
        });

        const remotoCount = Object.entries(locationsCount)
          .filter(([location]) => location === "remoto")
          .reduce((total, [, count]) => total + count, 0);
        const otherLocations = Object.entries(locationsCount)
          .filter(([location]) => location !== "remoto")
          .reduce(
            (obj, [location, count]) => ({ ...obj, [location]: count }),
            {}
          );

        const locationsData = { ...otherLocations, remoto: remotoCount };
        renderBarGraph(locationsData);
      } else {
        console.error("Error al obtener los datos");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  }

  function renderBarGraph(data) {
    const scene = document.querySelector("a-scene");
    const graphEntity = document.createElement("a-entity");
    graphEntity.setAttribute("id", "graph1");

    // Posiciona el gráfico en el centro del panel 1
    graphEntity.setAttribute("position", "-7 1.5 -4.3");

    // Ordenar las ubicaciones por el número de ofertas en orden descendente
    const sortedLocations = Object.entries(data)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10); // Limitar a las 10 ubicaciones con más ofertas

    // Calcula el valor máximo de ofertas para ajustar la altura de las barras
    const maxCount = Math.max(...sortedLocations.map(([_, count]) => count));

    // Ancho de cada barra
    const barWidth = 0.2;
    const barSeparation = 0.1; // Separación entre barras
    let positionX = -(
      (sortedLocations.length * (barWidth + barSeparation)) /
      2
    );

    // Colores para las barras
    const colors = [
      "#BF360C",
      "#D84315",
      "#E64A19",
      "#F4511E",
      "#FF5722",
      "#FF7043",
      "#FB8C00",
      "#FF9800",
      "#FFA726",
      "#FFB74D",
    ];

    sortedLocations.forEach(([location, count], index) => {
      const capitalizedLocation = location
        .split(" ")
        .map(capitalizeFirstLetter)
        .join(" ");
      const height = (count / maxCount) * 1.5; // Normaliza la altura
      const color = colors[index % colors.length];

      const bar = document.createElement("a-box");
      bar.setAttribute("position", `${positionX} 0 -3`);
      bar.setAttribute("height", `0`); // Comienza con altura 0
      bar.setAttribute("width", `${barWidth}`);
      bar.setAttribute("depth", "0.1");
      bar.setAttribute("color", color);
      bar.setAttribute(
        "animation__height",
        `property: height; to: ${height}; dur: 1500; easing: linear`
      );
      bar.setAttribute(
        "animation__position",
        `property: position; to: ${positionX} ${
          height / 2
        } -3; dur: 1500; easing: linear`
      );

      const numeroOfertas = document.createElement("a-text");
      numeroOfertas.setAttribute("value", `${count}`);
      numeroOfertas.setAttribute("position", `${positionX} 0.1 -3`);
      numeroOfertas.setAttribute("align", "center");
      numeroOfertas.setAttribute("width", "4");
      numeroOfertas.setAttribute(
        "animation__position",
        `property: position; to: ${positionX} ${
          height + 0.1
        } -3; dur: 1500; easing: linear`
      );

      const localizacion = document.createElement("a-text");
      localizacion.setAttribute("value", `${capitalizedLocation}`);
      localizacion.setAttribute("position", `${positionX} -0.5 -3`);
      localizacion.setAttribute("width", "3");
      localizacion.setAttribute("font", "../../Roboto-Regular-msdf.json");
      localizacion.setAttribute("rotation", "-10 0 90");

      graphEntity.appendChild(bar);
      graphEntity.appendChild(numeroOfertas);
      graphEntity.appendChild(localizacion);

      positionX += barWidth + barSeparation;
    });

    const existingGraph = document.getElementById("graph1");
    if (existingGraph) {
      scene.removeChild(existingGraph);
    }
    scene.appendChild(graphEntity);
  }
});