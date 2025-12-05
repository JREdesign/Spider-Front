// OfertasXStacks.js
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".toggle-button2");
  const apiUrl = window.apiUrl; // Accede a la variable desde window


  buttons.forEach((button2) => {
    button2.addEventListener("click", function () {
      toggleGraph(button2);
    });
  });

  async function toggleGraph(button2) {
    const graph = document.getElementById("graph2");

    if (graph) {
      graph.parentNode.removeChild(graph);
      button2.setAttribute("src", "./textures/on.png");
      button2.setAttribute("data-status", "on");
    } else {
      await fetchAndRenderGraph();
      button2.setAttribute("src", "./textures/off.png");
      button2.setAttribute("data-status", "off");
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
        const technologiesCount = {};

        data.forEach((job) => {
          let locationKey = job.location
            ? job.location.toLowerCase()
            : "unknown";
          if (locationKey.includes("remoto") || locationKey.includes(",")) {
            locationKey = "remoto";
          }

          if (Array.isArray(job.technologies)) {
            job.technologies.forEach((tech) => {
              if (!technologiesCount[locationKey]) {
                technologiesCount[locationKey] = {};
              }
              technologiesCount[locationKey][tech] =
                (technologiesCount[locationKey][tech] || 0) + 1;
            });
          } else {
            console.warn("job.technologies is not an array", job.technologies);
          }
        });

        const techData = {};
        for (const [location, techs] of Object.entries(technologiesCount)) {
          for (const [tech, count] of Object.entries(techs)) {
            if (!techData[tech]) {
              techData[tech] = 0;
            }
            techData[tech] += count;
          }
        }

        renderBarGraph(techData);
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
    graphEntity.setAttribute("id", "graph2");

    // Posiciona el gráfico en el centro del panel 2
    graphEntity.setAttribute("position", "0 1.5 -4.3");

    // Ordenar las tecnologías por el número de ofertas en orden descendente
    const sortedTechnologies = Object.entries(data)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10); // Limitar a las 10 tecnologías con más ofertas

    // Calcula el valor máximo de ofertas para ajustar la altura de las barras
    const maxCount = Math.max(...sortedTechnologies.map(([_, count]) => count));

    // Ancho de cada barra
    const barWidth = 0.2;
    const barSeparation = 0.1; // Separación entre barras
    let positionX = -(
      (sortedTechnologies.length * (barWidth + barSeparation)) /
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

      const tecnologia = document.createElement("a-text");
      tecnologia.setAttribute("value", `${capitalizedTech}`);
      tecnologia.setAttribute("position", `${positionX} -0.5 -3`);
      tecnologia.setAttribute("width", "3");
      tecnologia.setAttribute("rotation", "-10 0 90");
      tecnologia.setAttribute("font", "../../Roboto-Regular-msdf.json");

      graphEntity.appendChild(bar);
      graphEntity.appendChild(numeroOfertas);
      graphEntity.appendChild(tecnologia);

      positionX += barWidth + barSeparation;
    });

    const existingGraph = document.getElementById("graph2");
    if (existingGraph) {
      scene.removeChild(existingGraph);
    }
    scene.appendChild(graphEntity);
  }
});