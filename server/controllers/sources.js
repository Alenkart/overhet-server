'use strict';

const router = require('express').Router();
const Sources = require('./../models/sources');

router.get('/api/sources', (req, res) => {

	const hostname = req.headers.host;
	
	Sources.find({}).then(source => {

		return source.map(source => {
			source.image = `${hostname}/public/img/${source.image}`;
			return source;
		});

	}).then(sources => {

		res.json( sources );
		
	}).catch(err => {

		res.json( err );
	});

});

router.get('/api/sources/:id', (req, res) => {
	
	const _id = req.params.id;

	Sources.findOne({ _id }).then(source => {
	
		res.json( source );

	}).catch(err => {
		
		res.json( err )
	});
});

router.post('/api/sources/:id', (req, res) => {

	const _id = req.params.id;

	Sources.update({ _id }, req.body).then(result => {

		res.json(result);

	}).catch(err => {

		res.json(err);
	});

});

router.put('/api/sources', (req, res) => {

	const source = new Sources(req.body);

	source.save(err  => {
  		if (err) return res.send(err);
  	});

});

router.delete('/api/sources/:id', (req, res) => {
	
	const _id = req.params.id;

	Sources.remove({ _id }).then(source => {
	
		res.json( source );

	}).catch(err => {
		
		res.json( err )
	});
});

module.exports = router;