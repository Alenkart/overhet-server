
'use strict';

const jwt = require('jsonwebtoken');
const config = require('./../configs/jsonwebtoken');

module.exports = {

    sign: data => {

        return new Promise((res, rej) => {

            jwt.sign(data, config.key, config.options, (err, token) => {
                
                if(err) {
                    rej(err);
                } else {
                    res(token);
                }

            });

        });

    },

    verify: token => {
            
        return new Promise((res, rej) => {
            
            jwt.verify(token, config.key, (err, decoded) => {
                
                if(err) {
                    rej(err);
                } else {
                    res(decoded);
                }

            });

        });

    }
}