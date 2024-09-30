/* -----------------------------------------------
/* Author : Titanium Network
/* MIT license: http://opensource.org/licenses/MIT
/* ----------------------------------------------- */

const express = require('express');
const alloy = require('alloyproxy');
const app = express();
const http = require('http');
const fs = require('fs');
const path = require('path');

// Leer configuración desde el archivo config.json
const config = JSON.parse(fs.readFileSync('./config.json', { encoding: 'utf8' }));

const server = http.createServer(app);

// Configuración del proxy Alloy
const localprox = new alloy({
    prefix: '/prefix/', // Prefijo para las solicitudes a través del proxy
    error: (proxy) => {
        // Página de error si el proxy falla
        return proxy.res.send(fs.readFileSync(path.join(__dirname, 'public', 'error.html'), 'utf8'));
    },
    request: [], // Aquí puedes agregar manipulaciones de solicitudes si es necesario
    response: [], // Aquí puedes agregar manipulaciones de respuestas si es necesario
    injection: false // Desactivar la inyección por ahora para evitar posibles problemas
});

app.use(localprox.app);

// Manejar WebSocket a través del servidor HTTP
localprox.ws(server);

// Ruta principal
app.get('/', async (req, res) => {
    // Enviar el archivo HTML principal cuando se accede a la raíz del sitio
    res.send(fs.readFileSync(path.join(__dirname, 'public', 'index.html'), 'utf8'));
});

// Servir archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Escuchar en el puerto configurado (8080 por defecto)
server.listen(process.env.PORT || config.port, () => {
    console.log(`Servidor escuchando en el puerto ${process.env.PORT || config.port}`);
});
