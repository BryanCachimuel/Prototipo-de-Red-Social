const helpers={};

/*
    Autenticación de usuarios
*/
helpers.isAthenticated=(req,res,next)=>{
    if(req.isAthenticated()){
        return next();
    }
    req.flash('error_msg','No Autorizado');
    res.redirect('/users/signin');
};  
module.exports=helpers;