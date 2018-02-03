'use strict';

const router = require('express').Router();
const Users = require('./../models/users');
const jwt = require('./../helpers/jsonwebtoken');

router.use('/api/auth', require('./../middlewares/auth').emailAndPassword);

router.post('/api/auth', async (req, res) => {
    
    try {

        const user = await Users.findOne({ status : true, email: req.body.email });
        const passwordMatched = await user.comparePassword(req.body.password);

        if(!passwordMatched) {
            throw false;
        }

        const userJson = {
            _id : user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        };  

        const token = await jwt.sign(userJson);

        res.json(token);

    } catch(err) {

        console.log(err);

        res.status(400)
        .json({error: 'Invalid email or password'});
    }

});

router.put('/api/auth', (req, res) => {

    if(!req.body || !req.body.password2 ) {
        
        return res
        .status(400)
        .json({error: 'Empty confirmation password'});

    } else if (req.body.password !== req.body.password2) {

        return res
        .status(400)
        .json({error: `The password and the confirmation password doesn't match`});

    }

    req.body.role = "user";

    const user = new Users(req.body);
    
    user.save()
    .then(result => res.json(user))
    .catch(error => res.json({ error }));

});


module.exports = router;