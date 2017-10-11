var Product = require('../models/products');

var mongoose = require('mongoose');

mongoose.connect('mongodb://makbarsyahwana:nrgm4113412s@ds143900.mlab.com:43900/pamandu');

var products = [
	new Product({
		imagePath: 'https://storage.googleapis.com/imgfave/image_cache/1348936653486243.jpg',
		title: 'Europe',
		description: 'Great Travel Guide',
		price: 500000
	}),
	new Product({
		imagePath: 'https://storage.googleapis.com/imgfave/image_cache/1348936653486243.jpg',
		title: 'Asia',
		description: 'Fun, Chill and Awesome',
		price: 250000
	}),
	new Product({
		imagePath: 'https://storage.googleapis.com/imgfave/image_cache/1348936653486243.jpg',
		title: 'America',
		description: 'Great Travel Guide',
		price: 750000
	}),
	new Product({
		imagePath: 'https://storage.googleapis.com/imgfave/image_cache/1348936653486243.jpg',
		title: 'America',
		description: 'Great Travel Guide',
		price: 750000
	})

];

for (var i = 0; i < products.length; i++) {
	products[i].save(function(err, result) {
		done++;
		if (done === products.length) {
			exit();
		}
	});
}

function exit() {
	mongoose.disconnect();
}