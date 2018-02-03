'use strict';

const jwt = require('./../helpers/jsonwebtoken');
const Users = require('./../models/users');

module.exports = {

    emailAndPassword : (req, res, next) => {

        if(!req.body|| !req.body.email || !req.body.password) {

            res.status(400).json({
                error:  'Empty email or password'
            });
        
        } else {
            
            next();
       
        }

    },

    roles : userRoles => {

        userRoles = Array.isArray(userRoles) ? userRoles : [userRoles];

        return async (req, res, next) => {
    
            const token = req.body.token || req.query.token || req.headers['x-access-token'];
    
            if (!token) {
                throw { error: 'No token' };
            } 
    
            try {
    
                const decoded = await jwt.verify(token);
    
                if(!decoded || !decoded._id || !decoded.role) {
                    
                    throw { error: 'Invalid token' };

                } else if(!userRoles.includes(decoded.role)) {

                    console.log(userRoles, decoded.role, userRoles.includes(decoded.role));

                    throw { error: `The user doesn't have permission`};

                }
    
                req.data = {
                    decoded,
                    token,
                };
                
                next();
            
            } catch(err) {
    
                res.status(401).json(err); 
    
            }
        }
    }
}