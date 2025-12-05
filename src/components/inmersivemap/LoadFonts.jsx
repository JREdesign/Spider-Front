const LoadFonts = async () => {
  try {
    const fontResponse = await fetch("./fonts/Poppins_Regular.json");
    const fontResponseBold = await fetch("./fonts/Poppins_Bold.json");

    if (!fontResponse.ok || !fontResponseBold.ok) {
      throw new Error("Error al cargar el archivo JSON");
    }

    const fontData = await fontResponse.json();
    const fontDataBold = await fontResponseBold.json();

    return { fontData, fontDataBold }; // Devolver los datos de las fuentes cargadas
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default LoadFonts;