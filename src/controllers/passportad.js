const passport=require('passport');
const Estrategialocal=require('passport-local').Strategy;
const Admin=require('../models/administrador');

passport.use(new Estrategialocal({
    usernameField:'email'
},async(email,password,done)=>{
  const admin=await Admin.findOne({email:email});
  if(!admin){
      return done(null,false,{message:'Usuario no encontrado'});
  }else{
   const match= await Admin.matchPassword(password);
   if(match){
      return done(null,admin); 
   }else{
       return done(null,false,{message:'Contraseña incorrecta'});
   }
  }
}));

passport.serializeUser((admin,done)=>{
   done(null,admin.id);
});

passport.deserializeUser((id,done)=>{
    Admin.findById(id,(err,admin)=>{
        done(err,admin);
    });
});

