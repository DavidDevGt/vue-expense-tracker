

#### Opción 1: Construir en el servidor
1. Subes todo el código a tu repositorio Git, excepto la carpeta `node_modules` y `dist/` (estas deben estar en tu `.gitignore`).
2. En el servidor, después de hacer `git pull`, corres `npm install` para instalar todas las dependencias de tu proyecto (esto se hace una vez después de cada pull si hay cambios en las dependencias).
3. Luego corres `npm run build` para construir la aplicación y generar la carpeta `dist/`.
4. Configuras tu servidor web (como Nginx o Apache) para servir los archivos estáticos desde la carpeta `dist/`.

