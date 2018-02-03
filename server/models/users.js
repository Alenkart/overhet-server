'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const SALT_FACTOR = 10;

const Users = new Schema({
	name: {
		type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique : true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user',
        required: true
    },
	status: {
		type: Boolean,
		default: false,
	},
});

Users.pre('save', function(next) {

    if (!this.isModified('password')) return next();
        
    bcrypt.hash(this.password, SALT_FACTOR)
    .then(hash => {

        this.type = "user";
        this.password = hash;

        next();
    })
    .catch(err => next(err));

});

Users.methods.comparePassword = function(password, cb) {
    
    return new Promise((res, rej) => {

        bcrypt.compare(password, this.password, (err, isMatch) => {
            
            if (err) {
                rej(err)
            } else {
                res(isMatch);
            }
       
        });

    });

};

module.exports = mongoose.model('Users', Users);