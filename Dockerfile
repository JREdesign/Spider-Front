# syntax=docker/dockerfile:1
ARG NODE_VERSION=21.5.0

FROM node:${NODE_VERSION}-alpine as base

WORKDIR /usr/src/app

# Instalar dependencias solo de producción
FROM base as deps
COPY package.json package-lock.json ./
RUN npm ci 

# Construir la aplicación
FROM base as build
COPY . .
RUN npm ci
RUN npm run build

# Configurar la imagen final para ejecutar la aplicación
FROM base as final

# Establecer las variables de entorno para producción
ENV NODE_ENV=production

COPY package*.json ./
RUN npm install

USER node

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

EXPOSE 4173

CMD ["npm", "run", "preview"]
