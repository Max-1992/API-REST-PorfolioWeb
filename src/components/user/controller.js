// IMPORT OF MODULES
const jwt = require('jsonwebtoken');

// IMPORT OF METHODS
const store = require('./store');

// IMPORT OF RESPONSE
const response = require('../../network/res/user/res');


// CONTROLLERS DECLARATION

const signupUser = async ( req, res ) => {
    try {
        // Capture and store the body of the request.
        const { email, password } = req.body;

        const userData = {
            email,
            password
        };

        // Execute store method to register users.
        const user = await store.signUp(userData);

        // Create token.
        const token = jwt.sign({
            user
        }, process.env.SEED, { expiresIn: process.env.EXPIRES });

        // Response success.
        return response.AuthSuccess(req, res, user, token, 201);
        
    } catch (err) {
        // Response error.
        return response.error(req, res, err, 500);
    }
};

const signinUser = async ( req, res ) => {
    try {
        // Capture and store the body of the request.
        const { email, password } = req.body;
    
        const userData = {
            email,
            password
        };
    
        // Execute store method to register users.
        const user = await store.signIn(userData);
    
        // Create token.
        const token = jwt.sign({
            user
        }, process.env.SEED, { expiresIn: process.env.EXPIRES });
    
        // Response success.
        return response.AuthSuccess(req, res, user, token, 201);

    } catch (err) {
        // Response error.
        return response.error(req, res, err, 500);
    }
};

const updateUser = async ( req, res ) => {
    try {  
        // Capture and store the parameters and body of the request.
        const { id } = req.params;
        
        const { email, password } = req.body;
    
        const userData = {
            email,
            password
        };
    
        // Execute store method to update users.
        const user = await store.update(id, userData);

        // Validate if a user exists
        if( !user ){
            let err = `The user with ${id} does not exist. Please verify the id sent.`;
            return response.notFound(req, res, err, 404);
        }
    
        // Response success.
        return response.success(req, res, user, 200);

    } catch (err) {
        // Response error.
        return response.error(req, res, err, 500);
    }

};

const getUser = async ( req, res ) => {
    try {
        // Capture parameters and execute the search methods.
        const { id } = req.params;
        
        const user = await store.get(id);
    
         // Validate if a user exists
         if( !user ){
            let err = `The user with ${id} does not exist. Please verify the id sent.`;
            return response.notFound(req, res, err, 404);
        }
    
        // Response success.
        return response.success(req, res, user, 200);

    } catch (err) {
         // Response error.
         return response.error(req, res, err, 500);
    }
};

const deleteUser = async ( req, res ) => {
    try {
        // Capture parameters and execute the delete methods.
        const { id } = req.params;
    
        const deletedUser = await store.remove(id);
    
         // Validate if a user exists
         if( !deletedUser ){
            let err = `The user with ${id} does not exist. Please verify the id sent.`;
            return response.notFound(req, res, err, 404);
        }
    
        // Response success.
        return response.success(req, res, deletedUser, 200);

    } catch (err) {
        // Response error.
        return response.error(req, res, err, 500);
    }

};


module.exports = {
    signinUser,
    signupUser,
    updateUser,
    getUser,
    deleteUser
};
