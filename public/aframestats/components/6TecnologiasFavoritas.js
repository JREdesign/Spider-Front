// TecnologiasFavoritas.js
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".toggle-button6");
  const apiUrl = window.apiUrl; // Accede a la variable desde window

  buttons.forEach((button6) => {
    button6.addEventListener("click", function () {
      toggleGraph(button6);
    });
  });

  async function toggleGraph(button6) {
    const graph = document.getElementById("graph6");

    if (graph) {
      graph.parentNode.removeChild(graph);
      button6.setAttribute("src", "./textures/on.png");
      button6.setAttribute("data-status", "on");
    } else {
      await fetchAndRenderGraph();
      button6.setAttribute("src", "./textures/off.png");
      button6.setAttribute("data-status", "off");
    }
  }

  async function fetchAndRenderGraph() {
    const URI = `${apiUrl}/auth/all-users`;
    try {
      const response = await fetch(URI);
      if (response.status === 200) {
        const data = await response.json();
        const technologiesCount = {};

        data.forEach((user) => {
          user.favoriteTechnologies.forEach((tech) => {
            const techKey = tech.toLowerCase();
            technologiesCount[techKey] = (technologiesCount[techKey] || 0) + 1;
          });
        });

        renderBarGraph(technologiesCount);
      } else {
        console.error("Error al obtener los datos");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function renderBarGraph(data) {
    const scene = document.querySelector("a-scene");
    const graphEntity = document.createElement("a-entity");
    graphEntity.setAttribute("id", "graph6");

    // Posiciona el gráfico en el centro del panel 1
    graphEntity.setAttribute("position", "-7 1.5 10.3");

    // Ordenar las tecnologías por el número de usuarios que las mencionan en orden descendente
    const sortedTechnologies = Object.entries(data)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10); // Limitar a las 10 tecnologías más mencionadas

    // Calcula el valor máximo de menciones para ajustar la altura de las barras
    const maxCount = Math.max(...sortedTechnologies.map(([_, count]) => count));

    // Ancho de cada barra
    const barWidth = 0.2;
    const barSeparation = 0.1; // Separación entre barras
    let positionX =
      (sortedTechnologies.length * (barWidth + barSeparation)) / 2 -
      barWidth / 2; // Ajustar la posición inicial para centrado

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

    sortedTechnologies.forEach(([tech, count], index) => {
      const capitalizedTech = tech
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

      const numeroMenciones = document.createElement("a-text");
      numeroMenciones.setAttribute("value", `${count}`);
      numeroMenciones.setAttribute("position", `${positionX} 0.1 -3`);
      numeroMenciones.setAttribute("align", "center");
      numeroMenciones.setAttribute("width", "4");
      numeroMenciones.setAttribute("rotation", "0 180 0");
      numeroMenciones.setAttribute(
        "animation__position",
        `property: position; to: ${positionX} ${
          height + 0.1
        } -3; dur: 1500; easing: linear`
      );

      const tecnologia = document.createElement("a-text");
      tecnologia.setAttribute("value", `${capitalizedTech}`);
      tecnologia.setAttribute("position", `${positionX} -0.5 -3`);
      tecnologia.setAttribute("width", "3");
      tecnologia.setAttribute("font", "../../Roboto-Regular-msdf.json");
      tecnologia.setAttribute("rotation", "-10 180 90");

      graphEntity.appendChild(bar);
      graphEntity.appendChild(numeroMenciones);
      graphEntity.appendChild(tecnologia);

      positionX -= barWidth + barSeparation; // Ajustar para la próxima barra
    });

    const existingGraph = document.getElementById("graph6");
    if (existingGraph) {
      scene.removeChild(existingGraph);
    }
    scene.appendChild(graphEntity);
  }
});