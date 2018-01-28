'use strict';

const router = require('express').Router();
const Product = require('./../models/products');

router.get('/api/products', (req, res) => {

	const hostname = req.headers.host;
	
	Product.find({}).populate('source').then(products => {

		return products.map(product => {
			product.url = `${hostname}/${product.url}`;
			product.link = `${hostname}/api/products/${product._id}`;
			product.image = `${hostname}/public/img/${product.image}`;
			return product;
		});

	}).then(products => {

		res.json( products );
		
	}).catch(err => {

		res.json( err );
	});

});

router.get('/api/products/:id', (req, res) => {
	
	const _id = req.params.id;

	Product.findOne({ _id }).populate('source').then(product => {
	
		res.json( product );

	}).catch(err => {
		
		res.json( err )
	});
});

router.post('/api/products/:id', (req, res) => {

	const _id = req.params.id;

	Product.update({ _id }, req.body).then(result => {

		res.json(result);

	}).catch(err => {

		res.json(err);
	});

});

router.put('/api/products', (req, res) => {

	const product = new Product(req.body);

	product.save((err, result) => {

  		if (err) {
  			res.json(err);
  		} else {
  			res.json(result);
  		}

  	});

});

router.delete('/api/products/:id', (req, res) => {
	
	const _id = req.params.id;

	Product.remove({ _id }).then(product => {
	
		res.json( product );

	}).catch(err => {
		
		res.json( err )
	});
});

module.exports = router;