const config = require('../config/database');
const mysql = require('mysql');
var multer  =   require('multer');
var path = require('path');
const mongoose = require('mongoose');
const Category_schema = require('./category_schemas');
const Product_schema = require('./product_schemas');
const Gallery_schema = require('./gallery_schemas');
const Website_schema = require('./website_schemas');
'use strict';
var nodemailer = require('nodemailer');
var mandrillTransport = require('nodemailer-mandrill-transport');

//multer
var filename_path;
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },

  filename: function (req, file, callback) {
    //console.log(req);
    filename_path=file.fieldname + '-' + Date.now()+path.extname(file.originalname);
    callback(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));
  }
});

var upload = multer({ storage : storage}).single('image');
var multiple_upload = multer({ storage : storage}).array('image');
var website_upload = multer({ storage : storage}).single('image');
//adding items

const Add_Items={
  SendEmail:function(req,res, callback){
    upload(req,res,function(err) {

      var transporter = nodemailer.createTransport({
        service: 'Mandrill',
        auth: {
            user: 'visitor@my-lobby.com',
            pass: '3ir5SGJw5CAasaezUl4p_w'
        },
        logger: true, // log to console
        debug: true // include SMTP traffic in the logs
    }, {
        from: 'VisionTrucking <no-reply@my-lobby.com>'
    });
    //    let transporter = nodemailer.createTransport({
    //     host: 'smtp.sparkpostmail.com',
    //     port: 587,
    //     secure: false, // true for 465, false for other ports
    //     auth: {
    //         user: 'SMTP_Injection', // generated ethereal user
    //         pass: 'ce53f619533087d4cdc0b3acf0f578d2fc46d2ae' // generated ethereal password
    //     }
    // });
    // var transport = nodemailer.createTransport(mandrillTransport({
    //   auth: {
    //     apiKey:  'rqwSXKYWhH7J3VlW2_FHRA'
    //   }
    // }));
    var attachments_array=[];
    for(var i=0; i<req.body.length; i++)
    {
      attachments_array[i] = {filename:'image'+[i]+'.png',path:'./uploads/'+req.body[i].url};  
    }
    console.log(attachments_array);

    var message = {
      to: req.body[0].email,
      subject: 'Your requested items',
      text: "Hi, kindly find attached the files you needed.",
      attachments:attachments_array
  };
  transporter.sendMail(message).then(info => {
    console.log('Server responded with "%s"', info.response);
}).catch(err => {
    console.log('Error occurred');
    console.log(err.message);
});
      // var mailOptions = {
      //   from: 'mo@my-media.tv',
      //   to: req.body[0].email,
      //   subject: 'Your requested items',
      //   text: "Hi, kindly find attached the files you needed.",
      //   attachments:attachments_array
      // };
      
      // Sending email.
      // transport.sendMail({
      //   from: 'mo@my-media.tv',
      //   to: 'alsarem111@gmail.com',
      //   subject: 'Hello',
      //   html: '<p>How are you?</p>'
      // }, function(err, info) {
      //   if (err) {
      //     console.error(err);
      //   } else {
      //     console.log(info);
      //   }
      // });


      // transporter.sendMail(mailOptions, function(error, info){
      //   if (error) {
      //     console.log(error);
      //   } else {
      //     console.log('Email sent: ' + info.response);
      //   }
      // });      
      console.log(req.body);

      callback();
    });
  },
  AddToCategories:function(req,res, callback){
    upload(req,res,function(err) {
    let newCategory = new Category_schema({
      item:req.body.category,
      file_path:req.file.originalname,
      filename_path:req.file.filename
    });
    console.log(req);
      newCategory.save( callback, function (err, docs) {
        if (err){
            return console.error(err);
        } else {
          console.log("Multiple documents inserted to Collection");
        }
      });
    });
  },
  AddToProducts:function(req, res, callback){
    upload(req,res,function(err) {
      let newProduct = new Product_schema({
        product_name:req.body.product,
        categorie:req.body.category,
        image:req.file.originalname,
        image_path:req.file.filename
      });

      newProduct.save( callback, function (err, docs) {
        if (err){
            return console.error(err);
        } else {
          console.log("Multiple documents inserted to Collection");
        }
      });

    });
  },
  AddToGallery:function(req, res, callback){

    multiple_upload(req,res,function(err) {
      console.log(req);
      var id=req.body.id;
      var category=req.body.category;
      var org_name=[];
      var file_name=[];

      for(var i=0; i<req.files.length; i++)
      {
        org_name[i] = req.files[i].originalname;
        file_name[i] = req.files[i].filename;
        let newImage = new Gallery_schema({
          id:id,
          href:org_name[i],
          src:file_name[i],
          type:'img',
          title:'',
          description:'',
          category:category
        });

        newImage.save(function (err, docs) {
          if (err){
              return console.error(err);
          } else {
            console.log("Multiple documents inserted to Collection");
          }
        });
      }

        console.log('File uploaded');
        res.end("File is uploaded");

    });

  },
  AddVideoToGallery:function(req, res, callback){
        multiple_upload(req,res,function(err) {
    console.log("adding Video");

    var id = req.body.id;
    var link = req.body.link;
    var desc = req.body.desc;
    var category = req.body.category;
    let newVideo = new Gallery_schema({
      id:id,
      href:link,
      src:link,
      type:'youtube',
      title:desc,
      description:desc,
      category:category
    });

    var data = {
    "Data":""
    };

    newVideo.save(function (err, docs) {
      if (err){
          return console.error(err);
      } else {
        res.json(data);
      }
    });

       });
  },
  AddWebsite:function(req, res, callback){
      website_upload(req,res,function(err) {
    console.log("adding Website");
    console.log(req);
    let newWebsite = new Website_schema({
      Website:req.body.website,
      sitename:req.body.sitename,
      image:req.file.originalname,
      image_path:req.file.filename
    });

    var data = {
    "Data":""
    };

    newWebsite.save(function (err, docs) {
      if (err){
          return console.error(err);
      } else {
        res.json(data);
      }
    });

    });
  }
};


module.exports=Add_Items;
