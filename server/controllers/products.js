'use strict';

const router = require('express').Router();
const Product = require('./../models/products');
const uploader = require('./../helpers/uploader'); 

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

	const image = req.files.image;
	const dir = req.app.settings.__dirname;

	uploader(dir, product._id, image)
		.then(filename => {
			product.image = filename;
			return product;		
		})
		.then(product => product.save())
		.then(result => res.json(product))
		.catch(err => res.json(err));

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