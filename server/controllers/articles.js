'use strict';

const router = require('express').Router();
const Articles = require('./../models/articles');
const uploader = require('./../helpers/uploader'); 

router.get('/api/articles', (req, res) => {

	const hostname = req.headers.host;
	
	Articles.find({}).populate('source').then(articles => {

		res.json( articles );
		
	}).catch(err => {

		res.json( err );
	});

});

router.get('/api/articles/:id', (req, res) => {
	
	const _id = req.params.id;

	Articles.findOne({ _id }).populate('source').then(Articles => {
	
		res.json( Articles );

	}).catch(err => {
		
		res.json( err )
	});
});

router.post('/api/articles/:id', (req, res) => {

	const _id = req.params.id;

	Articles.update({ _id }, req.body).then(result => {

		res.json(result);

	}).catch(err => {

		res.json(err);
	});

});

router.put('/api/articles', (req, res) => {

	const article = new Articles(req.body);

	const image = req.files.image;
	const dir = req.app.settings.__dirname;

	uploader(dir, article._id, image)
		.then(filename => {
			article.image = filename;
			return article;		
		})
		.then(article => article.save())
		.then(result => res.json(article))
		.catch(err => res.json(err));


});

router.delete('/api/articles/:id', (req, res) => {
	
	const _id = req.params.id;

	Articles.remove({ _id }).then(Articles => {
	
		res.json( Articles );

	}).catch(err => {
		
		res.json( err )
	});
});

router.schema = Articles;

module.exports = router;