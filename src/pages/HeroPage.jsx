import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


const HeroPage = () => {
    const navigate = useNavigate();

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 1.2, ease: "easeOut" } // Ajustado para una transición más suave
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.5, ease: 'easeInOut' }
        }
    };

    const subtitleVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { delay: 1.5, duration: 0.8, ease: "easeOut" } // Aparece después del título principal
        }
    };

    const handleClick = () => {
        navigate('/login');
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center min-h-screen"
            style={{ backgroundColor: '#ff4700' }}
            onClick={handleClick}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
        >
            <motion.h1
                variants={textVariants}
                className="text-6xl text-white font-bold text-center cursor-pointer"
            >
                ¿Preparado para tu éxito laboral?
            </motion.h1>
            <motion.p
                variants={subtitleVariants}
                className="mt-2 text-white text-xl text-center cursor-pointer"
            >
                ¡Haz click!
            </motion.p>
        </motion.div>
    );
};

export default HeroPage;
