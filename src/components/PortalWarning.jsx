import PropTypes from 'prop-types'; // Importa PropTypes

const PortalWarning = ({ close }) => {
  return (
    <div className="fixed inset-0 z-30 bg-gray-600 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white bg-opacity- p-5 rounded-lg max-w-md mx-auto border-4 border-orange">
        <h2 className="font-bold text-lg">Aviso Importante a los Usuarios del Portal Rastreador de Empleo de Factoría F5</h2>
        <p className="mt-4">
          Queremos informarles que las ofertas de empleo mostradas en este portal no son publicadas directamente por Factoría F5. Estas ofertas son extraídas automáticamente de diversos portales de empleo, que son los verdaderos responsables de su publicación y actualización.
        </p>
        <p className="mt-2">
          Factoría F5 no tiene participación en la creación, verificación ni gestión de las ofertas de empleo y, por tanto, no puede garantizar la precisión, validez ni la actualidad de la información contenida en las mismas. Cualquier error o problema relacionado con las ofertas debe ser dirigido directamente a los portales de origen.
        </p>
        <p className="mt-2">
          Por lo anterior, Factoría F5 se exime de cualquier responsabilidad legal o de otro tipo relacionada con el contenido de las ofertas de empleo. Les recomendamos verificar toda la información relevante y ejercer discreción al postularse a cualquier oferta de trabajo.
        </p>
        <p className="mt-4 font-semibold">Gracias por su atención y comprensión.</p>
        <button className="mt-4 bg-orange hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={close}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

// Añade PropTypes
PortalWarning.propTypes = {
  close: PropTypes.func.isRequired
};

export default PortalWarning;
