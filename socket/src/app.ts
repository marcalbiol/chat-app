const express = require('express');
const app = express();
const http = require('http');

const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: ['http://localhost:4200', 'http://localhost:3000']
    }
});

interface Chat {
    id: number;
    name: string | unknown;
    messages: string[];
}

const chats: Chat[] = []


io.on('connection', (socket) => {

    console.log(`Chats: ${chats.length}`)

    socket.on('username', (username) => {
        console.log(`Username conectado: ${username}`);
    });

    socket.on('changeName', (username) => {
        console.log(`Nombre cambiado a: ${username}`);
    });

    socket.on('disconnect', () => {
        console.log('user has discon');
    });

    socket.on('create-room', (room) => {
        const newChat: Chat = {
            name: room,
            id: chats.length + 1,
            messages: []
        };
        socket.join(newChat)
        chats.push(newChat);
        socket.emit('chat-list', chats);
    });


    socket.on('mensaje', (chatId, message) => {
        const chat = chats.find(c => c.id === chatId);
        if (chat) {
            chat.messages.push(message);
            io.to(chat.name).emit('message', message);
        } else {
            console.log('chat no encontrado');
        }
    });
});


server.listen(3000, () => {
    console.log('escuchando en el puerto 3000');
});
