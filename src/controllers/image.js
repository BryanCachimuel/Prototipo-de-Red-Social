const path = require('path');
const { randomNumber } = require('../helpers/libs')
const fs = require('fs-extra');
const { Image } = require('../models');
const { Comentario } = require('../models')
const {Datos}=require('../models')

const md5 = require('md5');

const ctrl = {};

ctrl.index = async (req, res) => {
  const image = await Image.findOne({ filename: { $regex: req.params.image_id } });
  if (image) {
    image.views = image.views + 1;
    await image.save();
    const comment = await Comentario.find({ image_id: image._id });
    res.render('img/image', { image, comment });
  } else {
    res.redirect('/vista');
  }
};

ctrl.create = (req, res) => {

  const saveImage = async () => {

    const imgUrl = randomNumber();
    const images = await Image.find({ filename: imgUrl });
    if (images.length > 0) {
      saveImage();
    } else {
      console.log(imgUrl);
      const imageTempPath = req.file.path;
      const ext = path.extname(req.file.originalname).toLowerCase();
      const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);
      if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
        await fs.rename(imageTempPath, targetPath);
        const newImg = new Image({
          title: req.body.title,
          filename: imgUrl + ext,
          description: req.body.description
        });
        newImg.user = req.user.id;
        await newImg.save();
        res.redirect('/images/' + imgUrl);

      } else {
        await fs.unlink(imageTempPath)
        res.status(500).json({ error: 'Solo imagenes permitidas' });
      }
    }
  };
  saveImage();
};


ctrl.vistaimagen = async (req, res) => {
  const images = await Image.find({ user: req.user.id }).sort({ timestamp: -1 });
  res.render('img/index2', { images });
};


ctrl.like = async (req, res) => {
  const image = await Image.findOne({ filename: { $regex: req.params.image_id } });
  if (image) {
    image.likes = image.likes + 1;
    await image.save();
    res.json({ likes: image.likes });
  } else {
    res.status(500).json({ error: 'Internal Error' });
  }
};


ctrl.comment = async (req, res) => {
  const image = await Image.findOne({ filename: { $regex: req.params.image_id } });
  if (image) {
    const newComentario = new Comentario(req.body);
    newComentario.gravatar = md5(newComentario.email);
    newComentario.image_id = image._id;
    await newComentario.save();
    res.redirect('/images/' + image.uniqueId);
  } else {
    res.redirect('/vista');
  }
};

ctrl.remove = async (req, res) => {
  const image = await Image.findOne({ filename: { $regex: req.params.image_id } });
  if (image) {
    await fs.unlink(path.resolve('./src/public/upload/' + image.filename));
    await Comentario.deleteOne({ image_id: image._id });
    await image.remove();
    res.json(true);
  }
};


ctrl.datos=async(req,res)=>{
  const verdatos=await Datos.find({user:req.user.id}).sort({date:-1});
  res.render('cuerpo/entrada',{verdatos});
};



module.exports = ctrl;