import './css/cardjob.css';

const JobFluent = () => {
  return (
  
    <div className="container containerPortals">
      <div className="cardPortals">
        <div className="front">
          <div className="front-heading">
            <img className="w-60 rounded-full" src="public/jobportals/jobfluent3d.png" alt="JobFluent logo" />
          </div>
          <p className='text-gray800 font-bold'>JOBFLUENT</p>
        </div>
        <div className="back p-4 md:p-8">
          <p className="text-gray800 text-base sm:text-sm md:text-md lg:text-lg">
            JobFluent es una plataforma enfocada en startups tecnológicas, ayudando a profesionales a encontrar oportunidades laborales en empresas innovadoras y en crecimiento.
          </p>
          <a href="https://www.jobfluent.com" target="_blank" className="text-grey700 hover:underline decoration-4 hover:text-white text-sm sm:text-base md:text-lg lg:text-xl font-semibold">
            Click para ver más...
          </a>
        </div>
      </div>
    </div>
  );
};

export default JobFluent;
