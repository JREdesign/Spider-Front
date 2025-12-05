import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';

export default defineConfig(({ mode }) => {
  // Determina el archivo de entorno a cargar
  const envFile = mode === 'production' ? '.env.production' : '.env.development';
  dotenv.config({ path: envFile });

  return {
    plugins: [react()],
    server: {
      port: 4173
    },
    define: {
      'process.env': process.env
    }
  };
});
