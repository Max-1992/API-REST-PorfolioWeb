// IMPORT MODEL
const User = require('./model');
const path = require('path');
const fs = require('fs-extra');

// CONTROLLERS DECLARATION
const signUp = async ( userData ) => {
    try {
        // Storing User
        const newUser = new User(userData);

        newUser.password = await newUser.encryptPassword(newUser.password);

        const user = await newUser.save();

        return user;

    } catch (err) {
        console.error(`[ERROR signUp]: ${err}`);
        return Promise.reject(err);
    }
};

const signIn = async ( userData ) => {
    try {
        // Capture and store the parameters.
        const { email } = userData;
        const { password } = userData;
    
        // User search in database
        const user = await User.findOne({ email: email });
    
        // Validate if the user exists in the database.
        if( !user ) {
            let err = `The user does not exist in our database, please verify that it is correctly written.`;
            return Promise.reject(err);
        }
    
        // Validate if the password is correct.
        const matchPassword = await user.matchPassword(password);

        if(!matchPassword) {
            let err = `The password is not valid, check again and re-enter it.`;
            return Promise.reject(err);
        }

        return user;

    } catch (err) {
        console.error(`[ERROR signIn]: ${err}`);
        return Promise.reject(err);
    }

};

const get = async ( id ) => {
    try {
        // Search user in the database.
        const user = await User.findById(id);
        
        return user;

    } catch (err) {
        console.error(`[ERROR Get]: ${err}`);
        return Promise.reject(err);
    }
};

const update = async ( id, userData) => {
    try {
        // Run update method
        const user = await User.findByIdAndUpdate(id, userData, {new: true});
    
        return user;
        
    } catch (err) {
        console.error(`[ERROR Update]: ${err}`);
        return Promise.reject(err);
    }
};

const remove = async ( id ) => {
    try {
        // Remove user from the database and return deleted user.
        const deletedUser = await User.findByIdAndRemove(id);
    
        // Remove user image from the system.
        if( deletedUser.image ) {
            let pathImage = path.resolve(__dirname, `../../../uploads/user/${deletedUser.image}`);
    
                if( fs.existsSync(pathImage) ) {
                    fs.unlinkSync(pathImage);
                }
        }
    
        console.log(deletedUser);

        return deletedUser;
        
    } catch (err) {
        console.error(`[ERROR Remove]: ${err}`);
        return Promise.reject(err);
    }

};


module.exports = {
    signUp,
    signIn,
    update,
    get,
    remove
};