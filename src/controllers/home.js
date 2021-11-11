const ctrl={};

const {User}=require('../models');
const {Publicacion}=require('../models');
const {Datos}=require('../models');
const {Image}=require('../models');
const passport=require('passport');


ctrl.principal=(req,res)=>{
    res.render('index');
};

ctrl.ingresar=(req,res)=>{
    res.render('users/signin');
};
ctrl.registro=(req,res)=>{
    res.render('users/signup');
};

ctrl.signup=async (req,res)=>{
    const {name,email,password,confirm_password}=req.body;
    const errors=[];
    if(name.length<=0){
        errors.push({text:'Por favor ingrese su nombre'});
    }if(email.length<=0){
        errors.push({text:'Por favor Ingrese su correo electronico'});
    }
    if(password!=confirm_password){
        errors.push({text:'Las contraseñas no coinciden'});
    }
    if(password.length<4){
        errors.push({text:'La contraseña debe ser mayor a 4 caracteres'});
    }
    if(errors.length>0){
        res.render('users/signup',{errors,name,email,password,confirm_password});
    }else{
        const emailUser=await User.findOne({email:email});
        if(emailUser){
           req.flash('error_msg','El email esta en uso');
           res.redirect('/users/signup');
        }
       const newUser=new User({name,email,password});
       newUser.password=await newUser.encryptPassword(password);
       await newUser.save();
       req.flash('success_msg','Tu estas registrado');
       res.redirect('/users/signin');
    }  
};


ctrl.autenticar=(passport.authenticate('local',{
    successRedirect:'/users/entrada',
    failureRedirect:'/users/signin',
    failureFlash:true
}));

ctrl.salir=(req,res)=>{
    req.logout();
    res.redirect('/');
};


//metodos para las publicaciones
//En caso de error cambiar en los metodos crearpubli y publicacionesuser cuerpo/entrada 
ctrl.crearpublic=(req,res)=>{
    res.render('cuerpo/publicaciones');
};
ctrl.publicacionesuser=async(req,res)=>{
    const {title,description}=req.body;
    const errors=[];
    if(!title){
        errors.push({text:'Por favor escriba el titulo'});
    }
    if(!description){
        errors.push({text:'Por favor escriba la descripción'});
    }
    if(errors.length>0){
        res.render('cuerpo/publicaciones',{
          errors,
          title,
          description  
        });
    }else{
        const newPublicacion=new Publicacion({title,description});
        newPublicacion.user=req.user.id;
        await newPublicacion.save();
        res.redirect('/users/publicacion'); 
    }    
};
ctrl.notapublicada=async(req,res)=>{
    const notepublicacion=await Publicacion.find({user:req.user.id}).sort({date:-1});
    res.render('cuerpo/publicaciones',{notepublicacion});
};

ctrl.eliminarpublicacion=async(req,res)=>{
 await Publicacion.findByIdAndDelete(req.params.id);
 res.redirect('/users/publicacion'); 
};


ctrl.contactos=async(req,res)=>{
    const amigos=await User.find();
    res.render('cuerpo/contactos',{amigos});
};

ctrl.recuperacion=(req,res)=>{
    res.render('users/recuperar');
};

ctrl.datos=async(req,res)=>{
    res.render('cuerpo/datos');
};

ctrl.informacion=async(req,res)=>{
    const {fechanacimiento,nacionalidad,telefono,detalles,sexo,universidad,carrera}=req.body;
    const errors=[];
    if(!fechanacimiento){
        errors.push({text:'Por favor Ingrese la fecha de nacimiento'});
    }
    if(!nacionalidad){
        errors.push({text:'Por favor Ingrese la nacionalidad'});
    }
    if(!telefono){
        errors.push({text:'Por favor Ingrese el telefono'});
    }
    if(!detalles){
        errors.push({text:'Por favor Ingrese los detalles'});
    }
    if(!sexo){
        errors.push({text:'Por favor Ingrese su sexo'});
    }
    if(errors.length>0){
        res.render('cuerpo/datos',{
            errors,
            fechanacimiento,
            nacionalidad,
            telefono,
            detalles,
            sexo,
            universidad,
            carrera
        });
    }else{
        const newInformacion=new Datos({fechanacimiento,nacionalidad,telefono,detalles,sexo,universidad,carrera});
         newInformacion.user=req.user.id;
        await newInformacion.save();
        res.redirect('/users/personal');
    }
    
};
ctrl.informacionpersonal=async(req,res)=>{
    const datospersonas=await Datos.find({user:req.user.id}).sort({date:-1});
    res.render('cuerpo/datos',{datospersonas});
};

//En caso de error eliminar toda la informacion ingresa en ese metodo 
//y dejar solo como un metodo normal y async


 ctrl.editar=async(req,res)=>{
    const informacionp= await Datos.findById(req.params.id);
    res.render('cuerpo/editar-informacion',{informacionp});
 };

 ctrl.editarinformacion=async(req,res)=>{
    const {fechanacimiento,nacionalidad,telefono,detalles,sexo,universidad,carrera}=req.body;
    await Datos.findByIdAndUpdate(req.params.id,{fechanacimiento,nacionalidad,telefono,detalles,sexo,universidad,carrera});  
    res.redirect('/users/personal');
 };

 /*Imagen de Perfil**/
ctrl.entrar =async (req, res) => {
    const imagespf= await Image.find({user: req.user.id}).sort({timestamp:-1});
    res.render('cuerpo/entrada',{imagespf});
  };
  
module.exports=ctrl;