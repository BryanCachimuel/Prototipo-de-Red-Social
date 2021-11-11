const express=require('express');
const router=express.Router();

const home=require('../controllers/home');
const image=require('../controllers/image');
const speak=require('../controllers/chat');
const {isAthenticated}=require('../helpers/auth');



//en estas rutas se a usado la autenticación
module.exports=app=>{
    router.get('/',home.principal);
    router.get('/vista',image.vistaimagen,isAthenticated);
    router.post('/images',image.create,isAthenticated);
    router.get('/images/:image_id',image.index,isAthenticated);
    router.post('/images/:image_id/like',image.like,isAthenticated);
    router.post('/images/:image_id/comment',image.comment,isAthenticated);
    router.delete('/images/:image_id',image.remove,isAthenticated);

   //ruta de imagen de perfil 
   router.get('/users/entrada',home.entrar);

    
    //rutas para el usuario
    router.get('/users/signin',home.ingresar);
    router.get('/users/signup',home.registro);
    router.post('/users/signup',home.signup);
    router.post('/users/signin',home.autenticar);
    router.get('/users/logout',home.salir);

  
    
   //Ruta para acceder para ver todos los usuarios registrados
    router.get('/users/contactos',home.contactos);
    
    //Recuperar contraseña
    router.get('/users/recuperar',home.recuperacion);


    //rutas para crear el crud de las publicaciones
    router.get('/users/publicaciones',home.crearpublic);
    router.post('/users/newpublicacion',home.publicacionesuser);
    router.get('/users/publicacion',home.notapublicada);
    router.delete('/users/delete/:id',home.eliminarpublicacion);


    //rutas para la informacion de los usuarios

    router.get('/users/informacion',home.datos);
    router.post('/users/info',home.informacion);
    router.get('/users/personal',home.informacionpersonal);
    router.get('/users/editar/:id',home.editar);
    router.put('/users/editar/:id',home.editarinformacion);

   


    //Ruta para el chat
    router.get('/users/chat',speak.conversa);
 



  app.use(router);
};




