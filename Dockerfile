# Usa una imagen de Node.js como base
FROM node:latest

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia los archivos necesarios
COPY . .
COPY --from=bank /banco/ingresos.csv /manager/public/ingresos.csv


# Instala las dependencias
RUN npm install
RUN npm install chart.js

# Construye la aplicación React para producción
RUN npm run build


# Expone el puerto 80
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
