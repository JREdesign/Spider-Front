document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".toggle-button5");
  const apiUrl = window.apiUrl; // Accede a la variable desde window

  buttons.forEach((button5) => {
    button5.addEventListener("click", function () {
      toggleGraph(button5);
    });
  });

  async function toggleGraph(button5) {
    const graph = document.getElementById("graph5");

    if (graph) {
      graph.parentNode.removeChild(graph);
      button5.setAttribute("src", "./textures/on.png");
      button5.setAttribute("data-status", "on");
    } else {
      await fetchAndRenderGraph();
      button5.setAttribute("src", "./textures/off.png");
      button5.setAttribute("data-status", "off");
    }
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function capitalizeWords(string) {
    return string.split(" ").map(capitalizeFirstLetter).join(" ");
  }

  async function fetchAndRenderGraph() {
    const URI = `${apiUrl}/jobs/`;
    try {
      const response = await fetch(URI);
      if (response.status === 200) {
        const data = await response.json();
        const companiesCount = {};

        data.forEach((job) => {
          const companyKey = job.company.toLowerCase();
          companiesCount[companyKey] = (companiesCount[companyKey] || 0) + 1;
        });

        renderBarGraph(companiesCount);
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
    graphEntity.setAttribute("id", "graph5");

    // Posiciona el gráfico en el centro del panel 1
    graphEntity.setAttribute("position", "0 1.5 10.3");

    // Ordenar las empresas por el número de ofertas en orden descendente
    const sortedCompanies = Object.entries(data)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10); // Limitar a las 10 empresas con más ofertas

    // Calcula el valor máximo de ofertas para ajustar la altura de las barras
    const maxCount = Math.max(...sortedCompanies.map(([_, count]) => count));

    // Ancho de cada barra
    const barWidth = 0.2;
    const barSeparation = 0.1; // Separación entre barras
    let positionX =
      -(((sortedCompanies.length - 1) * (barWidth + barSeparation)) / 2); // Ajustar la posición inicial para centrado

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

    sortedCompanies.forEach(([company, count], index) => {
      const capitalizedCompany = capitalizeWords(company);
      const height = (count / maxCount) * 1.5; // Normaliza la altura
      const color = colors[index % colors.length];

      const bar = document.createElement("a-box");
      bar.setAttribute("position", `${-positionX} 0 -3`); // Invertir la posición X
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
        `property: position; to: ${-positionX} ${
          height / 2
        } -3; dur: 1500; easing: linear`
      );

      const numeroOfertas = document.createElement("a-text");
      numeroOfertas.setAttribute("value", `${count}`);
      numeroOfertas.setAttribute("position", `${-positionX} 0.1 -3`); // Invertir la posición X
      numeroOfertas.setAttribute("align", "center");
      numeroOfertas.setAttribute("width", "4");
      numeroOfertas.setAttribute("rotation", "0 180 0");
      numeroOfertas.setAttribute(
        "animation__position",
        `property: position; to: ${-positionX} ${
          height + 0.1
        } -3; dur: 1500; easing: linear`
      );

      const empresa = document.createElement("a-text");
      empresa.setAttribute("value", `${capitalizedCompany}`);
      empresa.setAttribute("position", `${-positionX} -0.5 -3`); // Invertir la posición X
      empresa.setAttribute("width", "3");
      empresa.setAttribute("font", "../../Roboto-Regular-msdf.json");
      empresa.setAttribute("rotation", "-10 180 90");

      graphEntity.appendChild(bar);
      graphEntity.appendChild(numeroOfertas);
      graphEntity.appendChild(empresa);

      positionX += barWidth + barSeparation; // Ajustar para la próxima barra (inversamente)
    });

    const existingGraph = document.getElementById("graph5");
    if (existingGraph) {
      scene.removeChild(existingGraph);
    }
    scene.appendChild(graphEntity);
  }
});