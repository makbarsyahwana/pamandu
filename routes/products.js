var express = require('express');
var Product = require('../models/products');
var router = express.Router();
var mongoose = require("mongoose");
var multer = require('multer');
var storage = multer.diskStorage({
	destination: function(req,file,cb){
		cb(null, 'public/uploads');
	},
	filename: function(req,file,cb){
		cb(null,Date.now() + file.originalname);
	}
});
var upload = multer({ storage: storage });
var fs = require("fs");
var imagePath = require('path').join(__dirname, 'public/uploads');
var conn = mongoose.connection;
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;


router.get('/createimg', function(req, res, next) {
	res.render( 'user/productupload', { title: "Image Upload" });
});

conn.once('open', function(){
	console.log('Connection Open-');
	router.post('/uploadimg', upload.single('file'), function(req, res, next) {
		console.log(req.file);
		var dirname = require('path').dirname(__dirname);
		var filename = req.file.originalname;
	 	var dir = req.file.path;
	 	var destination = req.file.destination;
	 	var type = req.file.mimetype;
	  
	 	var read_stream =  fs.createReadStream(dirname + '/' + dir);
		 

	 	

	 	var gfs = Grid(conn.db);
	  
	    var writestream = gfs.createWriteStream({
		 	filename: req.file.originalname,
	    	content_type: req.file.mimetype
	    });
	    read_stream.pipe(writestream);

	    req.assert('title', 'Not valid').notEmpty();
	    req.assert('description', 'Not Valid').notEmpty();
	    req.assert('price', 'Not Valid').notEmpty();
	    var errors = req.validationErrors();
	    res.redirect('/');    	
	 	
	});
});




module.exports = router;