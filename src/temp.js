const express=require('express');
const config=require('./server/config')

//Base ded Datos
require('./database');

const app=config(express());

//Iniciando el servidor
app.listen(app.get('port'),()=>{
    console.log('Servidor en el puerto',app.get('port'));
});