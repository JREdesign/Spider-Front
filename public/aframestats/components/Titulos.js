AFRAME.registerComponent("text-animation", {
    schema: {
      text: { type: "string" },
    },
    init: function () {
      const el = this.el;
      const text = this.data.text;
      const letterEntities = [];
      const words = text.split(" "); // Separar el texto en palabras
      const letterSpacing = 0.18; // Espaciado entre letras
      const wordSpacing = 0.3; // Espaciado entre palabras
      let positionX = 0; // Posición inicial
  
      // Crear una entidad para cada letra y gestionar espacios entre palabras
      words.forEach((word, wordIndex) => {
        for (let i = 0; i < word.length; i++) {
          const letter = document.createElement("a-entity");
          letter.setAttribute("text", {
            value: word[i],
            align: "center",
            font: "../Roboto-Regular-msdf.json",
            color: "#ff4700",
            width: 8,
          });
          letter.setAttribute("position", { x: positionX, y: 0, z: 0 });
          el.appendChild(letter);
          letterEntities.push(letter);
          positionX += letterSpacing; // Avanzar para la próxima letra
        }
        // Añadir espacio extra entre palabras
        if (wordIndex < words.length - 1) {
          positionX += wordSpacing;
        }
      });
  
      this.letterEntities = letterEntities;
      this.startPositionX = positionX; // Guardar la posición inicial para reiniciar
    },
    tick: function (time, timeDelta) {
      const speed = 0.0005 * timeDelta;
      const letterEntities = this.letterEntities;
  
      // Mover las letras de derecha a izquierda
      letterEntities.forEach((letter) => {
        const position = letter.getAttribute("position");
        position.x -= speed;
        letter.setAttribute("position", position);
  
        // Mostrar solo letras dentro del rango x > -3.7 && x < -0.8
        if (position.x > -3.33 && position.x < -0.7) {
          letter.setAttribute("visible", true);
        } else {
          letter.setAttribute("visible", false);
        }
  
        // Reiniciar la posición si la letra sale del rango -3.7 a 3
        if (position.x < -3.7) {
          position.x += this.startPositionX + 3; // Reiniciar posición
        }
      });
    },
  });