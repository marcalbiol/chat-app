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

    socket.on('username', (username) => {
        console.log(`Username conectado: ${username}`);
    });

    socket.on('changeName', (username) => {
        console.log(`Nombre cambiado a: ${username}`);
    });

    socket.on('disconnect', () => {
        console.log('user has discon');
    });

    socket.on('nadie', () => {
        console.log('nadie');
    });

    socket.on('mensaje', (mensaje, username) => {
        console.log(`Mensaje recibido de ${username}: ${mensaje}`);
        io.emit('mensaje', mensaje);
    });
});

server.listen(3000, () => {
    console.log('escuchando en el puerto 3000');
});
