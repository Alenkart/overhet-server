'use strict';

const router = require('express').Router();
const auth = require('./../middlewares/auth');

//get a product by id
router.get(['/', '/api'], (req, res) => {
	res.send('<h1>Overhet</h1>');
});

router.get('/404', (req, res) => {
	res.send('<h1>Sorry not url found</h1>');
});

router.use('/secret', require('./../middlewares/auth').roles('admin'));

router.get('/secret', (req, res) => {
	res.json(req.data.decoded);
});

module.exports = router;