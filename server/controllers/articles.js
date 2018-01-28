'use strict';

const router = require('express').Router();
const Articles = require('./../models/articles');

router.get('/console', (req, res) => {
	console.log(Articles);
	res.send('sss');
});


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

	article.save((err, result) => {

  		if (err) {
  			res.json(err);
  		} else {
  			res.json(result);
  		}

  	});

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