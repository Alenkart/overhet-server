'use strict';

const router = require('express').Router();
const Users = require('./../models/users');

router.use('/api/users', require('./../middlewares/auth').roles('admin'));

router.get('/api/users', (req, res) => {

	const hostname = req.headers.host;
	
	Users
		.find({ status : true })
		.then(users => {

			res.json( users );
			
		}).catch(err => {

			res.json( err );
		});

});

router.get('/api/users/:id', (req, res) => {
	
	const _id = req.params.id;

	Users
		.findOne({ _id })
		.then(users => {
	
			res.json( users );

		}).catch(err => {
			
			res.json( err )
		});
});

router.post('/api/users/:id', (req, res) => {

	const _id = req.params.id;

	Users
		.update({ _id }, req.body)
		.then(result => {

			res.json(result);

		}).catch(err => {

			res.json(err);
		});

});

router.put('/api/users', (req, res) => {

	const user = new Users(req.body);

    user.save()
    .then(result => res.json(user))
    .catch(err => res.json(err));

});

router.delete('/api/users/:id', (req, res) => {
	
	const _id = req.params.id;

	Users
		.remove({ _id })
		.then(user => {
	
			res.json( user );

		}).catch(err => {
			
			res.json( err )
		});
});

module.exports = router;