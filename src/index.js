const express=require('express');
const config=require('./server/config');

// nuevas dependencias utilizadas para el chat
const http=require('http');
const socketio=require('socket.io');

//Base ded Datos
require('./database');

const app=config(express());
const server=http.createServer(app);
const io=socketio.listen(server);

require('./sockets')(io);

//Iniciando el servidor
server.listen(app.get('port'),()=>{
    console.log('Servidor en el puerto',app.get('port'));
});