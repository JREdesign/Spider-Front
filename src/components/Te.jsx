import './css/cardjob.css';

const Te = () => {
  return (
    <div className="container containerPortals">
      <div className="cardPortals ">
        <div className="front">
          <div className="front-heading">
            <img className="w-60 rounded-full" src="../jobportals/logo-te.png" alt="JobFluent logo" />
          </div>
          <p className='text-gray800 font-bold'>TECNOEMPLEO</p>
        </div>
        <div className="back p-4 md:p-8">
          <p className="text-gray800 text-base sm:text-sm md:text-md lg:text-lg">
            Tecnoempleo es una plataforma líder en ofertas de empleo tecnológico, conectando profesionales con empresas del sector IT y telecomunicaciones en España.</p>
          <a href="https://www.jobfluent.com" target="_blank" className="text-grey700 hover:underline decoration-4 hover:text-white text-sm sm:text-base md:text-lg lg:text-xl font-semibold">
            Click para ver más...
          </a>
        </div>
      </div>
    </div>
  );
};

export default Te;
