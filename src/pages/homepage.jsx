import Hero from "../components/Hero";
import Footer from "../components/Footer";
import FetchJobs from "../components/showjobs/FetchJobs";
import { FilterProvider } from "../context/FilterContext";
import InmersiveMap from "../components/inmersivemap/InmersiveMap";
import Contact from "../components/Contact";
import StatsAframe from "../components/stats/StatsAframe";
import FloatingChatIcon from "../components/FloatingChatIcon";
import EmploymentMap from "../components/EmploymentMap";
import Stats from "../components/Stats";
import JobPortals from "../components/JobPortals";
import Portals from "../components/Portals";

export default function Homepage() {
  return (
    <>
      <Hero />
      <FilterProvider>
        <FetchJobs />
      </FilterProvider>
      <section id="mapa-empleo">
        <EmploymentMap />
        <InmersiveMap />
      </section>
      <section id="datos-estadisticos">
        <Stats />
        <StatsAframe />
      </section>
      <section id="portales-rastreados">
        <Portals />
        <JobPortals />
      </section>

      <section id="contacto">
        <Contact />
      </section>
      <FloatingChatIcon />
      <Footer />
    </>
  );
}
