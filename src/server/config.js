const path=require('path');
const exphbs=require('express-handlebars');
const morgan=require('morgan');
const multer=require('multer');
const express=require('express');
const errorHandler=require('errorhandler');
const session=require('express-session');


const flash=require('connect-flash');
const passport=require('passport');

require('../controllers/passport');


//Otras dependencias
const methodOverride=require('method-override');

//Inicalizamos
//const app=express();

const routes=require('../routes/index');


module.exports=app=>{

//Settings
app.set('port',process.env.PORT ||3001);
app.set('views',path.join(__dirname,'../views'));
app.engine('.hbs',exphbs({
    defaultLayout:'main',
    layoutsDir:path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname:'.hbs',
    helpers:require('./helpers')
}));
app.set('view engine','.hbs');

//middlewares
app.use(morgan('dev'));
app.use(multer({dest:path.join(__dirname,'../public/upload/temp')}).single('image'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Middlewares del otro proyecto
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//Variables locales donde todas las variables pueden 
//ser accedidas
app.use((req,res,next)=>{
   res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error=req.flash('error');
    res.locals.user=req.user||null;
    next();
});

//routes
routes(app);
//routes2(app);
//app.use(require('../routes/img'));

//archivos estaticos
app.use('/public',express.static(path.join(__dirname,'../public')));

//errorhandlers
if('development'===app.get('env')){
    app.use(errorHandler);
}


return app;
}