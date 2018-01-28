'use strict';

const router = require('express').Router();

//get a product by id
router.get(['/', '/api'], (req, res) => {
	res.send('<h1>Overhet</h1>');
});

router.get('/404', (req, res) => {
	res.send('<h1>Sorry not url found</h1>');
});

module.exports = router;