const mongoose=require('mongoose');
const {Schema}=mongoose;
const User=mongoose.model('User');

const DatosSchema=new Schema({
    fechanacimiento:{type:String},
    nacionalidad:{type:String},
    telefono:{type:String},
    detalles:{type:String},
    sexo:{type:String},
    imagen:{type:String},
    universidad:{type:String},
    carrera:{type:String},
    user:{type:String}
});

module.exports=mongoose.model('Datos',DatosSchema);