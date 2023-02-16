const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: ['http://localhost:4200', 'http://localhost:3000']
    }
});

io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');

    socket.on('disconnect', () => {
        console.log('El usuario se ha desconectado');
    });

    socket.on('mensaje', (mensaje) => {
        console.log(`Mensaje recibido: ${mensaje}`);
        io.emit('mensaje', mensaje);
    });
});

server.listen(3000, () => {
    console.log('Servidor de Socket.IO escuchando en el puerto 3000');
});
