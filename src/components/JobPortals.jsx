import Te from './Te';
import TicJob from './TicJob';
import JobFluent from './JobFluent';

const JobPortals = () => {
  return (
    <div className="containerPortals  mx-auto px-4 py-18 w-full h-120 ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-18 bg-gradient-to-b from-orange to-orange400 dark:bg-gray700 rounded-xl p-10 shadow-lg container mx-auto">
        <Te />
        <TicJob />
        <JobFluent />
      </div>
    </div>
  );
};

export default JobPortals;
