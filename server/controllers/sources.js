'use strict';

const router = require('express').Router();
const Sources = require('./../models/sources');
const uploader = require('./../helpers/uploader'); 

router.get('/api/sources', (req, res) => {

	const hostname = req.headers.host;
	
	Sources
		.find({ status : true })
		.then(sources => {

			res.json( sources );
			
		}).catch(err => {

			res.json( err );
		});

});

router.get('/api/sources/:id', (req, res) => {
	
	const _id = req.params.id;

	Sources
		.findOne({ _id })
		.then(source => {
	
			res.json( source );

		}).catch(err => {
			
			res.json( err )
		});
});

router.post('/api/sources/:id', (req, res) => {

	const _id = req.params.id;

	Sources
		.update({ _id }, req.body)
		.then(result => {

			res.json(result);

		}).catch(err => {

			res.json(err);
		});

});

router.put('/api/sources', (req, res) => {

	const source = new Sources(req.body);

	const image = req.files.image;
	const dir = req.app.settings.__dirname;
	const hostname = `${req.protocol}://${req.headers.host}`;

	uploader(dir, source._id, image)
		.then(filename => {
			source.image = `${hostname}/${filename}`;
			return source;		
		})
		.then(source => source.save())
		.then(result => res.json(source))
		.catch(err => res.json(err));
});

router.delete('/api/sources/:id', (req, res) => {
	
	const _id = req.params.id;

	Sources
		.remove({ _id })
		.then(source => {
	
			res.json( source );

		}).catch(err => {
			
			res.json( err )
		});
});

module.exports = router;