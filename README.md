# El Ingeniero Loco - Sistemas Inteligentes

Este proyecto está listo para ser desplegado en tu VPS usando Docker.

## Instrucciones de Despliegue

1. **Clona el repositorio** en tu VPS.
2. **Configura las variables de entorno**:
   Crea un archivo `.env` en la raíz del proyecto con tu API Key de Gemini:
   ```env
   GEMINI_API_KEY=tu_api_key_aqui
   ```
3. **Levanta el contenedor con Docker Compose**:
   ```bash
   docker-compose up -d --build
   ```
   El sistema estará disponible en el puerto **7001**.

## Estructura del Proyecto

- `Dockerfile`: Configuración de imagen multi-etapa para un despliegue liviano.
- `docker-compose.yml`: Orquestación simple para levantar el servicio.
- `server.ts`: Servidor Express que sirve el frontend y maneja la API.
- `src/`: Código fuente del frontend (React + Vite + Tailwind).

## Notas Técnicas

- El puerto por defecto en Docker es el **7001**, como solicitaste.
- Se utiliza `node:20-alpine` para minimizar el tamaño de la imagen.
- El CMS utiliza `localStorage`, por lo que los cambios se guardan en el navegador del cliente.
