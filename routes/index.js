var express = require('express');
var router = express.Router();
var Product = require('../models/products');
var Cart = require('../models/cart');

/* GET home page. */
router.get('/', function(req, res, next) {
	Product.find(function(err, docs) {
		var productsChunks = [];
		var chunkSize = 3;
		for (var i = 0; i < docs.length; i += chunkSize) {
			productsChunks.push(docs.slice(i, i + chunkSize));
		}
		res.render('index', { title: 'Express', products: productsChunks });
	});
});

router.get('/:title', function(req, res, next) {
	Product.findOne({ "title": req.params.title }, function(err, doc) {
		if (err) throw err;
		res.render('layouts/trip', { product: doc });
	});
});

router.post('/add-to-cart/:id', function(req, res, next) {
	var productId = req.params.id;
	var cart = new Cart(req.session.cart ? req.session.cart : {});

	Product.findById(productId, function(err, product) {
		if (err) {
			return res.redirect('/');
		}
		cart.add(product, product.id);
		req.session.cart = cart;
		console.log(req.session.cart);
		res.redirect('back');
	});
});

router.get('/cart', function(req, res, next) {
	if (!req.session.cart) {
		return res.render('shoppingcart', { products: null });
	}
	var cart = new Cart(req.session.cart);
	res.render('shoppingcart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});



module.exports = router;
