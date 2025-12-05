import { useState } from 'react';
import { useLocation } from 'react-router-dom';


function Hero() {
    const [showWarning, setShowWarning] = useState(false);
    const location = useLocation();

    return (
        <div>
            <div className="relative overflow-hidden bg-orange dark:bg-gray shadow-lg rounded-lg container mx-auto">
                <video 
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
                    src="/multimedia-1-home-factoriaf5-web_UJHvoRbY.mp4"
                >
                    <source src="/multimedia-1-home-factoriaf5-web_UJHvoRbY.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="relative z-10 text-white p-8">
                    <h1 className="text-3xl font-bold">Bienvenido al Rastreador de Empleo de Factoría F5</h1>
                    <p className="mt-4 text-lg">Conectando tu talento con oportunidades reales</p>
                </div>
            </div>
        </div>
    );
}

export default Hero;



