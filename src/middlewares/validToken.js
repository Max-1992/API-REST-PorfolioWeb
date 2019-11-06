// IMPORT OF MODULES
const jwt = require('jsonwebtoken');

// RESPONSE
const response = require('../network/res/auth/res');


const verifyToken = (req, res, next) => {
    try {
        const token = req.header(`Authorization`);
        console.log(token);
    
        if( !token ) {
            let err = `Access denied. You are not authorized to enter our application`;
            return response.unauthorizedAccess(req, res, err, 401);
        }
    
        const user = jwt.verify( token, process.env.SEED );
    
        req.user = user;
    
        next();

    } catch (err) {
        return response.error(req, res, err, 500);
    }
    
};


module.exports = {
    verifyToken
};